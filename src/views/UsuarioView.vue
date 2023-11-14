<template>
    <div id="tabBox">
  <div class="tabWrap">
    <input id="tab-01" name="tab" type="radio" checked />
    <label class="tab label-01" for="tab-01"><span>Lista</span></label>
    <!-- tabContent 01 -->
    <article class="tabContent">
      <h1>Lista de usuarios</h1>
      <table>
        <thead>
            <th>CPF</th>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>SETOR</th>
            <th>CARGO</th>

        </thead>
        <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id">
                <td><RouterLink :to="{ name: 'DetalhesUsuario', params: {id :usuario.id} }" class="link">{{ usuario.cpf }}</RouterLink></td>    
                <td>{{usuario.nome}}</td>
                <td>{{usuario.email}}</td>
                <td>{{usuario.setor.nome}}</td>
                <td>
                  <p v-if="usuario.cargo == 'ROLE_ADMIN'">Administrador</p>
                  <p v-else-if="usuario.cargo == 'ROLE_SUPERVISOR'">Supervisor</p>
                  <p v-else-if="usuario.cargo == 'ROLE_TECNICO'">Técnico</p>
                </td>
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
      <h3>Preencha as informações:</h3>

        <div class="divs">
          <label>Nome Completo</label>
        <input type="text" id="nome_user" v-model="nome" />
        </div>
        <div class="divs">
          <label>CPF</label>
        <input type="text" id="cpf" v-model="cpf" maxlength="14" size="14"/>
        </div>

        <div class="divs">
          <label>Email</label>
        <input type="text" id="email" v-model="email" />
        </div>
        <div class="divs">
          <label>Senha</label>
        <input type="password" id="senha" v-model="senha" />
        </div>
        <div class="cargo">
          <label>Cargo </label>
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

        <div>
          <button @click="cadastrarUsuario()" class="cadastrar-usuario">Cadastrar</button>
        </div>
        <p v-if="erro">{{erro}}</p>

   
    </article>
  </div>
  


</div>
</template>
<style>
.cadastrar-usuario{
    height: 25px;
    font-size: 15px;
    width: 8em;
    padding: 0;
}
.cadastrar-usuario:hover{
    height: 25px;
    font-size: 15px;
    width: 8em;
    padding: 0;
}
th {
  width: 25em;
  font-size: 15px;
}
.link {
  text-decoration: none;
  color:black;
  font-weight: bold;
  background-color: rgba(275, 187, 0, .5);
  padding: 5px;
  border-radius: 9px;
}
.link:hover {
  text-decoration: none;
  color:rgb(5, 5, 5);
  font-weight: bold;
  font-size: 17px;
  transition-duration: .2s;
}
.prazo label {
  font-size: 17px;
  font-weight: bold;
}
tr:hover {
  transition-duration: .4s;
  background-color: rgba(255, 187, 0, 0.027);
}
.prazo input {
  width: 10em;
  text-align: right;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.575);
  border: 1px solid rgba(0, 0, 0, 0) !important;  
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
.divs label {
  font-size: 17px;
  color: black;
}
.divs input {
    width: 10em;
    text-align: left;
    height: 30px;
    border-radius: 5px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.575);
    border: 1px solid rgba(0, 0, 0, 0.233);
}

