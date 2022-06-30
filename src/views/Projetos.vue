<template>
  <div class="projetos">
    <h1 class="title">Projetos</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useStore } from "@/store";

  export default defineComponent({
    name: "ProjetosView",
    setup() {
      const store = useStore();

      if (!store.state.notificacao.notificacoes) {
        store.state.notificacao.notificacoes = [];
      }
    },
  });
</script>

<style scoped>
  .projetos {
    padding: 1.25rem;
  }
</style>
