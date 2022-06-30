import { TipoNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";
import { NOTIFICA } from "@/store/tipo-acoes";

type Notificador = {
  notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void;
};

export default (): Notificador => {
  const notificar = (
    tipo: TipoNotificacao,
    titulo: string,
    texto: string
  ): void => {
    store.dispatch(NOTIFICA, {
      tipo,
      titulo,
      texto,
    });
  };
  return {
    notificar,
  };
};
