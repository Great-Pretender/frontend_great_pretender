

<template>
    
   
    <div id="tabBox">
  <div class="tabWrap">
    <input id="tab-01" name="tab" type="radio" checked />
    <label class="tab label-01" for="tab-01"><span>Lista</span></label>
    <!-- tabContent 01 -->
    <article class="tabContent">
      <h1>Lista de Contratos</h1>
      <table>
        <thead>
            <th>NÚMERO DO CONTRATO</th>
            <th>CLIENTE</th>
            <th>DATA DE INÍCIO</th>
            <th>DATA DE ENCERRAMENTO</th>
            <th>TEMPO PRORROGADO</th>
            <th>VALOR DO CONTRATO</th>
            <th>FORMA DE PAGAMENTO</th>
            <th>VALOR DA MULTA</th>
            <th>COMPLEXIDADE</th>
        </thead>
        <tbody>
            <tr v-for="contrato in contratos" :key="contrato.id">
                <td><RouterLink :to="{ name: 'DetalhesContrato', params: {id :contrato.id} }" class="link">{{ contrato.numero_contrato }}</RouterLink></td>
                <td>{{ contrato.cliente.nome_fantasia }}</td>
                <td>{{ String(contrato.inicio_contrato).split("-").reverse().join("/")}}</td>
                <td>{{ String(contrato.fim_contrato).split("-").reverse().join("/") }}</td>
                <td>{{ contrato.tempo_prorrogacao }}</td>
                <td>{{ contrato.valor_contrato }}</td>
                <td>{{ contrato.detalhes_pagamento }}</td>
                <td>{{ contrato.valor_multa }}</td>
                <td>{{ contrato.descricao_contrato }}</td>
            </tr>
        </tbody>
    </table> 

    </article>
  </div>
  <div class="tabWrap">
    <input id="tab-02" name="tab" type="radio" />
    <label class="tab label-02" for="tab-02"><span>Cadastro</span></label>
    <!-- tabContent 02 -->
    <article class="tabContent">
      <h3>Preencha as informações:</h3>

        <div class="numero_contrato">
          <label>Número do contrato:</label>
        <input type="number" id="numero_contrato" v-model="numero_contrato" />
        </div>
        <div class="datas">
          <label for="ticketNum">Data de início:</label>
          <input  type="date" class= "data1" id="inicio_contrato" v-model="inicio_contrato" />
          <label class="data2_text">Data de encerramento:</label>
          <input type="date" class= "data2" id="fim_contrato" v-model="fim_contrato" />
        </div>
        <div class="valores">
          <label for="ticketNum">Valor do contrato:</label>
          <input class="valor_contrato" type="text" id="valor_contrato" v-model="valor_contrato" />
          <label for="ticketNum" class="tipo_pagamento_text">Tipo de Pagamento: </label>
            <select class="tipo_pagamento" id="detalhes_pagamento" v-model="detalhes_pagamento">
              <option value="A vista">À vista</option>
              <option value="Parcelamento">Parcelamento</option>
              <option value="Outros">Outros</option>
            </select>
        </div>
        <div class="valor_multa">
          <label for="ticketNum" class="valor_multa">Multa contratual:</label>
          <input class="multa" type="text" id="valor_multa" v-model="valor_multa" />
        </div>
        <div class="cliente">
        <label>Cliente: </label>
            <select class="cliente" id="cliente_id" v-model="cliente" @change="getCliente()">
              <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nome_fantasia}}</option>
            </select>
        </div>
        <div class="clausulas">
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
        <div class="prazo">
          <label>Prorrogação de prazo:</label>
        <input type="text" placeholder="Quantidade de dias" class="prazo" id="tempo_prorrogacao" v-model="tempo_prorrogacao"/>
        </div>
        <div>
          <button @click="cadastrarContrato">Cadastrar</button>
        </div>
        <p v-if="erro">{{erro}}</p>

   
    </article>
  </div>
  
</div>
</template>

<style>
th {
  width: 25em;
  font-size: 15px;
}
.link {
  text-decoration: none;
  color:black;
  font-weight: bold;
  background-color: rgba(275, 187, 0, .5);
  padding: 5px;
  border-radius: 9px;
}
.link:hover {
  text-decoration: none;
  color:rgb(5, 5, 5);
  font-weight: bold;
  font-size: 17px;
  transition-duration: .2s;
}
.prazo label {
  font-size: 17px;
  font-weight: bold;
}
tr:hover {
  transition-duration: .4s;
  background-color: rgba(255, 187, 0, 0.027);
}
.prazo input {
  width: 10em;
  text-align: right;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);  
}
.clausulas label{
  font-size: 17px;
  position: absolute;
}
label {
  font-weight: bold;

}
.clausulas textarea {
  margin-top: 2em;
  width: 90%;
  height: 20em;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.651);
  border: 1px solid rgba(0, 0, 0, 0.233);
  padding: 1em;
}
.numero_contrato label {
  font-size: 17px;
  color: black;
}
.numero_contrato input {
    width: 10em;
    text-align: right;
    height: 30px;
    border-radius: 5px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.575);
    border: 1px solid rgba(0, 0, 0, 0.233);
}

.numero_contrato {
  margin-bottom: 15px;
}
.datas label {
  font-size: 17px;
}

.datas .data1 {
  margin-right: 15%;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
}
.datas .data2 {
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
}
.datas {
  margin-bottom: 20px;
}

.data2_text {
  margin-left: 16em;
}
.cliente {
  margin-top: .5%;
  margin-bottom: .5%;
}

.cliente label {
  padding-top: 20px;
  font-size: 17px;
}

