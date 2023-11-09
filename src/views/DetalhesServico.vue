<template>
    <div class="form">
      <div class="servico">
        <h2 >Serviço </h2>
        </div>
        <button type="submit" @click="ativarInputs" class="editar">Habilitar Edição</button>
        <button type="submit" @click="deletar" class="deletar">Deletar</button>

        <div>
          <label>Serviço:</label>
          <input type="text" id="numero_contrato" v-model="nome" :disabled="true">
        </div>
        <br>
        <div class="clausulas">
          <label>Descrição:</label>
          <textarea placeholder="Digite sua mensagem" id="numero_contrato" v-model="descricao" :disabled="true"></textarea>
        </div>
        <div>
            <label for="ServicoCost">Custo:</label><br>
            <input type="text" id="InputServicoCost" name="ServicoCost" v-model="custo"><br>
            <input type="text" id="InputServicoCost" name="ServicoCost" v-model="setor.nome"><br>
          </div>

          <div>
            <label for="ServicoRisk">Risco:</label><br>
            <input list="ListRisk" type="text" id="InputServicoRisk" name="ServicoRisk" v-model="risco"><br>

            <datalist name="ListRisk" id="ListRisk">
              <option value="Baixo"></option>
              <option value="Médio"></option>
              <option value="Alto"></option>
            </datalist>
          </div>

          <div>
            <label for="ServicoDuration">Duração:</label><br>
            <input type="text" id="InputServicoDuration" name="ServicoDuration" v-model="duracao_dias"><br>
          </div>

          <div>
          
          <label>Setor: </label>
            <select class="setor" id="setor" v-model="setor" @change="getSetor()">
              <option v-for="s in setores" :key="s.id" v-bind:value="s.id"
              >{{ s.nome}}</option>
            </select>
          </div>
        
        <button @click="atualizar" class="botaoEditar" >Salvas alterações</button>
        <p v-if="erro">{{erro}}</p>

    </div>

</template>
<style>
select {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.776);
  border: 1px solid rgba(0, 0, 0, 0.233);  
  margin-bottom: 1em;
}
input {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.776);
  border: 1px solid rgba(0, 0, 0, 0.233);  
  margin-bottom: 1em;
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

  const route = useRoute();
  const id = parseInt(route.params.id)

  //Variaveis das funções
  var nome = ref('');
  var descricao = ref('');
  var custo = ref('');
  var risco = ref('');
  var duracao_dias = ref('');
  var set = ref()
  const setores = ref();
  var erro = ref()
  var inputs,index
  
  interface Setor {
    id: number,
    nome: string
}

var setor:Setor = {
        id: 0,
        nome: ""
}

// var servico:Servico
var servico = ref('')

  inputs = document.getElementsByTagName('input')

  async function ativarInputs() {
      for (index = 0; index < inputs.length; ++index) {
          inputs[index].disabled = false
          
      }
      document.getElementById('detalhes_pagamento').disabled = false
      document.getElementById('clausulas_contrato').disabled = false

  }
  async function deletar() {
      await axios.delete(`servico/${id}`)
      window.location.href='/Servico'
  }

  async function getSetor() {
    set.value =  (await axios.get(`setor/${setor}`)).data
  }

  async function getSetores() {
    setores.value = (await axios.get(`setor`)).data
    console.log(setores.value);
}

  async function getServico() {
    try {
      servico.value =  (await axios.get(`servico/${id}`)).data
      nome.value = servico.value.nome;
      descricao.value = servico.value.descricao;
      custo.value = servico.value.custo;
      risco.value = servico.value.risco;
      duracao_dias.value = servico.value.duracao_dias;      
      setor = {
        id:servico.value.setor.id,
        nome: servico.value.setor.nome
      }
      console.log('Aqui')
      console.log(setor.nome)
    }
  
    catch(ex){
      console.log(ex)
      //erro.value = (ex as Error).message;
    }
        
}

    async function atualizar() {

    try {
    await axios.put(`servico/${id}`, {
      "id":  id,
      "nome": nome.value,
      "descricao": descricao.value,
      "risco": risco.value,
      "custo": custo.value,
      "duracao_dias": duracao_dias.value,
      "setor": set.value 
    }

    )
    window.location.href='/Servico'
    }
    catch(ex){
    erro.value = (ex as Error).message;
    }
  }
  onMounted(() => {
      getServico();  
      getSetores();
  })
</script>