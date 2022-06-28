<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              v-for="projeto in projetos"
              :key="projeto.id"
              :value="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { TipoNotificacao } from "@/interfaces/INotificacao";
  import { key } from "@/store";
  import { computed } from "@vue/reactivity";
  import { defineComponent } from "vue";
  import { useStore } from "vuex";
  import { notificacaoMixin } from "@/mixins/notificar";
  import Temporizador from "./Temporizador.vue";

  export default defineComponent({
    name: "FormularioComponent",
    emits: ["aoSalvarTarefa"],
    components: { Temporizador },
    mixins: [notificacaoMixin],
    setup() {
      const store = useStore(key);
      return {
        projetos: computed(() => store.state.projetos),
        store,
      };
    },
    data() {
      return {
        descricao: "",
        idProjeto: "",
      };
    },
    methods: {
      finalizarTarefa(tempoDecorrido: number): void {
        const projeto = this.projetos.find((p) => p.id == this.idProjeto);
        if (!projeto) {
          this.notificar(
            TipoNotificacao.FALHA,
            "Ops!",
            "Selecione um projeto antes de finalizar a tarefa!"
          );
        } else {
          this.$emit("aoSalvarTarefa", {
            duracaoSegundos: tempoDecorrido,
            descricao: this.descricao,
            projeto: this.projetos.find(
              (projeto) => projeto.id == this.idProjeto
            ),
          });
          this.descricao = "";
          this.notificar(
            TipoNotificacao.SUCESSO,
            "Nova tarefa salvo",
            "Protinho, sua tarefa foi salva :)"
          );
        }
      },
    },
  });
</script>

<style>
  .formulario {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
  }
</style>
