<template>
  <box>
    <div class="columns">
      <div class="column is-7">
        {{ tarefa.descricao.trim() || "Tarefa sem Descrição" }}
      </div>
      <div class="column">
        <cronometro :tempoSegundos="tarefa.duracaoSegundos" />
      </div>
    </div>
  </box>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import Cronometro from "./Cronometro.vue";
  import ITarefa from "@/interfaces/ITarefa";
  import Box from "./Box.vue";

  export default defineComponent({
    name: "TarefaComponent",
    props: {
      tarefa: {
        type: Object as PropType<ITarefa>,
        required: true,
      },
    },
    components: { Cronometro, Box },
  });
</script>

<style></style>
