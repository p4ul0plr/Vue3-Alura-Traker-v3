import IProjeto from "@/interfaces/IProjeto";

export default interface ITarefa {
  id: number;
  duracaoSegundos: number;
  descricao: string;
  projeto: IProjeto;
}
