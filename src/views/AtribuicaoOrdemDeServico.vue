<template>
  <div id="atribuicao">
    <div id="atribuicaoServico">
      <label>Usuario: </label>
      <select class="cliente" id="usuario_id" v-model="usuario" @change="getUsuario()">
        <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
          {{ usuario.nome }}
        </option>
      </select>

      <div class="cliente">
        <label>Comentario:</label>
        <br />
        <textarea  class="textar"
          placeholder="Digite seu comentário"
          id="comentario"
          v-model="comentario"
        ></textarea>
      </div>

      <label>Adicionar Servicos: </label>
      <select class="select" id="servico" v-model="servico" @change="getServico()">
        <option v-for="servico in servicos" :key="servico.id" :value="servico.id">
          {{ servico.nome }}
        </option>
      </select>
    </div>

    <button class="botao" @click="atribuirServico()">Atribuir</button>
  </div>
  <div id="tabelaAtribuicoes">
    <h1>Serviços Atribuidos</h1>
    <table>
      <thead>
        <th>ID ORDEM</th>
        <th>ID ATRIBUICAO</th>
        <th>SERVICO</th>
        <th>USUARIO</th>
        <th>COMENTARIO</th>
        <th>STATUS</th>
        
      </thead>
      <tbody>
        <tr v-for="atribuicao in atribuicoes" :key="atribuicao.id">
          <td>{{ atribuicao.ordem.id }}</td>
          <td>{{ atribuicao.id }}</td>
          <td>{{ atribuicao.servico.nome }}</td>
          <td>{{ atribuicao.usuario.nome }}</td>
          <td>{{ atribuicao.comentario }}</td>
          <td>
            <span>
              <button class="botaoAprovacao" id="mostraSelect" @click="showSelect(atribuicao.id)">{{ atribuicao.status_andamento }}</button>
            </span>
            <div :id="atribuicao.id" :hidden="true">
              <select class="select"
                v-model="statusAndamento"
              >
              <option id="" :value="atribuicao.status_andamento">{{ atribuicao.status_andamento }}</option>
                <option
                  v-for="option in statusOptions(atribuicao.status_andamento)"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
              <button class="botao" @click="attStatus(atribuicao)">Salvar</button>
            </div>
          </td>
          <button id="btnDeletar" class="botao" @click="deletar(atribuicao)"><i class="fas fa-trash"></i></button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = parseInt(route.params.id)
const comentario = ref('')
const ordem = ref()
const setorr = ref()
const cliente = ref()
const usuario = ref()
const servico = ref()
const servicos = ref([])
const usuarios = ref([])
const atribuicoes = ref([])
const descricao = ref('')
const dataInicio = ref()
const dataFim = ref()
const statusOrdem = ref()
const statusAprovacao = ref()
let statusAndamento = ref()

const usu = ref()
const serv = ref()

async function getValoresOrdem() {
  try {
    ordem.value = (await axios.get(`ordemdeservico/${id}`, {
      headers:{
        'Authorization': TokenStorage
      }
    })).data
    setorr.value = ordem.value.setor
    usuario.value = ordem.value.usuario
    cliente.value = ordem.value.cliente
    dataInicio.value = ordem.value.dataInicio
    dataFim.value = ordem.value.dataFim
    descricao.value = ordem.value.descricao
    statusOrdem.value = ordem.value.status_ordem
    statusAprovacao.value = ordem.value.status_aprovacao

    getAtribuicoesPorOrdem()
    getServicoPorSetor()
    getUsuarioPorSetor()
  } catch (ex) {
    console.log(ex)
  }
}

async function getAtribuicoesPorOrdem() {
  try {
    const response = await axios.post('atribuicao/idOrdem', {
      
      id: ordem.value.id
    })
    atribuicoes.value = response.data
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

async function getServicoPorSetor() {
  try {
    const response = await axios.post('servico/idSetor', {
      id: ordem.value.setor.id
    })

    servicos.value = response.data
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

async function getUsuarioPorSetor() {
  try {
    const response = await axios.post('usuario/idSetor', {
      id: ordem.value.setor.id
    })

    usuarios.value = response.data
  } catch (error) {
    console.error('Erro! :' + error)
  }
}

async function getServico() {
  try {
    serv.value = (await axios.get(`servico/${servico.value}`)).data
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

async function atribuirServico() {
  try {
    const response = await axios.post('atribuicao', {
      usuario: usu.value,
      servico: serv.value,
      comentario: comentario.value,
      ordem: ordem.value,
      status_andamento: 'Pendente'
    })
    let obj = {}
    obj.value = response.data
    getAtribuicoesPorOrdem()
    alert('Servico Atribuido com sucesso!' + obj)
  } catch (error) {
    alert('Erro ao atribuir o servico!:')
    console.error('Erro ao atribuir o servico!:', error)
  }
}

function statusOptions(currentStatus) {
  const options = ['Pendente', 'Em andamento', 'Concluido']
  const index = options.indexOf(currentStatus)
  if (index !== -1) {
    options.splice(index, 1)
  }
  return options
}

async function attStatus(atribuicao) {

  try {
    const response = await axios.put(`atribuicao/${atribuicao.id}`, {
      id: atribuicao.id,
      usuario: atribuicao.usuario,
      servico: atribuicao.servico,
      comentario: atribuicao.comentario,
      ordem: ordem.value,
      status_andamento: statusAndamento.value
    })
    let obj = {}
    obj.value = response.data
    getAtribuicoesPorOrdem();
    hideSelect(atribuicao.id);
    alert('Servico Atribuido com sucesso!' + obj)
  } catch (error) {
    alert('Erro ao atribuir o servico!:')
    console.error('Erro ao atribuir o servico!:', error)
  }
}

async function deletar(atribuicao) {
  if (confirm('Deseja realmente deletar essa atribuição?')) {
  // Save it!
  await axios.delete(`atribuicao/${atribuicao.id}`)
  getAtribuicoesPorOrdem();
    
} else {
  console.log("nada")
}
}

function showSelect(ID) {
  document.getElementById(ID).hidden=false;
}

function hideSelect(ID) {
  document.getElementById(ID).hidden=true;
}


onMounted(() => {//
  getValoresOrdem();
})
</script>

<style>
.botao {margin-left: 5px;}
.textar {
  width: 50%;
  height: 10em;
  border: 1px solid rgba(0, 0, 0, 0.144);
  border-radius: 10px;
  padding: 10px;
}
</style>
