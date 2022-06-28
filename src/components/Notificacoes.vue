<template>
  <div class="notificacoes">
    <article class="message is-success">
      <div class="message-header">
        <p>Success</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </article>
    <article class="message is-warning">
      <div class="message-header">
        <p>Warning</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </article>
    <article class="message is-danger">
      <div class="message-header">
        <p>Danger</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </article>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "NotificacoesComponent",
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
