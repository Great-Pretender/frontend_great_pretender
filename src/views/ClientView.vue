<template>
  <div id="tabBox">
    <div class="tabWrap">
      <input id="tab-01" name="tab" type="radio" checked />
      <label class="tab label-01" for="tab-01"><span>Lista</span></label>
      <!-- tabContent 01 -->
      <article class="tabContent">
        <h1>Lista de Clientes</h1>
        <table>

          <thead>
            <th> NOME FANTANSIA </th>
            <th> CNPJ </th>
            <th> RESPONSÁVEL </th>
            <th> TELEFONE </th>
            <th> TELEFONE SECUNDARIO</th>
            <th> E-MAIL </th>
            <th> ENDEREÇO </th>
            <th> BAIRRO </th>
            <th> CIDADE </th>
            <th> UF </th>
          </thead>

          <tbody>
            <tr v-for="cliente in clientes" :key="cliente.id">
              <td v-if="UserStorage == 'ROLE_ADMIN' ">
                <RouterLink :to="{ name: 'DetalhesCliente', params: { id: cliente.id } }" class="link">{{
                  cliente.nome_fantasia }}</RouterLink>
              </td>
              <td>{{ cliente.cnpj }}</td>
              <td>{{ cliente.nome_responsavel }}</td>
              <td>{{ cliente.telefone1 }}</td>
              <td>{{ cliente.telefone2 }}</td>
              <td>{{ cliente.email }}</td>
              <td>{{ cliente.endereco }}</td>
              <td>{{ cliente.bairro }}</td>
              <td>{{ cliente.cidade }}</td>
              <td>{{ cliente.estado }}</td>
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
        <div class="itensLaudo">
          <h3>Preencha as informações:</h3>
          <form>
            <div>
              <label for="ClientName">Nome:</label><br>
              <input type="text" id="ClientName" name="ClientName" class="nome" v-model="ClientName"><br>
            </div>

            <div>
              <label for="ClientCNPJ">CNPJ</label><br>
              <input type="text" id="ClientCNPJ" name="ClientCNPJ" class="cnpj" v-model="ClientCNPJ" v-cnpj maxlength="14" size="14"><br>
            </div>


            <div>
              <label for="ClientContact">Responsavel:</label><br>
              <input type="text" id="ClientContact" name="ClientContact" class="nome" v-model="ClientContact"><br>
            </div>

            <div>
              <label for="ClientTel">Telefone</label><br>
              <input type="text" id="ClientTel" name="ClientTelSecond" class="nome" v-model="ClientTel" maxlength="15" size="15"><br>
            </div>

            <div>
              <label for="ClientTelSecond">Telefone Secundário</label><br>
              <input type="text" id="ClientTelSecond" name="ClientTel" class="nome" v-model="ClientTelSecond" maxlength="15" size="15"><br>
            </div>

            <div>
              <label for="ClientEmail">E-mail</label><br>
              <input type="text" id="ClientEmail" name="ClientEmail" class="nome" v-model="ClientEmail"><br>
            </div>

            <div>
              <label for="ClientCEP">CEP</label><br>
              <input type="text" id="ClientCEP" name="ClientCEP" class="nome" v-model="ClientCEP"><br>
            </div>

            <div>
              <label for="ClientEndereco">Endereço</label><br>
              <input type="text" id="ClientEndereco" name="ClientEndereco" class="nome" v-model="ClientEndereco"><br>
            </div>

            <div>
              <label for="ClientBairro">Bairro</label><br>
              <input type="text" id="ClientBairro" name="ClientBairro" class="nome" v-model="ClientBairro"><br>
            </div>

            <div>
              <label for="ClientCity">Cidade</label><br>
              <input type="text" id="ClientCity" name="ClientCity" class="nome" v-model="ClientCity"><br>
            </div>

            <div>
              <label for="ClientUF">UF</label><br>
              <input type="text" id="ClientUF" name="ClientUF" class="nome" v-model="ClientUF"><br>
            </div>

          </form>
        </div>

        <button v-if="UserStorage == 'ROLE_ADMIN'" id="addClient" @click="cadastrarCliente">Cadastrar</button>
      </article>
    </div>

  </div>
</template>
  
<script setup lang="ts">

//Importações
import { onMounted, ref, watch } from 'vue';
import axios from 'axios'

var erro = ref()
//Variaveis das funções
const ClientName = ref('');
const ClientCNPJ = ref('');
const ClientEmail = ref('');
const ClientContact = ref('')
const ClientTel = ref('');
const ClientTelSecond = ref('');
const ClientCEP = ref('');
const ClientEndereco = ref('');
const ClientBairro = ref('');
const ClientCity = ref('');
const ClientUF = ref('');

