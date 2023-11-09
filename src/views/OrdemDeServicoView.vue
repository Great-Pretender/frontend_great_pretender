<template>
  <div id="tabBox">
    <div class="tabWrap">
      <input id="tab-01" name="tab" type="radio" checked />
      <label class="tab label-01" for="tab-01"><span>Ordens</span></label>

      <article class="tabContent">
        <div id="tabelaOrdens">
          <h1>Ordens Cadastradas</h1>
          <table>
            <thead>
              <th>ID</th>
              <th>SETOR</th>
              <th>USUARIO</th>
              <th>CLIENTE</th>
              <th>DESCRICAO</th>
              <th>DATA INICIO</th>
              <th>DATA FIM</th>
              <th>STATUS ORDEM</th>
              <th>STATUS APROVACAO</th>
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
                <td>{{ ordem.usuario.nome }}</td>
                <td>{{ ordem.cliente.nome_fantasia }}</td>
                <td>{{ ordem.descricao }} <span><button class="botao" id="mostraText" @click="showDescOrdem(ordem.id)">Editar</button></span>
                  <div :id="'desc'+ordem.id" class="ordemDescID" :hidden="true">
                    <textarea class="texta"
                        placeholder="Digite sua mensagem"
                        id="editDescricao"
                        v-model="descricao"
                      ></textarea>
                      <button class="botao" id="editDesc" @click="attDescOrdem(ordem)">Salvar</button>
                  </div>
                </td>
                <td>{{ ordem.data_inicio }}</td>
                <td>{{ ordem.data_fim }}</td>
                <td>
                  <span>
                    <button id="mostraSelect" class="botaoAprovacao" @click="showSelectOrdem(ordem.id)">{{ ordem.status_ordem }}</button>
                  </span>
                  <div :id="'sto'+ordem.id" class="ordemStOID" :hidden="true">
                    <select class="select" v-model="statusOrdem">
                      <option id="" :value="ordem.status_ordem">
                        {{ ordem.status_ordem }}
                      </option>
                      <option
                        v-for="option in statusOptionsOrdem(ordem.status_ordem)"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </option>
                    </select>
                    <button class="botao" @click="attStatusOrdem(ordem)">Salvar</button>
                  </div>
                </td>
                <td><span>
                    <button class="botaoAprovacao" id="mostraSelect" @click="showSelectAprovacao(ordem.id)">{{ ordem.status_aprovacao }}</button>
                  </span>
                  <div :id="'sta'+ordem.id" class="ordemStAID" :hidden="true">
                    <select v-model="statusAprovacao" class="select">
                      <option :value="ordem.status_aprovacao">
                        {{ ordem.status_aprovacao }}
                      </option>
                      <option
                        v-for="option in statusOptionsAprovacao(ordem.status_aprovacao)"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </option>
                    </select>
                    <button class="botao" @click="attStatusAprovacao(ordem)">Salvar</button>
                  </div></td>
                  <button class="botao" id="btnDeletar" @click="deletar(ordem)"><i class="fas fa-trash"></i></button>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>
    <div class="tabWrap">
      <input id="tab-02" name="tab" type="radio" />
      <label class="tab label-02" for="tab-02"><span>Cadastro</span></label>
      <!-- tabContent 02 -->
      <article class="tabContent">
        <h3>Preencha as informações:</h3>
        <div id="ordemServico">
          <div class="cliente">
            <label>Setor: </label>
            <select class="cliente" id="setor" v-model="setor" @change="getSetor()">
              <option v-for="setor in setores" :key="setor.id" :value="setor.id">
                {{ setor.nome }}
              </option>
            </select>
          </div>

          <div class="cliente">
            <label>Cliente: </label>
            <select class="cliente" id="cliente_id" v-model="cliente" @change="getCliente()">
              <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                {{ cliente.nome_fantasia }}
              </option>
            </select>
          </div>

          <div class="cliente">
            <label>Usuario: </label>
            <select class="cliente" id="usuario_id" v-model="usuario" @change="getUsuario()">
              <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
                {{ usuario.nome }}
              </option>
            </select>
          </div>

          <div class="cliente">
            <label>Descrição:</label>
            <br />
            <textarea
              placeholder="Digite sua mensagem"
              id="descricao"
              v-model="descricao"
            ></textarea>
          </div>
          <div class="datas">
            <label for="ticketNum">Data de início:</label>
            <input type="date" class="data1" id="dataInicio" v-model="dataInicio" />
          </div>
          <div class="datas">
            <label class="">Data Fim:</label>
            <input type="date" class="data2" id="dataFim" v-model="dataFim" />
          </div>
          <div>
            <button @click="cadastrarOrdem()" class="cadastrarOrdem">Cadastrar</button>
          </div>
          <p v-if="erro">{{ erro }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup >
import { onMounted } from 'vue'
import axios from 'axios'
import { ref } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'

const ordens = ref([])
const setor = ref()
const cliente = ref()
const usuario = ref()
const servicos = ref([])
const setores = ref([])
const clientes = ref([])
const usuarios = ref([])
const descricao = ref('')
const dataInicio = ref()
const dataFim = ref()
var statusOrdem = ref('')
var statusAprovacao = ref('')

async function buscarClientes() {
  try {
    clientes.value = (await axios.get('cliente')).data
  } catch (error) {
    console.error('Error fetching setores:' + error)
  }
}

async function buscarSetores() {
  try {
    setores.value = (await axios.get('setor')).data
  } catch (error) {
    console.error('Error fetching setores:' + error)
  }
}

async function buscarServicos() {
  try {
    servicos.value = (await axios.get('servico')).data
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

async function buscarOrdens() {
  try {
    ordens.value = (await axios.get('ordemdeservico')).data
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

const cli = ref()
const set = ref()
const usu = ref()

async function getCliente() {
  try {
    cli.value = (await axios.get(`cliente/${cliente.value}`)).data
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

async function getSetor() {
  try {
    set.value = (await axios.get(`setor/${setor.value}`)).data
    usuarios.value = []
    getUsuarioPorSetor(set.value)
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

async function getUsuario() {
  try {
    usu.value = (await axios.get(`usuario/${usuario.value}`)).data
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

async function getUsuarioPorSetor(setorSelecionado) {
  let setorUsuario = setorSelecionado
  try {
    const response = await axios.post('usuario/idSetor', {
      id: setorUsuario.id,
      nome: setorUsuario.nome
    })

    usuarios.value = response.data
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

async function cadastrarOrdem() {
  try {
    const response = await axios.post('ordemdeservico', {
      cliente: cli.value,
      setor: set.value,
      usuario: usu.value,
      descricao: descricao.value,
      data_inicio: dataInicio.value,
      data_fim: dataFim.value,
      status_ordem: 'Pendente',
      status_aprovacao: 'Pendente'
    })

    servicos.value = []
    buscarOrdens()
    alert('Ordem cadastrada com sucesso!' + response.data)
    window.location.href='/ordemServico'
    /*   buscarOrdemId(response); */
  } catch (error) {
    alert('Erro ao cadastrar ordem!:' + error)
    //console.error('Erro ao salvar o Laudo!:', error)
  }
}

async function attStatusOrdem(ordem) {
try {
  const response = await axios.put(`ordemdeservico/${ordem.id}`, {
      id: ordem.id,
      cliente: ordem.cliente,
      setor: ordem.setor,
      usuario: ordem.usuario,
      descricao: ordem.descricao,
      data_inicio: ordem.data_inicio,
      data_fim: ordem.data_fim,
      status_ordem: statusOrdem.value,
      status_aprovacao: ordem.status_aprovacao
  })
  let obj = {}
  obj.value = response.data
  buscarOrdens();
  hideSelectOrdem(ordem.id);
  alert('Sucesso!' + obj)
  } catch (error) {
  alert('Erro!:')
  console.error('Erro!:', error)
  }
}

async function attStatusAprovacao(ordem) {
try {
  const response = await axios.put(`ordemdeservico/${ordem.id}`, {
    id: ordem.id,
    cliente: ordem.cliente,
      setor: ordem.setor,
      usuario: ordem.usuario,
      descricao: ordem.descricao,
      data_inicio: ordem.data_inicio,
      data_fim: ordem.data_fim,
      status_ordem:  ordem.status_ordem,
      status_aprovacao: statusAprovacao.value
  })
  let obj = {}
  obj.value = response.data
  buscarOrdens();
  hideSelectAprovacao(ordem.id);
  alert('Sucesso!' + obj)
  } catch (error) {
  alert('Erro!:')
  console.error('Erro!:', error)
  }
}

async function attDescOrdem(ordem) {
try {
  const response = await axios.put(`ordemdeservico/${ordem.id}`, {
    id: ordem.id,
    cliente: ordem.cliente,
      setor: ordem.setor,
      usuario: ordem.usuario,
      descricao: descricao.value,
      data_inicio: ordem.data_inicio,
      data_fim: ordem.data_fim,
      status_ordem:  ordem.status_ordem,
      status_aprovacao: ordem.status_aprovacao
  })
  let obj = {}
  obj.value = response.data
  buscarOrdens();
  hideDescOrdem(ordem.id);
  alert('Sucesso!' + obj)
  } catch (error) {
  alert('Erro!:')
  console.error('Erro!:', error)
  }
}

async function deletar(ordem) {
  if (confirm('Deseja realmente deletar essa ordem?')) {
  // Save it!
  await axios.delete(`ordemdeservico/${ordem.id}`)
  buscarOrdens();
    
} else {
  console.log("nada")
}
    
}

function statusOptionsAprovacao(currentStatus) {
  const options = ['Pendente', 'Aprovado', 'Desaprovado']
  const index = options.indexOf(currentStatus)
  if (index !== -1) {
    options.splice(index, 1)
  }
  return options
}

function statusOptionsOrdem(currentStatus) {
  const options = ['Pendente', 'Em andamento', 'Concluido']
  const index = options.indexOf(currentStatus)
  if (index !== -1) {
    options.splice(index, 1)
  }
  return options
}

function showSelectOrdem(ID) {
  document.getElementById("sto"+ID).hidden=false;
}

function showDescOrdem(ID){
  document.getElementById("desc"+ID).hidden=false;
}

function hideDescOrdem(ID){
  document.getElementById("desc"+ID).hidden=true;
}

function showSelectAprovacao(ID) {
  document.getElementById("sta"+ID).hidden=false;
}

function hideSelectOrdem(ID) {
  document.getElementById("sto"+ID).hidden=true;
}

function hideSelectAprovacao(ID) {
  document.getElementById("sta"+ID).hidden=true;
}

onMounted(() => {
  buscarOrdens()
  buscarSetores()
  buscarClientes()
  buscarServicos()
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
  color:  rgba(0, 0, 0, 0.568); 

}
.select {
  margin-top: 10px;
  width: auto;
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
  border: 1px solid  rgba(0, 0, 0, 0.705);
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