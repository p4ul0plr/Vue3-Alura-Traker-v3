import { InjectionKey } from "vue";
import { EstadoTarefa, tarefa } from "./modulos/tarefas";
import { EstadoProjeto, projeto } from "./modulos/projetos";
import { EstadoNotificacao, notificacao } from "./modulos/notificacoes";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

export interface Estado {
  projeto: EstadoProjeto;
  tarefa: EstadoTarefa;
  notificacao: EstadoNotificacao;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    tarefa: {
      tarefas: [],
    },
    projeto: {
      projetos: [],
    },
    notificacao: {
      notificacoes: [],
    },
  },
  modules: {
    projeto,
    tarefa,
    notificacao,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
