<template>
    <div class="form">
      <div class="cliente">
        <!-- <h2 >Contrato {{ contrato.cliente}} </h2> -->
        </div>
        <button type="submit" @click="ativarInputs" class="editar">Habilitar Edição</button>
        <button type="submit" @click="deletar" class="deletar">Deletar</button>
    <div class="numero_contrato">
        <label>Número do contrato:</label>
        <input type="number" id="numero_contrato" v-model="numero_contrato" :disabled="true">
    </div>
    <div class="datas">
          <label for="ticketNum">Data de início:</label>
          <input  type="date" class= "data1" id="inicio_contrato" v-model="inicio_contrato" :disabled="true" @change="atualizar"/>
          <label class="data2_text">Data de encerramento:</label>
          <input type="date" class= "data2" id="fim_contrato" v-model="fim_contrato" :disabled="true"/>
        </div>
        <div class="valores">
          <label for="ticketNum">Valor do contrato:</label>
          <input class="valor_contrato" type="number" id="valor_contrato" v-model="valor_contrato" :disabled="true"/>
          <label for="ticketNum" class="tipo_pagamento_text">Tipo de Pagamento: </label>
            <select class="tipo_pagamento" id="detalhes_pagamento" v-model="detalhes_pagamento" :disabled="true">
              <option value="A vista">À vista</option>
              <option value="Parcelamento">Parcelamento</option>
              <option value="Outros">Outros</option>
            </select>
        </div>

        <div class="valor_multa">
          <label for="ticketNum" class="valor_multa">Multa contratual:</label>
          <input class="multa" type="number" id="valor_multa" v-model="valor_multa" :disabled="true"/>
        </div>
        <div class="clausulas">
          <label>Cláusulas: </label>
          <textarea placeholder="Digite sua mensagem" minlength="20" class="clausulas" id="clausulas_contrato" v-model="clausulas_contrato" :disabled="true"></textarea>
        </div>
        <div class="prazo">
          <label>Prorrogação de prazo:</label>
        <input type="text" placeholder="Quantidade de dias" class="prazo" id="tempo_prorrogacao" v-model="tempo_prorrogacao" :disabled="true"/>
        </div>
        <div class="descricao_contrato">
          <label for="ticketNum" class="tipo_pagamento_text">Nível de Inspeção </label>
        <select class="Nível de Inspeção" id="descricao_contrato" v-model="descricao_contrato" :disabled="true">
              <option value="Baixa Complexidade Técnica">Baixa Complexidade</option>
              <option value="Média Complexidade Técnica">Média Complexidade</option>
              <option value="Alta Complexidade Técnica">Alta Complexidade</option>
            </select>
        </div>
        <button @click="atualizar" class="botaoEditar" >Salvas alterações</button>
        <p v-if="erro">{{erro}}</p>

    </div>

</template>
<style>
.descricao_contrato {
  margin-left: -25% !important;
}
.botaoEditar {
    font-size: 15px;
    width: 9em;
    background-color: green;
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
    width: 8em;
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
    width: 8em;
}

.deletar:hover {
    font-size: 15px;
    background-color: rgb(255, 255, 255);
    width: 8em;
    height: 2.2em;
    color: red;
    border: 1px solid red;
    box-shadow: 2px 2px rgba(255, 0, 0, 0.034);
}

.form {
    margin-left: 1%;
    border: 1px solid rgba(112, 105, 105, 0.342);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 5px 5px #88888811;
}

.prazo label {
  font-size: 17px;
  font-weight: bold;
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
</style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue';
import { onMounted } from 'vue'
import axios from 'axios'   
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const contrato = ref()
const route = useRoute();
const id = parseInt(route.params.id)
var numero_contrato = ref()
var valor_contrato = ref()
var valor_multa = ref()
var inicio_contrato = ref()
var fim_contrato = ref()
var detalhes_pagamento = ref('')
var tempo_prorrogacao = ref('')
var descricao_contrato = ref('')
var clausulas_contrato = ref('')
var cliente = ref()
const cli = ref({})
async function getContrato() {
  try {
    contrato.value =  (await axios.get(`contrato/${id}`)).data
    numero_contrato.value = contrato.value.numero_contrato
    valor_contrato.value = contrato.value.valor_contrato
    valor_multa.value = contrato.value.valor_multa
    inicio_contrato.value = contrato.value.inicio_contrato
    fim_contrato.value = contrato.value.fim_contrato
    detalhes_pagamento.value = contrato.value.detalhes_pagamento
    tempo_prorrogacao.value = contrato.value.tempo_prorrogacao
    descricao_contrato.value = contrato.value.descricao_contrato
    clausulas_contrato.value = contrato.value.clausulas_contrato
    cliente.value = contrato.value.cliente

    
    getCliente()
  }
  
  catch(ex){
    console.log(ex)
    // erro.value = (ex as Error).message;
  }
        
}

async function getCliente() {
    cli.value =  (await axios.get(`cliente/${cliente.value.id}`)).data
}
var inputs,index

inputs = document.getElementsByTagName('input')

async function ativarInputs() {
    for (index = 0; index < inputs.length; ++index) {
        inputs[index].disabled = false
        
    }
    document.getElementById('detalhes_pagamento').disabled = false
    document.getElementById('clausulas_contrato').disabled = false
    document.getElementById('descricao_contrato').disabled = false

}
async function deletar() {
    await axios.delete(`contrato/${id}`)
    window.location.href='/contrato'
}

async function atualizar() {

    try {
    await axios.put(`contrato/${id}`, {
      "id":  contrato.value.id,
      "numero_contrato": numero_contrato.value,
      "valor_contrato": valor_contrato.value,
      "valor_multa": valor_multa.value,
      "inicio_contrato": inicio_contrato.value,
      "fim_contrato": fim_contrato.value,
      "detalhes_pagamento": detalhes_pagamento.value,
      "tempo_prorrogacao": tempo_prorrogacao.value,
      "descricao_contrato": descricao_contrato.value,
      "clausulas_contrato": clausulas_contrato.value,
      "cliente": cliente.value
    }

    )
    window.location.href='/contrato'
  }
  catch(ex){
    erro.value = (ex as Error).message;
  }
}
async function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      
      return new Date(date).toLocaleDateString('en', options)
    }
onMounted(() => {
    getContrato();
    // ativarInputs();
    atualizar();
   

})

</script>