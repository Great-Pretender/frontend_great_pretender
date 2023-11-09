<template>
  <div class="form">
    <div class="item">
      <h2>Item </h2>
    </div>
    <button type="submit" @click="ativarInputs" class="editar">Habilitar Edição</button>
    <button type="submit" @click="deletar" class="deletar">Deletar</button>

    <div>
      <form>
        <div>
          <label for="ItemName">Item:</label><br>
          <input type="text" id="InputItemName" name="ItemName" v-model="nome" :disabled="true"><br>
        </div>
          
        <div>
          <label for="ItemModel">Modelo:</label><br>
          <input type="text" id="InputItemModel" name="ItemModel" v-model="modelo" :disabled="true"><br>
        </div>

        <div>
          <label for="ItemBrand">Marca:</label><br>
          <input type="text" id="InputItemBrand" name="ItemBrand" v-model="marca" :disabled="true"><br>
        </div>

        <div>
          <label for="ItemBrand">Serviço: {{ servico.nome }}</label><br>
            <select class="servico" id="servico_id" v-model="servico" @change="getServico()" :disabled="true">
                <option v-for="servico in servicos" :key="servico.id" :value="servico.id">{{ servico.nome}}</option>
            </select>
        </div>

        <div>
          <label for="ServicoSection">Setor:</label><br>
          <input list="ListSection" type="text" id="InputServicoSection" name="ServicoSection" v-model="setor" :disabled="true"><br>
        </div>

        <div>
          <label for="ItemValidation">Validação:</label><br>
          <input type="text" id="InputItemValidation" name="ItemValidation" v-model="validade" :disabled="true"><br>
        </div>

        </form>
    </div>
    <button @click="atualizar" class="botaoEditar">Salvas alterações</button>
    <p v-if="erro">{{ erro }}</p>

  </div>
</template>
<style>
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

.clausulas label {
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

.valor_multa label {
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
//axios.defaults.baseURL = 'https://8080-greatpreten-backendgrea-t1i4c91qf2n.ws-us105.gitpod.io/'

const route = useRoute();
const id = parseInt(route.params.id)

//Variaveis das funções
var nome = ref('');
var setor = ref('');
var marca = ref('');
var modelo = ref('');
var validade = ref('');
var serv = ref();
var servicos = ref();
var inputs,index;
var item = ref()

interface Setor {
    id: number,
    nome: string
}

interface Servico {
  id: number,
  nome: string,
  descricao: string,
  risco: string,
  duracao_dias: string,
  custo: string,
  setor: Setor
}
var servico:Servico = {
        id: 0,
        nome: "",
        descricao: "",
        risco: "",
        duracao_dias: "",
        custo: "",
        setor: {
          id: 0,
          nome: ""
        }
}

var erro = ref("")

async function getItem() {
  try {
    item.value = (await axios.get(`item/${id}`)).data
    console.log(item.value)
    nome.value = item.value.nome
    marca.value = item.value.marca
    modelo.value = item.value.modelo
    validade.value = item.value.validade
    setor.value = item.value.setor
    servico = {
      id:item.value.servico.id,
      nome:item.value.servico.nome,
      descricao:item.value.servico.descricao,
      custo:item.value.servico.custo,
      risco:item.value.servico.risco,
      duracao_dias:item.value.servico.duracao_dias,
      setor: {
        id:item.value.servico.setor.id,
        nome:item.value.servico.setor.nome
      }
    }

  }catch(ex){
    console.log(ex)
  }
}

async function getServicos() {
  servicos.value = (await axios.get(`servico`)).data
  console.log(servicos.value);
}

async function getServico() {
  serv.value = (await axios.get(`servico/${servico}`)).data
  console.log(serv.value);
}

inputs = document.getElementsByTagName('input')

  async function ativarInputs() {
      for (index = 0; index < inputs.length; ++index) {
          inputs[index].disabled = false
          
      }
      document.getElementById('servico_id').disabled = false
  }

async function deletar() {
  await axios.delete(`item/${id}`)
  window.location.href = '/Item'
}

async function atualizar() {

  try {
    await axios.put(`item/${id}`, {
      "id": id,
      "nome": nome.value,
      "marca": marca.value,
      "modelo": modelo.value,
      "validade": validade.value,
      "setor": setor.value,
      "servico": serv.value
    }

    )
    window.location.href = '/Item'
  }
  catch (ex) {
    erro.value = (ex as Error).message;
  }
}
  onMounted(() => {
    getItem()
    getServicos()
   })


</script>