<template>
  <div v-if="mostrar" :class="{ 'is-active': mostrar }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "ModalComponent",
    props: {
      mostrar: {
        type: Boolean,
        required: true,
      },
    },
  });
</script>
