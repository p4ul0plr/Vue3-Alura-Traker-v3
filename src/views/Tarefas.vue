<template>
  <formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <box v-if="listaEstaVazia">
      <p>Você não está muito produtivo hoje :(</p>
    </box>
    <tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <div
      v-if="tarefaSelecionada"
      :class="{ 'is-active': tarefaSelecionada }"
      class="modal"
    >
      <div class="modal-background" @click="fecharModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Selecionar uma tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">Descrição</label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="descricaoDaTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="alterarTarefa" class="button is-success">
            Salvar alterações
          </button>
          <button @click="fecharModal" class="button">Calcelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    ALTERAR_TAREFA,
    OBTER_PROJETOS,
    OBTER_TAREFAS,
  } from "@/store/tipo-acoes";
  import { CADASTRAR_TAREFA } from "@/store/tipo-acoes";
  import { computed, defineComponent } from "vue";
  import { useStore } from "@/store";

  import Formulario from "@/components/Formulario.vue";
  import Tarefa from "@/components/Tarefa.vue";
  import Box from "@/components/Box.vue";
  import ITarefa from "@/interfaces/ITarefa";
  import { NOTIFICAR } from "@/store/tipo-mutacoes";
  import { TipoNotificacao } from "@/interfaces/INotificacao";

  export default defineComponent({
    name: "TarefasView",
    components: {
      Formulario,
      Tarefa,
      Box,
    },
    methods: {
      salvarTarefa(tarefa: ITarefa) {
        this.store.dispatch(CADASTRAR_TAREFA, tarefa);
      },
      selecionarTarefa(tarefa: ITarefa) {
        this.tarefaSelecionada = tarefa;
      },
      fecharModal() {
        this.tarefaSelecionada = null;
      },
      alterarTarefa() {
        this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada).then(() => {
          this.fecharModal();
          this.store.commit(NOTIFICAR, {
            titulo: "Tarefa editada",
            texto: "Protinho, sua tarefa foi editada com sucesso :)",
            tipo: TipoNotificacao.SUCESSO,
          });
        });
      },
    },
    computed: {
      listaEstaVazia(): boolean {
        return this.tarefas.length === 0;
      },
    },
    setup() {
      const store = useStore();
      store.dispatch(OBTER_TAREFAS);
      store.dispatch(OBTER_PROJETOS);
      return {
        tarefas: computed(() => store.state.tarefas),
        store,
      };
    },
    data() {
      return {
        tarefaSelecionada: null as ITarefa | null,
      };
    },
  });
</script>

<style>
  .modal-card-head {
    height: auto;
  }
</style>
