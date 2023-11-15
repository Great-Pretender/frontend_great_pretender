<template>
    <div class="form">
      <div class="servico">
        <h2 >Cliente </h2>
        </div>
        <button type="submit" @click="ativarInputs" class="editar">Habilitar Edição</button>
        <button type="submit" @click="deletar" class="deletar">Deletar</button>
            <div>
              <label for="ClientName">Nome:</label><br>
              <input type="text" id="ClientName" name="nome" class="nome" v-model="nome_fantasia" :disabled="true"><br>
            </div>

            <div>
              <label for="ClientCNPJ">CNPJ</label><br>
              <input type="text" id="ClientCNPJ" name="ClientCNPJ" class="cnpj" v-model="cnpj" :disabled="true"><br>
            </div>

            <div>
              <label for="ClientContact">Responsavel:</label><br>
              <input type="text" id="ClientContact" name="ClientContact" class="nome_responsavel" v-model="nome_responsavel" :disabled="true"><br>
            </div>

            <div>
              <label for="ClientTel">Telefone</label><br>
              <input type="text" id="ClientTel" name="ClientTelSecond"  class="telefone1" v-model="telefone1" :disabled="true"><br>
            </div>

            <div>
              <label for="ClientTelSecond">Telefone Secundário</label><br>
              <input type="text" id="ClientTelSecond" name="ClientTel" class="telefone2" v-model="telefone2" :disabled="true"><br>
            </div>

            <div>
              <label for="ClientEmail">E-mail</label><br>
              <input type="text" id="ClientEmail" name="ClientEmail" class="email" v-model="email" :disabled="true"><br>
            </div>

            <div>
              <label for="ClientCEP">CEP</label><br>
              <input type="text" id="ClientCEP" name="ClientCEP" class="cep" v-model="cep" :disabled="true"><br>
            </div>

            <div>
              <label for="ClientEndereco">Endereço</label><br>
              <input type="text" id="ClientEndereco" name="ClientEndereco" class="endereco" v-model="endereco" :disabled="true"><br>
            </div>

            <div>
              <label for="ClientBairro">Bairro</label><br>
              <input type="text" id="ClientBairro" name="ClientBairro" class="bairro" v-model="bairro" :disabled="true"><br>
            </div>

            <div>
              <label for="ClientCity">Cidade</label><br>
              <input type="text" id="ClientCity" name="ClientCity" class="cidade" v-model="cidade" :disabled="true"><br>
            </div>

            <div>
              <label for="ClientUF">UF</label><br>
              <input type="text" id="ClientUF" name="ClientUF" class="estado" v-model="estado" :disabled="true"><br>
            </div>
                  
        <button @click="atualizarCliente" class="botaoEditar" >Salvas alterações</button>
        <p v-if="erro">{{erro}}</p>

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
.nome{
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233); 
}

.cnpj{
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233); 
}

.cidade{
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233); 
}
.estado{
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233); 
}
.bairro {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233); 
}

.telefone1{
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233); 
}
.telefone2{
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233); 
}

.nome_responsavel{
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233); 
}

.email{
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233); 
}
.cep{
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233); 
}
.endereco{
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233); 
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
.input_nome label {
  font-size: 17px;
  color: black;
}
.nome input {
    width: 10em;
    text-align: right;
    height: 30px;
    border-radius: 5px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.575);
    border: 1px solid rgba(0, 0, 0, 0.233);
}
.input_nome {
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
    //axios.defaults.baseURL = 'https://8080-greatpreten-backendgrea-t1i4c91qf2n.ws-us105.gitpod.io/'

    const route = useRoute();
    const id = parseInt(route.params.id)

    //Variaveis das funções
    var cnpj = ref('');
    var nome_responsavel = ref('');
    var nome_fantasia = ref('');
    var telefone1 = ref('');
    var telefone2 = ref('');
    var email = ref('');
    var cep = ref('');
    var endereco = ref('');
    var bairro = ref('');
    var cidade = ref('');
    var estado = ref('');
    var erro = ref('')
    const cli = ref()

    var TokenStorage = localStorage.getItem("Token");

async function getCliente() {
    cli.value =  (await axios.get(`cliente/${id}`,{
      headers: {
        'Authorization': TokenStorage
      }
      })).data
    cnpj.value = cli.value.cnpj
    nome_responsavel.value = cli.value.nome_responsavel
    nome_fantasia.value  = cli.value.nome_fantasia
    telefone1.value = cli.value.telefone1
    telefone2.value = cli.value.telefone2
    email.value = cli.value.email
    cep.value = cli.value.cep
    endereco.value = cli.value.endereco
    bairro.value = cli.value.bairro
    cidade.value = cli.value.cidade
    estado.value = cli.value.estado
}
var inputs,index

async function atualizarCliente() {
  try {
    await axios.put(`cliente/${id}`, {
      "id": id,
      "cnpj": cnpj.value,
      "nome_responsavel": nome_responsavel.value,
      "nome_fantasia": nome_fantasia.value,
      "telefone1": telefone1.value,
      "telefone2": telefone2.value,
      "email": email.value,
      "cep": cep.value,
      "endereco": endereco.value,
      "bairro": bairro.value,
      "cidade": cidade.value,
      "estado": estado.value
    },{
      headers: {
        'Authorization': TokenStorage
      }
      })
    window.location.href='/client'
    }
    catch(ex){
      erro.value = (ex as Error).message;
    }
}

inputs = document.getElementsByTagName('input')

async function ativarInputs() {
    for (index = 0; index < inputs.length; ++index) {
        inputs[index].disabled = false
        
    }
    document.getElementById('detalhes_pagamento').disabled = false
    document.getElementById('clausulas_contrato').disabled = false

}
async function deletar() {
    await axios.delete(`cliente/${id}`,{
      headers: {
        'Authorization': TokenStorage
      }
      })
    window.location.href='/Client'
}

onMounted(() => {
  getCliente();
  // ativarInputs();
  })
</script>