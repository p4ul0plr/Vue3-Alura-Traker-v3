const projeto = {
  id: 1,
  descricao: "Alura Tracker 3.0",
};

const proxy = new Proxy(projeto, {
  get(objetoOriginal, chave, receptor) {
    console.log(`Alguém pediu a ${chave} do projeto`);
    return Reflect.get(objetoOriginal, chave, receptor);
  },
  set(objetoOriginal, chave, valor) {
    console.log(`Alguém alterou a ${chave} do projeto para o ${valor}`);
    objetoOriginal[chave] = valor;
  },
});

proxy.descricao = "reatividade é legal";

console.log(proxy.descricao);
