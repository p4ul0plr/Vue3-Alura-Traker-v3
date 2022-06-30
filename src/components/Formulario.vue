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
        <temporizador @aoTemporizadorFinalizado="salvarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { TipoNotificacao } from "@/interfaces/INotificacao";
  import { key } from "@/store";
  import { computed } from "@vue/reactivity";
  import { defineComponent, ref } from "vue";
  import { useStore } from "vuex";
  import Temporizador from "./Temporizador.vue";
  import useNotificador from "@/hooks/notificador";

  export default defineComponent({
    name: "FormularioComponent",
    emits: ["aoSalvarTarefa"],
    components: { Temporizador },
    setup(props, { emit }) {
      const { notificar } = useNotificador();
      const store = useStore(key);
      const projetos = computed(() => store.state.projeto.projetos);
      const descricao = ref("");
      const idProjeto = ref("");

      const salvarTarefa = (tempoEmSegundos: number): void => {
        const projeto = projetos.value.find(
          (projeto) => projeto.id == idProjeto.value
        );
        if (!projeto) {
          notificar(
            TipoNotificacao.FALHA,
            "Ops!",
            "Selecione um projeto antes de finalizar a tarefa!"
          );
        } else {
          emit("aoSalvarTarefa", {
            duracaoSegundos: tempoEmSegundos,
            descricao: descricao.value,
            projeto: projetos.value.find(
              (projeto) => projeto.id == idProjeto.value
            ),
          });
          descricao.value = "";
          notificar(
            TipoNotificacao.SUCESSO,
            "Nova tarefa salvo",
            "Protinho, sua tarefa foi salva :)"
          );
        }
      };

      return {
        notificar,
        salvarTarefa,
        projetos,
        store,
        descricao,
        idProjeto,
      };
    },
    methods: {},
  });
</script>

<style>
  .formulario {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
  }
</style>
