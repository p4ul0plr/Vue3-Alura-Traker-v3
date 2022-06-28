<template>
  <formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <box v-if="listaEstaVazia">
      <p>Você não está muito produtivo hoje :(</p>
    </box>
    <tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
  import { useStore } from "@/store";
  import { OBTER_PROJETOS, OBTER_TAREFAS } from "@/store/tipo-acoes";
  import { CADASTRAR_TAREFA } from "@/store/tipo-acoes";

  import Formulario from "@/components/Formulario.vue";
  import Tarefa from "@/components/Tarefa.vue";
  import Box from "@/components/Box.vue";
  import ITarefa from "@/interfaces/ITarefa";

  export default defineComponent({
    name: "TarefasView",
    components: {
      Formulario,
      Tarefa,
      Box,
    },
    methods: {
      salvarTarefa(tarefa: ITarefa) {
        this.store.dispatch(CADASTRAR_TAREFA, tarefa);
      },
    },
    computed: {
      listaEstaVazia(): boolean {
        return this.tarefas.length === 0;
      },
    },
    setup() {
      const store = useStore();
      store.dispatch(OBTER_TAREFAS);
      store.dispatch(OBTER_PROJETOS);
      return {
        tarefas: computed(() => store.state.tarefas),
        store,
      };
    },
  });
</script>

<style></style>
