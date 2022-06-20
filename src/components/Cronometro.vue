<template>
  <section>
    <strong>{{ tempoDecorrido }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "CronometroPrincipal",
  props: {
    tempoSegundos: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tempoDecorrido(): string {
      return new Date(this.tempoSegundos * 1000).toISOString().substr(11, 8);
    },
  },
})
</script>


<style></style>
