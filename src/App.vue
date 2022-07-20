<script setup>
// npm run dev
import Button from "primevue/button/sfc";
import Card from "primevue/card/sfc";
import { reactive, ref } from "vue";
import TheWelcome from "./components/TheWelcome.vue";
import Markdown from "vue3-markdown-it";

const source = "#Hello World";
const notaInput = reactive({ descricao: "", titulo: "" });
const notas = ref(JSON.parse(localStorage.getItem("Notas"))); //JSON converte o array
const editandoNota = ref(false);

function zeroAEsquerda(num) {
  // função para ter o 0 a esquerda!
  return num >= 10 ? num : `0${num}`;
}

function formataData(data) {
  const dia = zeroAEsquerda(data.getDate());
  const mes = zeroAEsquerda(data.getMonth() + 1);
  const ano = zeroAEsquerda(data.getFullYear());
  const hora = zeroAEsquerda(data.getHours());
  const min = zeroAEsquerda(data.getMinutes());
  const seg = zeroAEsquerda(data.getSeconds());

  return `Data: ${dia}/${mes}/${ano} Horário:  ${hora}:${min}:${seg}`;
}

function limparInput() {
  notaInput.descricao = "";
  notaInput.titulo = "";
}

function adicionarNota() {
  const novaNota = {
    titulo: notaInput.titulo,
    descricao: notaInput.descricao,
    dataCriacao: formataData(new Date()),
  };
  notas.value.push(novaNota);
  limparInput();
  localStorage.setItem("Notas", JSON.stringify(notas.value));
}

function removerNota(nota) {
  notas.value = notas.value.filter((obj) => obj !== nota);
  localStorage.setItem("Notas", JSON.stringify(notas.value));
}

let notaObj = "";

function salvarEdicao() {
  notaObj.titulo = notaInput.titulo;
  notaObj.descricao = notaInput.descricao;
  limparInput();
  localStorage.setItem("Notas", JSON.stringify(notas.value));

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
    <textarea
      style="resize: none"
      rows="4"
      cols="23"
      v-model="notaInput.descricao"
      placeholder="Descrição"
    />
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
    <template #title> {{ nota.titulo }}</template>
    <template #content>
      <h3>
        <p><Markdown :source="nota.descricao" /></p>
      </h3>
      <div>{{ nota.dataCriacao }}</div>
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
