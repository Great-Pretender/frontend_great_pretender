<template>
  <div id="tabBox">
    <div id="clienteOrdem">
      <h3>Selecione Ordens por Cliente:</h3>
      <br />
      <label for=""
        >CLIENTE:
        <select v-model="cliente">
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente">
            {{ cliente.nome_fantasia }}
          </option>
        </select>
      </label>
    </div>

    <div id="tabelaOrdens">
      <h1>Ordens Aprovadas</h1>
      <table>
        <thead>
          <th>ID</th>
          <th>SETOR</th>
          <th>CLIENTE</th>
          <th>DESCRICAO</th>
          <th>DATA INICIO</th>
          <th>DATA FIM</th>
        </thead>

        <tbody>
          <tr v-for="ordem in ordens" :key="ordem.id">
            <td>
              <RouterLink
                :to="{ name: 'AtribuicaoOrdemDeServico', params: { id: ordem.id } }"
                class="link"
                >{{ ordem.id }}</RouterLink
              >
            </td>
            <td>{{ ordem.setor.nome }}</td>
            <td>{{ ordem.cliente.nome_fantasia }}</td>
            <td>
              {{ ordem.descricao }}
            </td>
            <td>{{ ordem.data_inicio }}</td>
            <td>{{ ordem.data_fim }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="gerarLaudo" :disabled="true" v-if="ordens.length <= 0">
      <button class="botao" id="selectCliente" @click="buscarOrdensPorCliente()">Selecionar</button>
    </div>
    <div id="gerarLaudo" :disabled="true" v-if="ordens.length > 0">
      <button class="botao" @click="gerarLaudo()">GERAR LAUDO</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import { ref } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import html2pdf from 'html2pdf.js'

const ordens = ref([])
const cliente = ref()
const clientes = ref([])
const descricao = ref('')
const cli = ref()

function exportToPDF() {
  html2pdf(document.getElementById('tabelaOrdens'))
}

function gerarLaudo() {
  exportToPDF()
  let clienteNome = cliente.value.nome_fantasia
  let ordensDoCliente = []
  ordens.value.forEach((element) => {
    ordensDoCliente.push(element)
  })
  alert('Cliente = ' + clienteNome + ' Ordens do Cliente: ' + ordensDoCliente)
}

async function getCliente() {
  console.log(cliente.value)
  try {
    cli.value = (
      await axios.get(`cliente/${cliente.value}`, {
        headers: {
          Authorization: TokenStorage
        }
      })
    ).data
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

//Variaveis do localstorage
var TokenStorage = localStorage.getItem('Token')

async function buscarOrdensPorCliente() {
  try {
    const response = await axios.post(
      'ordemdeservico/idCliente',
      {
        id: cliente.value.id
      },
      {
        headers: {
          Authorization: TokenStorage
        }
      }
    )
    ordens.value = response.data
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

async function buscarClientes() {
  try {
    clientes.value = (
      await axios.get('cliente', {
        headers: {
          Authorization: TokenStorage
        }
      })
    ).data
  } catch (error) {
    console.error('Error fetching setores:' + error)
  }
}

function hideDescOrdem(ID) {
  document.getElementById('desc' + ID).hidden = true
}

function hideSelectOrdem(ID) {
  document.getElementById('sto' + ID).hidden = true
}

function hideSelectAprovacao(ID) {
  document.getElementById('sta' + ID).hidden = true
}

onMounted(() => {
  buscarClientes()
})
</script>

<style>
.texta {
  margin-top: 10px;
}
.botao {
  font-size: 15px;
  background-color: rgb(255, 187, 0);
  padding: 5px;
}
.botao:hover {
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0);
  padding: 5px;
  color: rgba(0, 0, 0, 0.568);
}
.select {
  margin-top: 10px;
  width: auto;
}
.botaoLaudo {
  align-items: right;
  width: 20%;
  font-size: 15px;
  background-color: rgb(255, 187, 0);
  padding: 5px;
}
.botaoLaudo:hover {
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0);
  padding: 5px;
  color: rgba(0, 0, 0, 0.568);
}
.botaoAprovacao {
  font-size: 14px;
  padding: 5px;
  background-color: white;
  color: rgba(0, 0, 0, 0.705);
  border: 1px solid rgb(255, 187, 0);
}
.botaoAprovacao:hover {
  font-size: 14px;
  padding: 5px;
  background-color: white;
  color: rgba(0, 0, 0, 0.705);
  border: 1px solid rgba(0, 0, 0, 0.705);
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
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  padding-left: 1%;
  padding-right: 1%;
  margin: 0.3%;
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
  transition-duration: 0.4s;
  color: rgb(255, 187, 0);
  box-shadow: 1px 1px 2px rgb(255, 187, 0);
  padding-top: 0.6%;
  padding-bottom: 0.6%;
  padding-left: 1.2%;
  padding-right: 1.2%;
  border-style: solid;
  border-color: rgb(255, 187, 0);
  text-shadow: 1px black;
}
</style>
