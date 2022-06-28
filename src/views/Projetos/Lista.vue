<template>
  <section>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo Projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOME</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody v-for="projeto in projetos" :key="projeto.id">
        <tr>
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useStore } from "@/store";
  import { computed } from "@vue/reactivity";

  export default defineComponent({
    name: "ListaProjetos",
    setup() {
      const store = useStore();
      return {
        projetos: computed(() => store.state.projetos),
      };
    },
  });
</script>

<style></style>
