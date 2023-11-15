<template>
<div class="cadastro-setor">
  <input type="text" name="" id="" v-model="nome">
  <button id="myBtn" class="btn-setor" @click="cadastrarSetor()">Adicionar Setor</button>
</div>  

<div class="background">
  <div class="container">
    <div class="panel pricing-table">
      
      <div class="pricing-plan" v-for="setor in setores" :key="setor.id" :value="setor.nome">
        <h2 class="pricing-header">{{ setor.nome }}</h2>
        <a class="pricing-button"><RouterLink :to="{ name: 'DetalhesSetor', params: {id :setor.id} }" class="link">informações</RouterLink></a>
      </div>
    </div>
  </div>
</div>
</template>
<style>
.link{
  background-color: #ffed4800;
  color: rgb(255,187,0);
}
.link:hover{
  background-color: #ffed4800;
  color: rgb(255,187,0);
}
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.cadastro-setor{
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0);
  width: 25em;
  padding: 10px;
  border-radius: 10px;
  margin-left: 7%;
  box-shadow: 0px 1px 3px -6px rgba(0, 0, 0, 0.08), 0px 2px 21px 3px rgba(0, 0, 0, 0.09), 0px 8px 20px 7px rgba(0, 0, 0, 0.02);

}
.cadastro-setor input {
  width: 15em;
    text-align: right;
    height: 30px;
    border-radius: 5px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.575);
    border: 1px solid rgba(0, 0, 0, 0.233);
}
.btn-setor{
  height: 35px;
  padding: 0;
  width: 8em;
  margin-left: 15px;
  font-size: 14px;
  margin-right: 0;
}
.btn-setor:hover{
  height: 35px;
  padding: 0;
  width: 8em;
  font-size: 14px;
  color: black;
  background-color: rgb(255,187,0);
}
html {
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.background {
  padding: 0 25px 25px;
  position: relative;
  width: 100%;
}



@media (min-width: 900px) {
  .background {
    padding: 0 0 25px;
  }
}

.container {
  margin: 0 auto;
  padding: 50px 0 0;
  max-width: 960px;
  width: 100%;

}

.panel {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px 25px;
  position: relative;
  width: 100%;
  z-index: 10;
}

.pricing-table {
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.09), 0px 8px 20px 7px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  width: 50em;
  margin-left: 10%;
}

@media (min-width: 200px) {
  .pricing-table {
    flex-direction: column;
  }
}

.pricing-table * {
  text-align: center;
  text-transform: uppercase;
}

.pricing-plan {
  border-bottom: 1px solid #3594e7;
  padding: 25px;

}

.pricing-plan:last-child {
  border-bottom: none;
}

@media (min-width: 200px) {
  .pricing-plan {
    border-bottom: 1px solid rgba(0, 0, 0, 0.11);
    border-right: 1px solid #e1f1ff28;
    flex-basis: 100%;
    padding: 25px 50px;
  }

  .pricing-plan:last-child {
    border-right: none;
  }
}

.pricing-img {
  margin-bottom: 25px;
  max-width: 100%;
}

.pricing-header {
  color: #888;
  font-weight: 600;
  letter-spacing: 1px;
}

.pricing-features {
  color: #016FF9;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 50px 0 25px;
}

.pricing-features-item {
  border-top: 1px solid #e1f1ff;
  font-size: 12px;
  line-height: 1.5;
  padding: 15px 0;
}

.pricing-features-item:last-child {
  border-bottom: 1px solid #e1f1ff;
}

.pricing-price {
  color: #016FF9;
  display: block;
  font-size: 32px;
  font-weight: 700;
}

.pricing-button {
  border: 1px solid #ff8800;
  border-radius: 10px;
  color: rgb(255,187,0);
  display: inline-block;
  margin: 25px 0;
  padding: 15px 35px;
  text-decoration: none;
  transition: all 150ms ease-in-out;
  font-weight: bold;
}

.pricing-button:hover,
.pricing-button:focus {
  background-color:rgba(255, 187, 0, 0.075);
}

.pricing-button.is-featured {
  background-color: #ffed48;
  color: #fff;
}

.pricing-button.is-featured:hover,
.pricing-button.is-featured:active {
  background-color: #f1f1f1;
}
</style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'   
import { ref } from 'vue'
const setores = ref([])

//Variaveis do localstorage
var TokenStorage = localStorage.getItem("Token");

async function buscarSetor() {
  try {
    setores.value = (await axios.get('setor', {
      headers:{
        'Authorization': TokenStorage
      }
    })).data
    console.log(setores.value)
  } catch (error) {
    console.error('Error fetching servico:', error)
  }
}

async function atualizar(){
  try {
    setores.value = (await axios.get('setor', {
      headers:{
        'Authorization': TokenStorage
      }
    })).data
  }
  catch(ex) {
    erro.value = (ex as Error).message
  }
}

// Cadastrar Setor
const nome = ref('')
async function cadastrarSetor() {
  try {
    await axios.post('setor', {
      "nome": nome.value,
    },{
      headers: {
        'Authorization': TokenStorage
      }
      })
    window.location.href='/setor'
  }
  catch(ex){
    erro.value = (ex as Error).message;
  }
  atualizar();
}


onMounted(() => {
  buscarSetor();
  atualizar();
})

</script>