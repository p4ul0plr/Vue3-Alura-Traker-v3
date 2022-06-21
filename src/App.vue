<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <barra-lateral />
    </div>
    <div class="column is-three-quarter">
      <formulario />
      <div class="lista">
        <tarefa />
        <tarefa />
        <tarefa />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import BarraLateral from "@/components/BarraLateral.vue";
  import Formulario from "@/components/FormularioPrincipal.vue";
  import Tarefa from "./components/Tarefa.vue";

  export default defineComponent({
    name: "App",
    components: {
      BarraLateral,
      Formulario,
      Tarefa,
    },
  });
</script>

<style>
  .lista {
    padding: 1.25rem;
  }
</style>
