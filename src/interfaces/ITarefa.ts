import IProjeto from "@/interfaces/IProjeto";

export default interface ITarefa {
  duracaoSegundos: number;
  descricao: string;
  projeto: IProjeto;
}
