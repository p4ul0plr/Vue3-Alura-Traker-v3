<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <barra-lateral />
    </div>
    <div class="column is-three-quarter">
      <formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <box v-if="listaEstaVazia" >
          <p>Você não está muito produtivo hoje :(</p>
        </box>
        <tarefa
          v-for="(tarefa, index) in tarefas"
          :key="index"
          :tarefa="tarefa"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import BarraLateral from "@/components/BarraLateral.vue";
  import Formulario from "@/components/FormularioPrincipal.vue";
  import Tarefa from "@/components/Tarefa.vue";
  import ITarefa from "@/interfaces/ITarefa";
  import Box from "@/components/Box.vue";

  export default defineComponent({
    name: "App",
    components: {
      BarraLateral,
      Formulario,
      Tarefa,
      Box,
    },
    data() {
      return {
        tarefas: [] as ITarefa[],
      };
    },
    methods: {
      salvarTarefa(tarefa: ITarefa) {
        this.tarefas.push(tarefa);
      },
    },
    computed: {
      listaEstaVazia(): boolean {
        return this.tarefas.length === 0;
      }
    }
  });
</script>

<style>
  .lista {
    padding: 1.25rem;
  }
</style>
