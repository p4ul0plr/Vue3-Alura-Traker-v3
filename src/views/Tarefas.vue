<template>
  <formulario />
  <div class="lista">
    <box v-if="listaEstaVazia">
      <p>Você não está muito produtivo hoje :(</p>
    </box>
    <tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
  import { useStore } from "@/store";
  import { OBTER_TAREFAS } from "@/store/tipo-acoes";

  import Formulario from "@/components/Formulario.vue";
  import Tarefa from "@/components/Tarefa.vue";
  import Box from "@/components/Box.vue";

  export default defineComponent({
    name: "TarefasView",
    components: {
      Formulario,
      Tarefa,
      Box,
    },
    methods: {
      // salvarTarefa(tarefa: ITarefa) {
      //   this.tarefas.push(tarefa);
      // },
    },
    computed: {
      listaEstaVazia(): boolean {
        return this.tarefas.length === 0;
      },
    },
    setup() {
      const store = useStore();
      store.dispatch(OBTER_TAREFAS);
      return {
        tarefas: computed(() => store.state.tarefas),
        store,
      };
    },
  });
</script>

<style></style>
