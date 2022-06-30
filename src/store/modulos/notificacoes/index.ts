import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { NOTIFICA } from "@/store/tipo-acoes";
import { Module } from "vuex";
import { Estado } from "@/store";
import { INotificacao } from "@/interfaces/INotificacao";

export interface EstadoNotificacao {
  notificacoes: INotificacao[];
}

export const notificacao: Module<EstadoNotificacao, Estado> = {
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id
        );
      }, 3000);
    },
  },
  actions: {
    [NOTIFICA]({ commit }, novaNotificacao: INotificacao) {
      commit(NOTIFICAR, novaNotificacao);
    },
  },
};
