<template id="template">
  <div class="form-popup" id="myForm" >
    <div class="form-container">
      <h3 class="title">Novo contrato</h3>
      <hr>
  
        <div class="divs">
              <label>Número do Contrato: </label>
            <input type="number"  id="input_texto" v-model="numero_contrato" />
            </div>
            <div class="divs">
              <label>Data de Início: </label>
            <input type="date" v-model="inicio_contrato" id="input_data"/>
            </div>
            <div class="divs">
              <label>Data de Encerramento: </label>
            <input type="date" v-model="fim_contrato" id="input_data"/>
            </div>
            <div class="divs">
              <label>Valor: </label>
            <input type="text"  id="valor_contrato" v-model="valor_contrato" />
            <label for="ticketNum" class="tipo_pagamento_text">Tipo de Pagamento: </label>
              <select class="tipo_pagamento" id="detalhes_pagamento" v-model="detalhes_pagamento">
                  <option value="A vista">À vista</option>
                  <option value="Parcelamento">Parcelamento</option>
                  <option value="Outros">Outros</option>
              </select>
            </div>
            <div class="divs">

            </div>
            <div class="divs">
              <label>Multa: </label>
            <input type="text" id="valor_multa" v-model="valor_multa" />
            </div>
            <div class="cliente">
              <label>Cliente: </label>
                  <select class="cliente" id="cliente_id" v-model="cliente" @change="getCliente()">
                  <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nome_fantasia}}</option>
                  </select>
              </div>
              <div >
                  <label>Cláusulas: </label>
                  <textarea placeholder="Digite sua mensagem" minlength="20" class="clausulas" id="clausulas_contrato" v-model="clausulas_contrato"></textarea>
              </div>
              <div class="cliente">
                <label>Nível de Inspeção: </label>
                    <select class="cliente" id="cliente_id" v-model="nivel_inspecao" @change="getNivel()">
                      <option value="Baixa Complexidade Técnica">A Definir</option>
                      <option value="Baixa Complexidade Técnica">Baixa Complexidade</option>
                      <option value="Média Complexidade Técnica">Média Complexidade</option>
                      <option value="Alta Complexidade Técnica">Alta Complexidade</option>
                    </select>
              </div>
            <button type="submit" class="btn cadastrar" @click="cadastrarContrato()">Cadastrar</button>
            <button type="button" class="btn cancel" @click="closeForm()">Cancelar</button>
      </div>
  </div>
      <!-- Tab links -->
      <div class="screen" id="screen">
        <hr>
        <div class="header">
          <h3 class="title">CONTRATOS</h3>
          <input type="text" placeholder="Buscar um Cliente" class="busca">
          <button class="btn-buscar"><i class="fas fa-search"></i></button>
          <!-- <button class="novo"></button> -->
          <button class="novo" @click="openForm()">Novo Contrato</button>
        </div>
        
  
  
          <table class="tabela" id="tabela">
              <thead class="cabecalho">
                  <th class="id">IDENTIFICADOR</th>
                  <th class="extenso">CLIENTE</th>
                  <th>DATA DE INÍCIO</th>
                  <th>DATA DE ENCERRAMENTO</th>
                  <th>VALOR</th>
                  <th>COMPLEXIDADE</th>
              </thead>
              <tbody>
                  <tr v-for="contrato in contratos" :key="contrato.id">
                      <td class="id"><RouterLink :to="{ name: 'DetalhesContrato', params: {id :contrato.id} }" class="link">{{ contrato.numero_contrato }}</RouterLink></td>
                      <td>{{ contrato.cliente.nome_fantasia }}</td>
                      <td>{{ String(contrato.inicio_contrato).split("-").reverse().join("/")}}</td>
                      <td>{{ String(contrato.fim_contrato).split("-").reverse().join("/") }}</td>
                      <td>{{ contrato.valor_contrato }}</td>
                      <td>{{ contrato.descricao_contrato }}</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </template>
  <style>
  /* INPUTS */
  #input_texto {
      margin-top: 4px;
      background-color: rgb(255, 255, 255);
      border-radius: 7px;
      color: black;
      padding: 5px;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      margin-right: -15em;
  }
  #valor_contrato {
      margin-top: 4px;
      background-color: rgb(255, 255, 255);
      border-radius: 7px;
      color: black;
      padding: 5px;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      margin-right: -15em;
  }
  #valor_multa {
      margin-top: 4px;
      background-color: rgb(255, 255, 255);
      border-radius: 7px;
      color: black;
      padding: 5px;
      margin-bottom: 0;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  }
  #input_data {
      text-align: center;
      width: 10em;
      border-radius: 7px;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; 
  }
  #clausulas_contrato {
      width: 40em;
      margin-top: -20px;
      height: 5em !important;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; 
      border: 1px solid white;
      padding: 10px;

  }
  .screen {
      margin-top: 20px;
      min-height: 50rem;
      border-radius: 1px;
      background-color: white;
      width: 95%;
      margin-left: 9%;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
      }
  /* HEADER */
  hr{
    color: white;
  }
  .title {
    display: inline-block;
  }
  .busca {
    margin-left: 60%;
    display: inline-block;
    box-shadow: rgba(99, 99, 99, 0.256) 0px 2px 8px 0px;
    border-radius: 0px;
    padding: 10px;
    font-size: 10px;
  }
  .btn-buscar:hover {
    color: rgb(98, 98, 98);
    background-color: white;
    height: 30px;
    width: 30px;
    border: 1px solid rgb(98, 98, 98);
    font-size: 15px;
    padding: 0;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  .btn-buscar {
    height: 30px;
    width: 30px;
    padding: 0;
    transition-duration: .1s;
    color: #fcfcfb;
    background-color:rgb(255, 187, 0);
    border: 1px solid rgb(255, 187, 0);
    font-size: 15px;
  }
  .header{
    padding: 10px;
    color: rgb(98, 98, 98);
    margin-left: 5%;
    margin-top: 20px;
    width: 90%;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .novo {
    color: #fcfcfb;
    background-color: rgb(255, 187, 0);
    border: 1px solidrgb(255, 187, 0);
    font-size: 14px;
  }
  .novo:hover {
    color: rgb(98, 98, 98);
    background-color: white;
    border: 1px solid rgb(98, 98, 98);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  /* TABELA */
  .tabela {
  margin-top: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  th {
    font-size: 12px;
    width: 10em;
  } 
  .extenso {
    width: 30em;
  }
  
  td{
    text-align  : left;
    color: rgb(84, 84, 84);
    font-size: 14px;
  }
  p {
    text-align: left;
    font-size: 13px;
  }
  .id {
    font-size: 13px;
    text-align: left;
    color: black;
  }
   .link {
      text-decoration: none;
      color:black;
      padding: 5px;
      border-radius: 9px;
  }
  .link:hover {
      text-decoration: none;
      color:black;
      font-weight: bold;
      padding: 5px;
      border-radius: 9px;
  }
  
  table{
    margin-left: 5%;
  }
  tr:hover{
    background-color: rgb(255, 255, 255);
    transition-duration: .18s;
    height: 2.55em;
    transform: translate(2px, 3%);
    box-shadow: rgba(0, 0, 0, 0.189) 0px 3px 8px;
  }
  tr{
    transform: translate(2px, 3%);
    transition-duration: 1.5s;
  }
  td:hover{
    color: black;
  }
  tr {
    padding: 3px;
  }
  
  /* FORM */
  
  
  /* The popup form - hidden by default */
  .form-popup {
    display: none;
    position: fixed;
    bottom: 0;
    align-items: center;
    margin-bottom: 20px;
    z-index: 9;
  }
  
  /* Add styles to the form container */
  .form-container {
    max-width: 500px;
    min-width: 1000px;
    padding: 10px;
    height: 35em;
    transition-duration: .5s;
    margin-left: 10%;
    background-color: white;
    /* border: 1px solid rgba(0, 0, 0, 0.192); */
    border-radius: 10px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  
  }
  
  /* Full-width input fields */
  .form-container input[type=text], .form-container input[type=password] {
    width: 20em;
    padding: 15px;
    margin: 5px 0 22px 0;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.185);
  
  }
  select {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  
  /* When the inputs get focus, do something */
  .form-container input[type=text]:focus, .form-container input[type=password]:focus {
    background-color: #ffffff;
    outline: none;
    border: 1px solid rgb(255, 187, 0);
    box-shadow: rgba(255, 187, 0, 0.11) 0px 2px 8px 0px;
  
  }
  
  /* Set a style for the submit/login button 
  
  */
  .form-container .btn {
    background-color: #04AA6D;
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    margin-bottom:10px;
    opacity: 0.8;
  }
  
  /* Add a red background color to the cancel button */
  .form-container .cancel {
    background-color: red;
    width: 5em;
    height: 2.5em;
  
    padding: 0;
    
  }
  
  .form-container .cadastrar {
    background-color: rgb(2, 178, 20);
    width: 5em;
    height: 2.5em;
    padding: 0;
    margin-right: 10px !important;
    
    
  }
  .cliente {
    margin-bottom: 20px;
  }
  /* Add some hover effects to buttons */
  .form-container .btn:hover, .novo:hover {
    opacity: 1;
  }
  </style>
  <script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'   
import { ref } from 'vue'

const contratos = ref([])
const clientes = ref([])
const erro = ref()
var TokenStorage = localStorage.getItem("Token");

async function buscarContrato() {
try {
  const response = await axios.get('contrato', {
    headers:{
      'Authorization': TokenStorage
    }
  })
  contratos.value = response.data
} catch (error) {
  console.error('Error fetching servico:', error)
}
}

const formatMONETARIO = (el) => {
el.addEventListener('input', (e) => {
  let value = e.target.value;
  
  // Remove todos os caracteres, exceto números e a primeira vírgula
  value = value.replace(/[^\d,]|(,.*?,)/g, '');
  
  // Remove vírgulas duplicadas
  value = value.replace(/,+/g, ',');
  
  // Adiciona "R$ " no início
  e.target.value = `R$ ${value}`;
});
};



async function buscarCliente() {
try {
  const response = await axios.get('cliente', {
    headers:{
      'Authorization': TokenStorage
    }
  })
  clientes.value = response.data
} catch (error) {
  console.error('Error fetching servico:', error)
}  
}

const numero_contrato = ref()
const valor_contrato = ref()
const valor_multa = ref()
const inicio_contrato = ref()
const fim_contrato = ref()
const detalhes_pagamento = ref('')
const tempo_prorrogacao = ref('')
var nivel_inspecao = ref('')
const clausulas_contrato = ref('')

async function atualizar(){
try {
  contratos.value = (await axios.get('contrato', {
    headers:{
      'Authorization': TokenStorage
    }
  })).data
}
catch(ex) {
  erro.value = (ex as Error).message
}
}
const cliente = ref()
const cli = ref()
async function getCliente() {
  cli.value =  (await axios.get(`cliente/${cliente.value}`, {
    headers:{
      'Authorization': TokenStorage
    }
  })).data
}

async function cadastrarContrato() {
try {
  await axios.post('contrato', {
    "numero_contrato": numero_contrato.value,
    "valor_contrato": valor_contrato.value.replace("R$","").replace(" ",""),
    "valor_multa": valor_multa.value.replace("R$","").replace(" ",""),
    "inicio_contrato": inicio_contrato.value,
    "fim_contrato": fim_contrato.value,
    "detalhes_pagamento": detalhes_pagamento.value,
    "tempo_prorrogacao": tempo_prorrogacao.value,
    "descricao_contrato": nivel_inspecao.value,
    "clausulas_contrato": clausulas_contrato.value,
    "cliente": cli.value
  }, {
    headers:{
      'Authorization': TokenStorage
    }
  })
  window.location.href='/contrato'
}
catch(ex){
  erro.value = (ex as Error).message;
}
atualizar();
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("screen").style.filter = "blur(8px)";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("screen").style.filter = "blur(0px)";

}
onMounted(() => {
  const custoInput = document.getElementById('valor_multa');
formatMONETARIO(custoInput);
const custoValor = document.getElementById('valor_contrato');
formatMONETARIO(custoValor);
buscarContrato();
buscarCliente();
atualizar();

})
</script>


