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
  import { defineComponent, ref } from "vue";
  import { useStore } from "@/store";
  import { TipoNotificacao } from "@/interfaces/INotificacao";
  import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";

  import useNotificador from "@/hooks/notificador";

  export default defineComponent({
    name: "FormularioProjetos",
    props: {
      id: {
        type: String,
      },
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
        this.notificar(
          TipoNotificacao.SUCESSO,
          "Novo projeto salvo",
          "Protinho, seu projeto foi salvo :)"
        );
        this.$router.push("/projetos");
      },
    },
    setup(props) {
      const store = useStore();
      const { notificar } = useNotificador();
      const nomeDoProjeto = ref("");

      props.id;
      if (props.id) {
        const projeto = store.state.projeto.projetos.find(
          (projeto) => projeto.id == props.id
        );
        nomeDoProjeto.value = projeto?.nome || "";
      }
      return {
        store,
        notificar,
        nomeDoProjeto,
      };
    },
    // data() {
    //   return {
    //     nomeDoProjeto: "",
    //   };
    // },
    // mounted() {
    //   if (this.id) {
    //     const projeto = this.store.state.projeto.projetos.find(
    //       (projeto) => projeto.id == this.id
    //     );
    //     this.nomeDoProjeto = projeto?.nome || "";
    //   }
    // },
  });
</script>

<style></style>
