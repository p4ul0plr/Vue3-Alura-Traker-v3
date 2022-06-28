<template>
  <div class="notificacoes">
    <article
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
      :class="contexto[notificacao.tipo]"
      class="message"
    >
      <div class="message-header">
        <p>{{ notificacao.titulo }}</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">
        {{ notificacao.texto }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
  import { useStore } from "@/store";
  import { TipoNotificacao } from "@/interfaces/INotificacao";

  export default defineComponent({
    name: "NotificacoesComponent",
    setup() {
      const store = useStore();
      return {
        notificacoes: computed(() => store.state.notificacoes),
      };
    },
    data() {
      return {
        contexto: {
          [TipoNotificacao.SUCESSO]: "is-success",
          [TipoNotificacao.ATENCAO]: "is-warning",
          [TipoNotificacao.FALHA]: "is-danger",
        },
      };
    },
  });
</script>

<style scoped>
  .notificacoes {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 999;
  }
</style>
