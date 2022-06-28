import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXCLUIR_PROJETO,
} from "@/store/tipo-mutacoes";

import IProjeto from "@/interfaces/IProjeto";

interface Estado {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [
      {
        id: 1,
        texto: "uma notificação de sucesso",
        titulo: "Sucesso",
        tipo: TipoNotificacao.SUCESSO,
      },
      {
        id: 2,
        texto: "uma notificação de atenção",
        titulo: "Atenção",
        tipo: TipoNotificacao.ATENCAO,
      },
      {
        id: 3,
        texto: "uma notificação de falha",
        titulo: "Erro",
        tipo: TipoNotificacao.FALHA,
      },
    ],
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex(
        (projeto) => projeto.id == projeto.id
      );
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((projetos) => projetos.id != id);
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
