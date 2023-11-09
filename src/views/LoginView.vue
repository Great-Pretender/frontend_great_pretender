<template>


  <div class="page">
    <h2>Preencha as informações:</h2>
    <form @submit.prevent="login" class="formLogin">

        <label>Usuário</label>
        <input type="text" id="usuario" v-model="usuario" placeholder="Digite seu usuário"/>
        <label>Senha</label>
        <input type="password" id="senha" v-model="senha" placeholder="Digite sua senha"/>
        <a href="/">Esqueci minha senha</a>
        <button type="submit" class="btn">Entrar</button>

    </form>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'   
import { ref } from 'vue'

const usuario = ref()
const senha = ref()
const loginRes = ref()

async function login() {
    
      //Realizando a solicitação de login para entrar no sistema
     try {
        loginRes.value = (await axios.post('login', {
            username: usuario.value,
            password: senha.value

      })).data
      
      localStorage.setItem("usuario", usuario.value)
      localStorage.setItem("senha", senha.value)
      localStorage.setItem("Token", loginRes.value.token)
      
      window.location.href='/ordemServico'
      } catch (error) {
        console.error('Error fetching servico:', error)
        alert("Credencias Incorretas!!!");
      }
}


onMounted(() => {

})

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    color: #023047
}

.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: rgb(255, 187, 0);
}

.formLogin {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 7px;
    padding: 40px;
    box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.4);
    gap: 5px
}

.areaLogin img {
    width: 420px;
}

.formLogin h1 {
    padding: 0;
    margin: 0;
    font-weight: 500;
    font-size: 2.3em;
}

.formLogin p {
    display: inline-block;
    font-size: 14px;
    color: #666;
    margin-bottom: 25px;
}

.formLogin input {
    padding: 15px;
    font-size: 14px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    margin-top: 5px;
    border-radius: 4px;
    transition: all linear 160ms;
    outline: none;
}


.formLogin input:focus {
    border: 1px solid #f72585;
}

.formLogin label {
    font-size: 14px;
    font-weight: 600;
}

.formLogin a {
    display: inline-block;
    margin-bottom: 20px;
    font-size: 13px;
    color: #555;
    transition: all linear 160ms;
}

.formLogin a:hover {
    color: #f72585;
}

.btn {
    background-color: #25f748;
    color: #000000;
    font-size: 14px;
    font-weight: 600;
    border: none !important;
    transition: all linear 160ms;
    cursor: pointer;
    margin: 0 !important;

}

.btn:hover {
    transform: scale(1.05);
    background-color: #ff0606;

}
</style>