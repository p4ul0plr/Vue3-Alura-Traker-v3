<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <cronometro :tempo-segundos="tempoSegundos" />
    <botao
      :disabled="cronometroRodando"
      :icon="'fas fa-play'"
      :label="'Play'"
      @click="iniciar()"
    />
    <botao
      :disabled="!cronometroRodando"
      :icon="'fas fa-stop'"
      :label="'Stop'"
      @click="finalizar()"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import Cronometro from "./Cronometro.vue";
  import Botao from "./Botao.vue";

  export default defineComponent({
    name: "TemporizadorPrincipal",
    emits: ["aoTemporizadorFinalizado"],
    components: { Cronometro, Botao },
    data() {
      return {
        tempoSegundos: 0,
        cronometro: 0,
        cronometroRodando: false,
      };
    },
    methods: {
      iniciar() {
        this.cronometroRodando = true;
        this.cronometro = setInterval(() => {
          this.tempoSegundos += 1;
        }, 1000);
      },
      finalizar() {
        this.cronometroRodando = false;
        clearInterval(this.cronometro);
        this.$emit("aoTemporizadorFinalizado", this.tempoSegundos);
        this.tempoSegundos = 0;
      },
    },
  });
</script>

<style></style>