.divs {
  margin-bottom: 15px;
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
.cargo {
  margin-top: .5%;
  margin-bottom: .5%;
}

.cargo label {
  padding-top: 20px;
  font-size: 17px;
}
.cargo select{
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
th, td {
    border: 1px solid #dddddd8c;
    text-align: center;
    border-radius: 2px;
    color: #000000;
    padding: 10px;
  }

/* tabBox */
#tabBox {
  width: 100%;
  height: auto;
  margin: 0 auto;
  position: relative;
}
.tabWrap {
  float: none;
}

td {
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  text-align: center;
}
table {
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(85, 84, 84, 0.281);
  border-radius: 10px;
}
tr {
  border: 1px solid black;
}
/* Hide Input Radio */
input[type="radio"] {
  display: none;
}

/* Tabs */
.tab {
  width: 100%;
  height: 65px;
  margin: 0 auto;
  background: rgba(255,187,0,1);
  border: none;
  position: relative;
  cursor: pointer;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  display: block;
}
.tab::before {
  display: none;
}
.tab::after {
  content: '';
  display: none;
  border-radius: 10px;

}
.tab span {
  color: #FFF;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  text-align: center;
  line-height: 65px;
  display: block;
}

.label-01 {
  z-index: 20;
}
.label-02 {
  z-index: 20;
  position: absolute;
}
.label-03 {
  z-index: 1;
}

/* Display Checked Input */
.tabWrap [id^="tab"]:checked ~ .tabContent {
  display: block;
}
/* Bring Forward Checked Input */
.tabWrap [id^="tab"]:checked + label {
  background: #cf1717;
  z-index: 4;
}

.tabWrap [class^="tab label"]:not(.label-01) {
  margin-left: 0;
}

/* Unchecked Input Hover */
.tabWrap [id^="tab"]:not(:checked) + label:hover {
  background: #000000;
  border: none;
}

/* Unchecked Input */
.tabWrap [id^="tab"]:not(:checked) + label::before {
  background: #000000;
  border-radius: 20px;
  transition-duration: 1s;
  
}

/* Checked Input No Shadow*/
.tabWrap [id^="tab"]:checked + label::after {
  display: none;

}

/* tabContent */
.tabContent {
  width: 90%;
  height: auto;
  min-height: 300px;
  margin: 0 auto;
  padding: 5%;
  background: #FFF;
  box-shadow: 0 4px 0 0 rgba(0,0,0,0.015);
  position: absolute;
  /* Multiple .tab Height By Number Of .tab(s) To Get Position Absolute Top */
  top: 195px;
  border:  1px solid black;
  left: 0;
  display: none;
  z-index: 1;
}
.tabContent h1, p {
  font-family: 'Open Sans', sans-serif;
}
.tabContent h1 {
  margin: 0;
  margin-top: 20px;
  color: rgb(255, 187, 0);
  font-size: 1.5em;
  text-transform: uppercase;
}
.tabContent p {
  margin: .5em 0;
  color: #222;
}

/* Media Queries */
@media (min-width: 800px) {
  #tabBox {
    width: 400px;
    margin: 25px auto;
  }
  .tabWrap {
    float: left;
  }
  .tab {
    width: 70px;
    height: auto;
    margin: 0;
    background: none;
    /* border: 50px solid #FFF; */
    border-top: none;
    margin-right: 50px;
    
    border-right: 15px solid transparent;
    position: relative;
    cursor: pointer;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    display: inline-block;
  }
  .tab::before {
    content: '';
    width: 10px;
    height: 25px;
    background: rgb(255, 187, 0);
    
    /* border-radius: 10%; */
    position: absolute;
    top: 11.5px;
    padding-left: 5em;
    padding-right: 5em;
    margin-left: -19em;
    text-align: center;
    /* justify-content: center; */
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    display: inline-block;
    text-align: right;
  }
  .tab::after {
    content: '';
    width: 90px;
    height: 2px;
    background: rgba(0,0,0,0.025);
    position: absolute;
    border-radius: 10px;
    font-size: 20px;
    top: 48px;
    right: -15px;
    display: block;
  }
  .tab span {
    line-height: 50px;
    position: absolute;
    top: 0;
    left: -250px;
  }


  /* Cancel Checked Input Background */
  .tabWrap [id^="tab"]:checked + label {
    background : none;
  }
  /* Unchecked Input Hover */
  .tabWrap [id^="tab"]:not(:checked) + label:hover {
    background: none;
    /* border: 10px solid #F9F9F9; */
    border-top: none;
    border-right: 15px solid transparent;
  }
  .tabWrap [class^="tab label"]:not(.label-01) {
    margin-left: -5px;
  }
  .tabContent {
    width: 1000px;
    position: absolute;
    top: 30px;
    left: 0;
    margin-left: -75%;
    border: 1px solid rgba(10, 8, 8, 0.176);
    box-shadow: 5px 10px #88888833;
    border-radius: 20px;
  }
}
@media (min-width: 2000px) {
  #tabBox {
    width: 800px;
    
    
  }
  .tabContent {
    width: 950px;
  }
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


//variaveis de atributos
const cpf = ref('')
const nome = ref('')
const email = ref('')
const senha = ref('')
const cargo = ref('')


//Variaveis do localstorage
var TokenStorage = localStorage.getItem("Token");

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
      //window.location.href='/usuario'
    }catch(ex){
    erro.value = (ex as Error).message;
  }
  atualizar(); 
}

onMounted(() => {
  const cpfInput = document.getElementById('cpf');
  formatCPF(cpfInput);
  buscarUsuario();
  buscarSetor();
  atualizar();
})
</script>