.cliente select {
  margin-top: 20px;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
  text-align: left;
  margin-right: 4.5%;
  width: 35%;
}
.valores label {
  font-size: 17px;
}
.tipo_pagamento_text {
  margin-left: 16.5em;
}
.valor_multa label{
  font-size: 17px;
}
.valor_multa {
  margin-top: 15px;
}
.valor_multa .multa {
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
  text-align: right;
  margin-right: 4.5%;
}

th {
  font-weight: bold;
  background-color: rgb(255, 187, 0);
  color: white !important;
}

.valores .valor_contrato {
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
  text-align: right;
  margin-right: 4.5%;
}

.valores .tipo_pagamento {
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
  text-align: right;
  width: 15%;
}

button {
  margin-left: 87%;
  font-size: 21px;
}
th, td {
    border: 1px solid #dddddd8c;
    text-align: center;
    border-radius: 2px;
    color: #000000;
    padding: 10px;
  }

/* tabBox */
#tabBox {
  width: 100%;
  height: auto;
  margin: 0 auto;
  position: relative;
}
.tabWrap {
  float: none;
}

td {
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  text-align: center;
}
table {
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(85, 84, 84, 0.281);
  border-radius: 10px;
}
tr {
  border: 1px solid black;
}
/* Hide Input Radio */
input[type="radio"] {
  display: none;
}

/* Tabs */
.tab {
  width: 100%;
  height: 65px;
  margin: 0 auto;
  background: rgba(255,187,0,1);
  border: none;
  position: relative;
  cursor: pointer;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  display: block;
}
.tab::before {
  display: none;
}
.tab::after {
  content: '';
  display: none;
  border-radius: 10px;

}
.tab span {
  color: #FFF;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  text-align: center;
  line-height: 65px;
  display: block;
}

.label-01 {
  z-index: 20;
}
.label-02 {
  z-index: 20;
  position: absolute;
}
.label-03 {
  z-index: 1;
}

/* Display Checked Input */
.tabWrap [id^="tab"]:checked ~ .tabContent {
  display: block;
}
/* Bring Forward Checked Input */
.tabWrap [id^="tab"]:checked + label {
  background: #cf1717;
  z-index: 4;
}

.tabWrap [class^="tab label"]:not(.label-01) {
  margin-left: 0;
}

/* Unchecked Input Hover */
.tabWrap [id^="tab"]:not(:checked) + label:hover {
  background: #000000;
  border: none;
}

/* Unchecked Input */
.tabWrap [id^="tab"]:not(:checked) + label::before {
  background: #000000;
  border-radius: 20px;
  transition-duration: 1s;
  
}

/* Checked Input No Shadow*/
.tabWrap [id^="tab"]:checked + label::after {
  display: none;

}

/* tabContent */
.tabContent {
  width: 90%;
  height: auto;
  min-height: 300px;
  margin: 0 auto;
  padding: 5%;
  background: #FFF;
  box-shadow: 0 4px 0 0 rgba(0,0,0,0.015);
  position: absolute;
  /* Multiple .tab Height By Number Of .tab(s) To Get Position Absolute Top */
  top: 195px;
  border:  1px solid black;
  left: 0;
  display: none;
  z-index: 1;
}
.tabContent h1, p {
  font-family: 'Open Sans', sans-serif;
}
.tabContent h1 {
  margin: 0;
  margin-top: 20px;
  color: rgb(255, 187, 0);
  font-size: 1.5em;
  text-transform: uppercase;
}
.tabContent p {
  margin: .5em 0;
  color: #222;
}

/* Media Queries */
@media (min-width: 800px) {
  #tabBox {
    width: 400px;
    margin: 25px auto;
  }
  .tabWrap {
    float: left;
  }
  .tab {
    width: 70px;
    height: auto;
    margin: 0;
    background: none;
    /* border: 50px solid #FFF; */
    border-top: none;
    margin-right: 50px;
    
    border-right: 15px solid transparent;
    position: relative;
    cursor: pointer;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    display: inline-block;
  }
  .tab::before {
    content: '';
    width: 10px;
    height: 25px;
    background: rgb(255, 187, 0);
    
    /* border-radius: 10%; */
    position: absolute;
    top: 11.5px;
    padding-left: 5em;
    padding-right: 5em;
    margin-left: -19em;
    text-align: center;
    /* justify-content: center; */
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    display: inline-block;
    text-align: right;
  }
  .tab::after {
    content: '';
    width: 90px;
    height: 2px;
    background: rgba(0,0,0,0.025);
    position: absolute;
    border-radius: 10px;
    font-size: 20px;
    top: 48px;
    right: -15px;
    display: block;
  }
  .tab span {
    line-height: 50px;
    position: absolute;
    top: 0;
    left: -250px;
  }


  /* Cancel Checked Input Background */
  .tabWrap [id^="tab"]:checked + label {
    background : none;
  }
  /* Unchecked Input Hover */
  .tabWrap [id^="tab"]:not(:checked) + label:hover {
    background: none;
    /* border: 10px solid #F9F9F9; */
    border-top: none;
    border-right: 15px solid transparent;
  }
  .tabWrap [class^="tab label"]:not(.label-01) {
    margin-left: -5px;
  }
  .tabContent {
    width: 1000px;
    position: absolute;
    top: 30px;
    left: 0;
    margin-left: -75%;
    border: 1px solid rgba(10, 8, 8, 0.176);
    box-shadow: 5px 10px #88888833;
    border-radius: 20px;
  }
}
@media (min-width: 2000px) {
  #tabBox {
    width: 800px;
    
    
  }
  .tabContent {
    width: 950px;
  }
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


