<template>
    <div class="form">
      <div class="setor">
        <h2 >Usuário </h2>
    </div>
        <button type="submit" @click="ativarInputs" class="editar">Habilitar Edição</button>
        <button type="submit" @click="deletar" class="deletar">Deletar</button>
        <!-- <p v-if="erro">{{erro}}</p> -->
    <div class="numero_contrato">
        <label>NOME:</label>
        <input type="text" id="nome" v-model="nome" :disabled="true">
    </div>
    <div class="numero_contrato">
        <label>CPF:</label>
        <input type="text" id="cpf" v-model="cpf" :disabled="true">
    </div>
    <div class="numero_contrato">
        <label>EMAIL:</label>
        <input type="text" id="email" v-model="email" :disabled="true">
    </div>
    <div class="numero_contrato">
        <label>SENHA:</label>
        <input type="text" id="senha" v-model="senha" :disabled="true">
    </div>
    <div class="setor">

        <label>Setor({{ setor.nome }}): </label>
            <select class="setor" id="setor" v-model="setor" @change="getSetor()" :required="true" :disabled="true">
              
              <option v-for="s in setores" :key="s.id" v-bind:value="s.id">{{ s.nome}}</option>
            </select>
        </div>

        <div class="cargo">
          <label>Cargo </label>
          <select class="cargo" v-model="cargo" @change="getCargo()">
              <option value="ROLE_TECNICO"> Técnico</option>
              <option value="ROLE_ADMIN"> Administrador</option>
              <option value="ROLE_SUPERVISOR"> Supervisor</option>
            </select>
        </div>
    <button @click="atualizar" class="botaoEditar" >Salvas alterações</button>

    </div>
</template>
<style>
.setor {
  margin-top: .5%;
  margin-bottom: .5%;
}

.setor label {
  padding-top: 20px;
  font-size: 17px;
}

.setor select {
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
</style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue';
import { onMounted } from 'vue'
import axios from 'axios'   
import { ref } from 'vue'
import { useRoute } from 'vue-router';


const usuario = ref()
const setores = ref([])
const route = useRoute();
const id = parseInt(route.params.id)
var cpf = ref('')
var nome = ref('')
var email = ref('')
var senha = ref('')
interface Setor {
    id: number,
    nome: string
}
var setor:Setor = {
        id: 0,
        nome: ""
}
var set = ref()
var cargo = ref('')
var erro = ref('')

async function getSetor() {
    set.value =  (await axios.get(`setor/${setor}`)).data
}

async function getSetores() {
    setores.value =  (await axios.get(`setor`)).data
}

async function getUsuario() {
  try {
    usuario.value =  (await axios.get(`usuario/${id}`)).data
    cpf.value = usuario.value.cpf
    nome.value = usuario.value.nome
    email.value = usuario.value.email
    senha.value = usuario.value.senha
    setor = {
      id: usuario.value.setor.id,
      nome: usuario.value.setor.nome
    }
    cargo.value = usuario.value.cargo
    // console.log(usuario.value)
    // console.log(setor.nome)
  }
  
  catch(ex){
    erro.value = (ex as Error).message;
  }
        
}



var inputs,index

inputs = document.getElementsByTagName('input')

async function ativarInputs() {
    for (index = 0; index < inputs.length; ++index) {
        inputs[index].disabled = false
    }
    document.getElementById('setor').disabled = false

}
async function deletar() {
    await axios.delete(`usuario/${id}`)
    window.location.href='/usuario'
}

async function atualizar() {
    try {
    await axios.put(`usuario/${id}`, {
        "id":  usuario.value.id,
        "cpf" : cpf.value,
        "nome" : nome.value,
        "email" :email.value,
        "senha" : senha.value,
        "setor": set.value,
        "cargo": cargo.value
        }

    )
    window.location.href='/usuario'
  }
  catch(ex){
    erro.value = (ex as Error).message;
  }
}

onMounted(() => {
    getUsuario();
    // ativarInputs();
    // atualizar();
    getSetores();

})
</script>