//variaveis para consulta

const clientes = ref('');

//Variaveis do localstorage
var TokenStorage = localStorage.getItem("Token");
var IdStorage = localStorage.getItem("id")
var UserStorage = localStorage.getItem("cargo")

//buscando todos os clientes do banco
const cliente = ref()
const cli = ref()
async function getCliente() {
  cli.value = (await axios.get(`cliente/${cliente.value}`, {
      headers:{
        'Authorization': TokenStorage
      }
    })).data
}

const formatCNPJ = (el) => {
  el.addEventListener('input', (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');

    if (value.length <= 2) {
      e.target.value = value;
    } else if (value.length <= 5) {
      e.target.value = `${value.slice(0, 2)}.${value.slice(2)}`;
    } else if (value.length <= 8) {
      e.target.value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5)}`;
    } else if (value.length <= 12) {
      e.target.value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8)}`;
    } else if (value.length <= 14) {
      e.target.value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(12)}`;
    }
  });
};
const formatTELEFONE = (el) => {
  el.addEventListener('input', (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');

    if (value.length <= 2) {
      e.target.value = value;
    } else if (value.length <= 7) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length <= 11) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }
  });
};




//depois de realizar alguma ação ele volta pra pagina inicial clientes e atualiza com as informações da tabela
async function atualizar() {
  try {
    clientes.value = (await axios.get('cliente', {
      headers:{
        'Authorization': TokenStorage
      }
    })).data
  }
  catch (ex) {
    erro.value = (ex as Error).message
  }
}

//Pegar os campos do front e salvar no banco de dados
async function cadastrarCliente() {
  try {
    await axios.post('cliente', {
      "cnpj": ClientCNPJ.value.replaceAll(".","").replace("/","").replace("-",""),
      "nome_responsavel": ClientContact.value,
      "nome_fantasia": ClientName.value,
      "telefone1": ClientTel.value.replace(/[^0-9]/g, ''),
      "telefone2": ClientTelSecond.value.replace(/[^0-9]/g, ''),
      "email": ClientEmail.value,
      "cep": ClientCEP.value,
      "endereco": ClientEndereco.value,
      "bairro": ClientBairro.value,
      "cidade": ClientCity.value,
      "estado": ClientUF.value,

    }, {
      headers:{
        'Authorization': TokenStorage
      }
    })
    atualizar();
    window.location.href = '/client'
  } catch (ex) {
    erro.value = (ex as Error).message;
  }
}

//para deixar carregado as funções antes da página carregar
onMounted(() => {
  const cnpjInput = document.getElementById('ClientCNPJ');
  formatCNPJ(cnpjInput);
  const telefoneInput = document.getElementById('ClientTel');
  formatTELEFONE(telefoneInput);
  const telefoneSecInput = document.getElementById('ClientTelSecond');
  formatTELEFONE(telefoneSecInput);

  atualizar();
})

</script>
  
<style>
.nome {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
}

.cnpj {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
}

.cidade {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
}

.estado {
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

.telefone1 {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
}

.telefone2 {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
}

.nome_responsavel {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
}

.email {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
}

.cep {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
}

.endereco {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.575);
  border: 1px solid rgba(0, 0, 0, 0.233);
}

.laudo {
  background-color: blueviolet !important;
}

.itensLaudo {
  margin-top: 5%;
}

@media (min-width: 80%) {
  .about {
    min-height: 80%;
    display: flex;
    align-items: center;
  }
}

template {
  font-family: 'Quark';
  font-weight: 700;
  font-style: normal;
}

input {
  background-color: rgba(241, 241, 241, 0.13);
  padding-right: auto;
  padding-top: 2px;
  padding-bottom: 2px;
  border-color: aliceblue;
  margin-left: 1%;
  margin-right: 1%;
  border-radius: 20px;

}

button {

  padding-top: .5%;
  padding-bottom: .5%;
  padding-left: 1%;
  padding-right: 1%;
  margin: .3%;
  background-color: rgb(255, 187, 0);
  border: 1px;
  border-color: black;
  border-radius: 5px;
  color: white;
  font-family: 'Quark';
  font-weight: 700;
  font-style: normal;
}

button:hover {
  background-color: white;
  transition-duration: .4s;
  color: rgb(255, 187, 0);
  box-shadow: 1px 1px 2px rgb(255, 187, 0);
  padding-top: .6%;
  padding-bottom: .6%;
  padding-left: 1.2%;
  padding-right: 1.2%;
  border-style: solid;
  border-color: rgb(255, 187, 0);
  text-shadow: 1px black;
}</style>
  