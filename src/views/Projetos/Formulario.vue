<template>
  <section class="projetos">
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
          this.store.commit("ALTERA_PROJETO", {
            id: this.id,
            nome: this.nomeDoProjeto,
          });
        } else {
          this.store.commit("ADICIONA_PROJETO", this.nomeDoProjeto);
        }
        this.nomeDoProjeto = "";
        this.$router.push("/projetos");
      },
    },
  });
</script>

<style scoped>
  .projetos {
    padding: 1.25rem;
  }
</style>
