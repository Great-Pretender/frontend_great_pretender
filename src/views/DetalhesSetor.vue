<template>
<div class="card">
  <div class="container">
    <button type="submit" @click="ativarInputs" class="editar">Habilitar Edição</button>
    <button type="submit" @click="deletar" class="deletar">Deletar</button>
    <h4><b>Setor</b></h4>
    <input type="text"  class="input_nome" id="nome" v-model="nome" :disabled="true" @change="atualizarSetor"/>

  </div>
  <button @click="atualizarSetor()" class="botaoEditar" >Salvas alterações</button>
    <p v-if="erro">{{erro}}</p>
</div>
</template>
<style>
.input_nome {
  width: 20em;
  text-align: right;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233); 
}
h4{
    font-size: 25px;
    margin-left: 10px;
}
.botaoEditar {

    font-size: 15px;
    width: 9em;
    background-color: green;
    margin-left: 5em;
    margin-top: 20px;
}
.botaoEditar:hover {
    font-size: 15px;
    width: 10em;
    height: 2.3em;
    background-color: rgb(255, 255, 255);
    color: green;
    border: 1px solid green;
    box-shadow: 2px 2px 1px 1px rgba(255, 255, 255, 0.87);

}
.editar {
    font-size: 15px;
    position: relative;
    width: 10em;
    color: black;
}

.editar:hover {
    font-size: 15px;
    width: 8em;
    height: 2em;
    padding: 0;
    color: 1px solid rgb(255, 187, 0);
}
.deletar {
    font-size: 15px;
    background-color: red;
    width: 10em;

}

.deletar:hover {
    font-size: 15px;
    background-color: rgb(255, 255, 255);
    height: 2.2em;
    color: red;
    border: 1px solid red;
    box-shadow: 2px 2px rgba(255, 0, 0, 0.034);
}

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 67em;
  height: 20em;
  transition: 0.3s;
  padding-bottom: 20px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
</style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue';
import { onMounted } from 'vue'
import axios from 'axios'   
import { ref } from 'vue'
import { useRoute } from 'vue-router';


const setor = ref()
const route = useRoute();

const id = parseInt(route.params.id)
var nome = ref('')
var inputs, index
inputs = document.getElementsByTagName('input')

async function getSetor() {
  try {
    setor.value =  (await axios.get(`setor/${id}`)).data
    nome.value = setor.value.nome
    console.log(setor.value)
  }
  
  catch(ex){
    erro.value = (ex as Error).message;
  }
        
}
async function ativarInputs() {
    for (index = 0; index < inputs.length; ++index) {
        inputs[index].disabled = false
        
    }
    document.getElementById('nome').disabled = false

}

async function deletar() {
    await axios.delete(`setor/${id}`)
    window.location.href='/setor'
}
async function atualizarSetor() {
try {
await axios.put(`setor/${id}`, {
  "id":  setor.value.id,
  "nome": nome.value
}
)
window.location.href='/setor'
}
catch(ex){
erro.value = (ex as Error).message;
}
}

onMounted(() => {
    getSetor();
    // ativarInputs();
   atualizarSetor();

})
</script>