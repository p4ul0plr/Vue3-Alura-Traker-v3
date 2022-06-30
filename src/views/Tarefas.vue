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
    <modal :mostrar="tarefaSelecionada != null">
      <header class="modal-card-head">
        <p class="modal-card-title">Selecionar uma tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
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
    </modal>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watchEffect } from "vue";
  import { CADASTRAR_TAREFA } from "@/store/tipo-acoes";
  import { TipoNotificacao } from "@/interfaces/INotificacao";
  import { useStore } from "@/store";
  import {
    ALTERAR_TAREFA,
    OBTER_PROJETOS,
    OBTER_TAREFAS,
  } from "@/store/tipo-acoes";

  import useNotificador from "@/hooks/notificador";
  import Formulario from "@/components/Formulario.vue";
  import ITarefa from "@/interfaces/ITarefa";
  import Tarefa from "@/components/Tarefa.vue";
  import Modal from "@/components/Modal.vue";
  import Box from "@/components/Box.vue";

  export default defineComponent({
    name: "TarefasView",
    components: {
      Formulario,
      Tarefa,
      Box,
      Modal,
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
      const tarefas = computed(() => store.state.tarefa.tarefas);
      /* const tarefas = computed(() =>
        store.state.tarefa.tarefas?.filter(
          (tarefa) => !filtro.value || tarefa.descricao.includes(filtro.value)
        )
      ); */
      const listaEstaVazia = (): boolean => {
        return tarefas.value?.length === 0;
      };

      watchEffect(() => {
        console.log(filtro.value);
        store.dispatch(OBTER_TAREFAS, filtro.value);
      });

      store.dispatch(OBTER_TAREFAS);
      store.dispatch(OBTER_PROJETOS);
      if (!store.state.notificacao.notificacoes) {
        store.state.notificacao.notificacoes = [];
      }
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
