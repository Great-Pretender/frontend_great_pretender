<template id="template">
    <div class="form-popup" id="myForm" >
      <div class="form-container">
        <h3 class="title">Criar OS</h3>
        <hr>
    
          <div class="divs">
                <label>Setor: </label>
                <select class="cliente" id="setor" v-model="setor" @change="getSetor()">
                  <option v-for="setor in setores" :key="setor.id" :value="setor.id">
                    {{ setor.nome }}
                  </option>
                </select>
                <label for="" class="divs u">Usuário: </label>
              <select class="cliente" id="usuario_id" v-model="usuario" @change="getUsuario()">
              <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
                {{ usuario.nome }}
              </option>
            </select>
            </div>
            <div class="divs">
              <label for="">Cliente: </label>
              <select class="cliente" id="cliente_id" v-model="cliente" @change="getCliente()">
              <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                {{ cliente.nome_fantasia }}
              </option>
              </select>
            </div>

            <div class="divs">
              <label for="">Descrição: </label>
              <textarea
              placeholder="Digite sua mensagem"
              id="descricao"
              v-model="descricao" class="descricao"
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
              <button type="submit" class="btn cadastrar" @click="cadastrarOrdem()">Cadastrar</button>
              <button type="button" class="btn cancel" @click="closeForm()">Cancelar</button>
        </div>
    </div>
        <!-- Tab links -->
        <div class="screen" id="screen">
          <hr>
          <div class="header">
            <h3 class="title">ORDEM DE SERVIÇO</h3>
            <input type="text" placeholder="Buscar um Cliente" class="busca">
            <button class="btn-buscar"><i class="fas fa-search"></i></button>
            <!-- <button class="novo"></button> -->
            <button class="novo" @click="openForm()">Criar OS</button>
          </div>
          
    
    
            <table class="tabela" id="tabela">
                <thead class="cabecalho">
                    <th class="id">ID</th>
                    <th >SETOR</th>
                    <th class="extenso">USUARIO</th>
                    <th>CLIENTE</th>
                    <th>DATA DE INÍCIO</th>
                    <th>DATA DE FINALIZAÇÃO</th>
                    <th>STATUS</th>
                    <th>APROVAÇÃO</th>
                    <th>DESCRIÇÃO</th>
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
                        <td>{{ String(ordem.data_inicio).split("-").reverse().join("/")}}</td>
                        <td>{{ String(ordem.data_fim).split("-").reverse().join("/")}}</td>
                        
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
                            </div>
                        </td>
                        <td><span><button class="botao desc" id="mostraText" @click="showDescOrdem(ordem.id)"><i class="fas fa-pencil"></i></button></span> {{ ordem.descricao }} 
                  <div :id="'desc'+ordem.id" class="ordemDescID" :hidden="true">
                    <textarea class="texta"
                        placeholder="Digite sua mensagem"
                        id="editDescricao"
                        v-model="descricao"
                      ></textarea>
                      <button class="botao" id="editDesc" @click="attDescOrdem(ordem)">Salvar</button>
                  </div>
                </td>
                        <button class="botao" id="btnDeletar" @click="deletar(ordem)"><i class="fas fa-trash"></i></button>
                    </tr>
                </tbody>
            </table>
        </div>
    </template>
    <style>
    /* INPUTS */
.divs.u {
  margin-left: 150px !important;
}
.fas.fa-trash {
  font-size: 10px;
}

.descricao {
  display: flex;
  width: 65em;
  height: 8em;
  border-radius: 10px;
  margin-left: 5px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border: 1px solid rgba(0, 0, 0, 0);
  margin-bottom: 15px;
}
.botao.desc {
  height: 1.5em;
  width: 1.5em;
  padding: 0;
}
.fas.fa-pencil {
  font-size: 10px;
}
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
      padding: 10px;
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
      width: 90%;
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
      border: 1px solid rgba(256,187,0,0.8);
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

//Variaveis do localstorage
var TokenStorage = localStorage.getItem("Token");
var IdStorage = localStorage.getItem("id")
var UserStorage = localStorage.getItem("cargo")

async function buscarClientes() {
  try {
    clientes.value = (await axios.get('cliente', {
      headers:{
        'Authorization': TokenStorage
      }
    })).data    
  } catch (error) {
    console.error('Error fetching setores:' + error)
  }
}

async function buscarSetores() {
  try {
    setores.value = (await axios.get('setor', {
      headers:{
        'Authorization': TokenStorage
      }
    })).data    
  } catch (error) {
    console.error('Error fetching setores:' + error)
  }
}

async function buscarServicos() {
  try {
    servicos.value = (await axios.get('servico', {
      headers:{
        'Authorization': TokenStorage
      }
    })).data    
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

async function buscarOrdens() {
  
  if(UserStorage == "ROLE_ADMIN"){
    try {
    ordens.value = (await axios.get('ordemdeservico', {
      headers:{
        'Authorization': TokenStorage
      }
    })).data    
  } catch (error) {
    console.error('Erro! :' + error)
  }
  }else{
  try {
    usuario.value = (await axios.get(`usuario/${IdStorage}`, {
      headers:{
      'Authorization': TokenStorage
      }
      })).data

      ordens.value = (await axios.post('ordemdeservico/idSetor',{
      id: usuario.value.setor.id
      }, {
      headers:{
      'Authorization': TokenStorage
      }
      })).data

  } catch (error) {
    console.error('Erro! :' + error)
  }
}
}

const cli = ref()
const set = ref()
const usu = ref()

async function getCliente() {
  try {
    cli.value = (await axios.get(`cliente/${cliente.value}`, {
      headers:{
        'Authorization': TokenStorage
      }
    })).data    
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

async function getSetor() {
  try {
    set.value = (await axios.get(`setor/${setor.value}`, {
      headers:{
        'Authorization': TokenStorage
      }
    })).data    
    usuarios.value = []
    getUsuarioPorSetor(set.value)
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

async function getUsuario() {
  try {
    usu.value = (await axios.get(`usuario/${usuario.value}`, {
      headers:{
        'Authorization': TokenStorage
      }
    })).data    
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
    },{
      headers: {
        'Authorization': TokenStorage
      }
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
    },{
      headers: {
        'Authorization': TokenStorage
      }
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
  },{
      headers: {
        'Authorization': TokenStorage
      }
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
  },{
      headers: {
        'Authorization': TokenStorage
      }
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
  },{
      headers: {
        'Authorization': TokenStorage
      }
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
  await axios.delete(`ordemdeservico/${ordem.id}`, {
      headers:{
        'Authorization': TokenStorage
      }
    })
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
function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("screen").style.filter = "blur(8px)";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("screen").style.filter = "blur(0px)";

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
