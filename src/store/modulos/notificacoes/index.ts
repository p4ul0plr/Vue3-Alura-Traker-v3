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
      console.log("mutation: novaNotificacao: ", novaNotificacao);
      state.notificacoes.push(novaNotificacao);
      console.log("mutation: state: ", state.notificacoes);
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id
        );
      }, 3000);
    },
  },
  actions: {
    [NOTIFICA]({ commit }, novaNotificacao: INotificacao) {
      console.log("action: novaNotificacao: ", novaNotificacao);
      commit(NOTIFICAR, novaNotificacao);
    },
  },
};
