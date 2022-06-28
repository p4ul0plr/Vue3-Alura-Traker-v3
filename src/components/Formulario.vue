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
  import { NOTIFICAR } from "@/store/tipo-mutacoes";
  import { computed } from "@vue/reactivity";
  import { defineComponent } from "vue";
  import { useStore } from "vuex";
  import Temporizador from "./Temporizador.vue";

  export default defineComponent({
    name: "FormularioComponent",
    emits: ["aoSalvarTarefa"],
    components: { Temporizador },
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
          this.store.commit(NOTIFICAR, {
            titulo: "Ops!",
            texto: "Selecione um projeto antes de finalizar a tarefa!",
            tipo: TipoNotificacao.FALHA,
          });
        } else {
          this.$emit("aoSalvarTarefa", {
            duracaoSegundos: tempoDecorrido,
            descricao: this.descricao,
            projeto: this.projetos.find(
              (projeto) => projeto.id == this.idProjeto
            ),
          });
          this.descricao = "";
          this.store.commit(NOTIFICAR, {
            titulo: "Nova tarefa salvo",
            texto: "Protinho, sua tarefa foi salva :)",
            tipo: TipoNotificacao.SUCESSO,
          });
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
