<template>
  <formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <box v-if="listaEstaVazia()">
      <p>Você não está muito produtivo hoje :(</p>
    </box>
    <div class="field">
      <p class="control has-icons-left">
        <input
          v-model="filtro"
          class="input"
          type="text"
          placeholder="Digite para filtrar"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
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
  import { TipoNotificacao } from "@/interfaces/INotificacao";
  import { useStore } from "@/store";
  import { computed, defineComponent, ref } from "vue";

  import Formulario from "@/components/Formulario.vue";
  import Tarefa from "@/components/Tarefa.vue";
  import Box from "@/components/Box.vue";
  import ITarefa from "@/interfaces/ITarefa";
  import useNotificador from "@/hooks/notificador";

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
          this.notificar(
            TipoNotificacao.SUCESSO,
            "Tarefa editada",
            "Protinho, sua tarefa foi editada com sucesso :)"
          );
        });
      },
    },
    setup() {
      const { notificar } = useNotificador();
      const store = useStore();
      const filtro = ref("");
      const tarefas = computed(() =>
        store.state.tarefa.tarefas?.filter(
          (tarefa) => !filtro.value || tarefa.descricao.includes(filtro.value)
        )
      );
      store.dispatch(OBTER_TAREFAS);
      store.dispatch(OBTER_PROJETOS);
      if (!store.state.notificacao.notificacoes) {
        store.state.notificacao.notificacoes = [];
      }
      const listaEstaVazia = (): boolean => {
        return tarefas.value?.length === 0;
      };
      return {
        listaEstaVazia,
        notificar,
        tarefas,
        filtro,
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
