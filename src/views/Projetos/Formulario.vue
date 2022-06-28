<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="fild">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useStore } from "@/store";
  import { NOTIFICAR } from "@/store/tipo-mutacoes";
  import { TipoNotificacao } from "@/interfaces/INotificacao";
  import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";

  export default defineComponent({
    name: "FormularioProjetos",
    props: {
      id: {
        type: String,
      },
    },
    setup() {
      const store = useStore();
      return {
        store,
      };
    },
    data() {
      return {
        nomeDoProjeto: "",
      };
    },
    mounted() {
      if (this.id) {
        const projeto = this.store.state.projetos.find(
          (projeto) => projeto.id == this.id
        );
        this.nomeDoProjeto = projeto?.nome || "";
      }
    },
    methods: {
      salvar() {
        if (this.id) {
          this.store
            .dispatch(ALTERAR_PROJETO, {
              id: this.id,
              nome: this.nomeDoProjeto,
            })
            .then(() => this.lidarComSucesso());
        } else {
          this.store
            .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
            .then(() => this.lidarComSucesso());
        }
      },
      lidarComSucesso() {
        this.nomeDoProjeto = "";
        this.store.commit(NOTIFICAR, {
          titulo: "Novo projeto salvo",
          texto: "Protinho, seu projeto foi salvo :)",
          tipo: TipoNotificacao.SUCESSO,
        });
        this.$router.push("/projetos");
      },
    },
  });
</script>

<style></style>
