<script setup>
// npm run dev
import Button from "primevue/button/sfc";
import Card from "primevue/card/sfc";
import { reactive, ref } from "vue";

const notaInput = reactive({ descricao: "", titulo: "" });
const notas = ref([]);
const editandoNota = ref(false);

function adicionarNota() {
  notas.value.push({ ...notaInput });
  notaInput.descricao = "";
  notaInput.titulo = "";
}
function removerNota(nota) {
  notas.value = notas.value.filter((obj) => obj !== nota);
}
let notaObj = "";
function salvarEdicao() {
  notaObj.titulo = notaInput.titulo;
  notaObj.descricao = notaInput.descricao;

  // limpei o input aqui
  notaInput.descricao = "";
  notaInput.titulo = "";

  editandoNota.value = false;
}

function editar(nota) {
  notaObj = nota;
  notaInput.titulo = nota.titulo;
  notaInput.descricao = nota.descricao;

  editandoNota.value = true;
}
</script>

<template>
  <div>Notas</div>
  <div style="margin: 10px">
    <input v-model="notaInput.titulo" placeholder="Título" />
  </div>
  <div style="margin: 10px">
    <input v-model="notaInput.descricao" placeholder="Descrição" />
  </div>

  <Button
    v-if="editandoNota"
    label="Salvar"
    class="p-button-rounded p-button-secondary"
    @click="salvarEdicao()"
  />
  <Button
    v-else
    label="Adicionar Nota"
    class="p-button-rounded p-button-secondary"
    @click="adicionarNota"
  />
  <Card v-for="nota in notas" style="width: 25rem; margin-bottom: 2em">
    <template #title> {{ nota.titulo }} </template>
    <template #content>
      <p>
        {{ nota.descricao }}
      </p>
    </template>
    <template #footer>
      <Button
        label="Editar"
        class="p-button-rounded p-button-secondary"
        @click="editar(nota)"
      />

      <Button
        label="Delete"
        class="p-button-rounded p-button-secondary"
        @click="() => removerNota(nota)"
      />
    </template>
  </Card>
</template>

<style></style>
