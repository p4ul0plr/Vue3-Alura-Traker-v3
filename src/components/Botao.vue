<template>
  <button class="button" @click="click()" :disabled="disabled">
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ label }}</span>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "BotaoComponent",
    props: {
      disabled: {
        type: Boolean,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        defalt: "none",
      },
    },
    emits: ["iniciar"],
    methods: {
      click(): void {
        this.$emit("iniciar");
      },
    },
  });
</script>

<style></style>
