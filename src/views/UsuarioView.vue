<template id="template">
  
  <div class="form-popup" id="myForm" >
    <div class="form-container">
      <h3 class="title">Novo usuário</h3>
      <hr>
  
        <div class="divs">
              <label>Nome Completo: </label>
            <input type="text" id="nome_user" v-model="nome" />
            </div>
            <div class="divs">
              <label>CPF: </label>
            <input type="text" id="cpf" v-model="cpf" maxlength="14" size="14"/>
            </div>
  
            <div class="divs">
              <label>Email: </label>
            <input type="text" id="email" v-model="email" />
            </div>
            <div class="divs">
              <label>Senha: </label>
            <input type="text" id="senha" v-model="senha" />
            </div>
            <div class="cargo">
              <label>Cargo: </label>
              <select class="cargo" v-model="cargo">
                  <option value="ROLE_TECNICO"> Técnico</option>
                  <option value="ROLE_ADMIN"> Administrador</option>
                  <option value="ROLE_SUPERVISOR"> Supervisor</option>
                </select>
            </div>
            <div class="cliente">
            <label>Setor: </label>
                <select class="cliente" id="setor" v-model="setor" @change="getSetor()">
                  <option v-for="setor in setores" :key="setor.id" :value="setor.id">{{ setor.nome}}</option>
                </select>
            </div>
            <button type="submit" class="btn cadastrar" @click="cadastrarUsuario()">Cadastrar</button>
            <button type="button" class="btn cancel" @click="closeForm()">Cancelar</button>
      </div>
  </div>
      <!-- Tab links -->
      <div class="screen" id="screen">
        <hr>
        <div class="header">
          <h3 class="title">USUÁRIOS</h3>
          <input type="text" placeholder="Buscar um nome" class="busca">
          <button class="btn-buscar"><i class="fas fa-search"></i></button>
          <!-- <button class="novo"></button> -->
          <button v-if="UserStorage == 'ROLE_ADMIN' " class="novo" @click="openForm()">Novo Usuário</button>
        </div>
        
  
  
          <table class="tabela" id="tabela">
              <thead class="cabecalho">
                  <th class="id">CPF</th>
                  <th class="extenso">NOME</th>
                  <th>EMAIL</th>
                  <th>CARGO</th>
                  <th>SETOR</th>
              </thead>
              <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                  <td v-if="UserStorage == 'ROLE_ADMIN' " class="id"><RouterLink :to="{ name: 'DetalhesUsuario', params: {id :usuario.id} }" >{{ usuario.cpf }}</RouterLink></td>
                  <td>{{ usuario.nome }}</td>
                  <td>{{ usuario.email }}</td>
                  <td>
                    <p v-if="usuario.cargo == 'ROLE_ADMIN'">Administrador</p>
                    <p v-else-if="usuario.cargo == 'ROLE_SUPERVISOR'">Supervisor</p>
                    <p v-else-if="usuario.cargo == 'ROLE_TECNICO'">Técnico</p>
                  </td>
                  <td>{{usuario.setor.nome}}</td>
                </tr>
              </tbody>
          </table>
      </div>
  </template>
  <style>

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
  }
  p {
    text-align: left;
    font-size: 13px;
  }
  .id {
    font-size: 13px;
    text-align: left;
  }
  .id:hover {
    font-size: 13px;
    text-align: left;
    color: black;

  }
  tr:hover{
    background-color: rgb(0, 0, 0);
    transition-duration: .18s;
    height: 2.1em !important;
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
    height: 2em;
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
    min-width: 500px;
    padding: 10px;
    height: 35em;
    transition-duration: .5s;
    margin-left: 75%;
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
    margin-bottom: 30px;
  }
  /* Add some hover effects to buttons */
  .form-container .btn:hover, .novo:hover {
    opacity: 1;
  }
  </style>
  <script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { onMounted } from 'vue'
  import axios from 'axios'   
  import { ref } from 'vue'
  const usuarios = ref([])
  const setores = ref([])
  const erro = ref()
  const formatCPF = (el) => {
    el.addEventListener('input', (e) => {
      let value = e.target.value;
      value = value.replace(/\D/g, '');
  
      if (value.length <= 3) {
        e.target.value = value;
      } else if (value.length <= 6) {
        e.target.value = `${value.slice(0, 3)}.${value.slice(3)}`;
      } else if (value.length <= 9) {
        e.target.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
      } else if (value.length <= 11) {
        e.target.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
      }
    });
  };
  
  
  //variaveis de atributos
  const cpf = ref('')
  const nome = ref('')
  const email = ref('')
  const senha = ref('')
  const cargo = ref('')
  
  
  //Variaveis do localstorage
  var TokenStorage = localStorage.getItem("Token");
  var IdStorage = localStorage.getItem("id")
  var UserStorage = localStorage.getItem("cargo")
  
  async function buscarUsuario() {
    try {
      usuarios.value = (await axios.get('usuario', {
        headers:{
          'Authorization': TokenStorage
        }
      })).data    
    } catch (error) {
      console.error('Error fetching servico:', error)
    }
  }
  
  async function buscarSetor() {
    try {
      setores.value = (await axios.get('setor', {
        headers:{
          'Authorization': TokenStorage
        }
      })).data
    } catch (error) {
      console.error('Error fetching servico:', error)
    }
  }
  
  async function atualizar(){
    try {
      usuarios.value = (await axios.get('usuario', {
        headers:{
          'Authorization': TokenStorage
        }
      })).data
    }
    catch(ex) {
      erro.value = (ex as Error).message
    }
  }
  const setor = ref()
  const set = ref()
  
  async function getSetor() {
      set.value =  (await axios.get(`setor/${setor.value}`, {
        headers:{
          'Authorization': TokenStorage
        }
      })).data
  }
  
  async function cadastrarUsuario() {
    if(UserStorage == "ROLE_ADMIN"){
      try {
        axios.post('usuario', {
  
          "cpf": cpf.value.replaceAll(".","").replace("-",""),
          "nome": nome.value,
          "email": email.value,
          "senha": senha.value,
          "cargo": cargo.value,
          "setor" : set.value
  
        },{
        headers: {
          'Authorization': TokenStorage
        }
        })
        window.location.href='/usuario'
      }catch(ex){
      erro.value = (ex as Error).message;
    }
  }else{
    alert("Você não tem permissão")
  }
    atualizar(); 
  }
  
  onMounted(() => {
    buscarUsuario();
    buscarSetor();
    atualizar();
  })
  
  function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("screen").style.filter = "blur(8px)";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("screen").style.filter = "blur(0px)";
  
  }
  </script>
  
  
  