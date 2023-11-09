<template>
  <div>
    <div class="topnav">
      <a @click="activeView = 'home'">Home</a>
      <a @click="activeView = 'contact'">Contato</a>
     <!--  <a @click="activeView = 'login'">Login</a> -->
    </div>

    <div>
      <div v-if="activeView === 'home'">
        <section id="home">
          <h1>HOME</h1>
          <h2>O QUE É?</h2>
<p>Os Laudos Técnicos de Inspeção de Estruturas Civis são documentos completos que atestam detalhadamente as condições físicas, contendo um diagnóstico de análise de riscos e as etapas descritas para a recuperação da estrutura.

Estes documentos podem informar que não há recomendações e serviços a serem executados, atestando que há segurança e estabilidade estrutural ou conter recomendações indicando os reparos ou serviços a serem executados para a manutenção e recuperação da edificação/estrutura, assim como providencias a serem adotadas, se necessárias.

Outra opção de desenvolvimento destes documentos é na fase final das atividades recuperação, informando que as obras para a manutenção e recuperação, indicadas no Laudo Inicial com Recomendações, foram executadas, atestando que a edificação apresenta segurança e estabilidade estrutural.
</p>

<h3>PARA QUE SERVE?</h3>
<p>A inspeção civil a tem a função de prevenir sinistros na edificação/estrutura, tais como: Instabilidade estrutural, destelhamentos, infiltrações de água, quedas de elementos, entre outros fatores que podem vir a causar acidentes decorrentes de falhas de projeto, execução, manutenção ou até mesmo de eventos da natureza.
</p>

<h3>QUAL A VANTAGEM?</h3>

<p>Dentre inúmeras vantagens que a inspeção civil proporciona, seguem os principais benefícios:

Determinar as irregularidades .

Estabelecer providências e responsabilidades.

Analisar os sistemas construtivos, as instalações e os equipamentos.

Preservar a garantia da construção.

Verificar o estado de conservação e as condições gerais.

Auxiliar, atestar e verificar à evolução do estado de conservação.</p>

<h3>QUAIS AS PRINCIPAIS NORMAS E LEIS ATENDIDAS?</h3>
        <p> 
          
NBR 5.674 - Manutenção de edificações - Requisitos para o sistema de gestão de manutenção

NBR 15.575 Edificações habitacionais Desempenho

NBR 13752 - Perícias de Engenharia na Construção Civil

NBR 16747 - Inspeção predial

LEIS E DECRETOS MUNICIPAIS, ESTADUAIS E FEDERAIS
</p>


          <!-- Your Home content goes here -->
        </section>
      </div>
      <div v-if="activeView === 'contact'">
        <section id="contact">
          <h1>Contato</h1>
          <h2>Como fazer um pedido?</h2>
          <p>Basta preencher o formulário presente no botão abaixo especificando sua necessidade que iremos entrar em contato para a realização do serviço: </p>
          <button @click="redirectToGoogleForm()">Formulário de pedidos</button>
          <qrcode-vue :value="googleFormURL" :size="150" />
          <h3>Email para contato: greatPretenderOficial@greatpretender.com</h3>

          
          <!-- Your Contact content goes here -->
        </section>
      </div>
      <!-- <div v-if="activeView === 'login'">
        <section id="login">
          <h1>Login Usuario: </h1>

          
        <div class="loginValores">
            <label>CPF/EMAIL:</label>
            <input type="text" id="email" v-model="email" >
        </div>
        <br>
        <div class="loginValores">
            <label>SENHA:</label>
            <input type="password" id="senha" v-model="senha" >
            <button id="btnLogin" @click="loginUsuario">Login</button>
        </div>
          
        </section> 
      </div>-->
    </div>
  </div>
</template>

<script >
import VueQrcode from 'vue-qrcode';
import axios from 'axios';
import { ref } from 'vue';


/* const email = ref('');
const senha = ref(''); */

export default {
  components: {
    'qrcode-vue': VueQrcode,
  },
  methods: {
    /* loginUsuario() {
            console.log('Botão clicado!'); // Substitua isso pela lógica desejada
        }, */
    redirectToGoogleForm() {
      window.location.href = this.googleFormURL;
    },
  },

  data() {
    
    return {
      activeView: 'home',
      googleFormURL: 'https://docs.google.com/forms/d/e/1FAIpQLScOhdtqTEdHO2C-XGSTAQbtHpUvkb6HIl4UaTxemQBCkWvVkg/viewform?usp=sf_link',
    };
  }
};

</script>

<style>
  /* Add a black background color to the top navigation */
  .topnav {
    background-color: #494545;
    overflow: hidden;
  }

  /* Style the links inside the navigation bar */
  .topnav a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

  /* Change the color of links on hover */
  .topnav a:hover {
    background-color: #ddd;
    color: black;
  }

  /* Add a color to the active/current link */
  .topnav a.active {
    background-color: #aa9104;
    color: white;
  }

  .loginValores{
    float: center;
    text-align: center;

  }

  .btnLogin{
    float: center;
    text-align: center;

  }
</style>
