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
  import { useRouter } from "vue-router";
  import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";

  import useNotificador from "@/hooks/notificador";

  export default defineComponent({
    name: "FormularioProjetos",
    props: {
      id: {
        type: String,
      },
    },
    methods: {},
    setup(props) {
      const router = useRouter();
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

      const salvar = () => {
        if (props.id) {
          store
            .dispatch(ALTERAR_PROJETO, {
              id: props.id,
              nome: nomeDoProjeto.value,
            })
            .then(() => lidarComSucesso());
        } else {
          store
            .dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
            .then(() => lidarComSucesso());
        }
      };

      const lidarComSucesso = () => {
        nomeDoProjeto.value = "";
        notificar(
          TipoNotificacao.SUCESSO,
          "Novo projeto salvo",
          "Protinho, seu projeto foi salvo :)"
        );
        router.push("/projetos");
      };

      return {
        nomeDoProjeto,
        salvar,
        lidarComSucesso,
      };
    },
  });
</script>

<style></style>
