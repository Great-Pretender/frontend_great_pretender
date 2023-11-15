<template>
    
   
<div id="tabBox">
  <div class="tabWrap">
    <input id="tab-01" name="tab" type="radio" checked />
    <label class="tab label-01" for="tab-01"><span>Lista</span></label>
    <!-- tabContent 01 -->
    <article class="tabContent">
      <h1>Lista de Serviços</h1>

      <table>
        <thead>
            <th>SERVIÇO</th>
            <th> DESCRIÇÃO</th>
            <th> CUSTO </th>
            <th> RISCO </th>
            <th> DURAÇÃO DIAS</th>
            <th> SETOR </th>
        </thead>

        <tbody>
          <tr v-for="servico in servicos" :key="servico.id">
            <td><RouterLink :to="{ name: 'DetalhesServico', params: {id :servico.id} }" class="link">{{ servico.nome }}</RouterLink></td>
            <td>{{ servico.descricao }}</td>
            <td>{{ servico.custo }}</td>
            <td>{{ servico.risco }}</td>
            <td>{{ servico.duracao_dias }}</td>
            <td>{{ servico.setor.nome }}</td>
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

          <div class>
            <label for="ServicoName">Serviço:</label><br>
            <input type="text" id="InputServicoName" name="ServicoName" class="servicoNome" v-model="nome"><br>
          </div>

          <div>
            <label for="ServicoDescricao">Descrição:</label><br>
            <textarea placeholder="Digite sua mensagem" minlength="20" class="servicoDescricao" id="clausulas_contrato"  v-model="descricao"></textarea>
          </div>

          <div>
            <label for="ServicoCost">Custo:</label><br>
            <input type="text" id="InputServicoCost" name="ServicoCost" class="servicoCusto" v-model="custo"><br>
          </div>

          <div>
            <label for="ServicoRisk">Risco:</label><br>
            <input list="ListRisk" type="text" id="InputServicoRisk" name="ServicoRisk" class="servicoRisco" v-model="risco"><br>
            
            <datalist name="ListRisk" id="ListRisk" class="servicoRisco">
              <option value="Baixo"></option>
              <option value="Médio"></option>
              <option value="Alto"></option>
            </datalist>
          </div>
          
          <div>
            <label for="ServicoDuration">Duração:</label><br>
            <input type="text" id="InputServicoDuration" name="ServicoDuration" class="servicoDuracao" v-model="duracao_dias"><br>
          </div>

          <div class="setor">
        <label>Setor: </label>
            <select class="setor" id="setor" v-model="setor" @change="getSetor()">
              <option v-for="setor in setores" :key="setor.id" :value="setor.id">{{ setor.nome}}</option>
            </select>
        </div>
              
        </form>
      </div>
    
      <button id="addServico" @click="cadastrarServico">Cadastrar</button>
    </article>
  </div>

  </div>
</template>
  
  <script setup lang="ts">

  //Importações
  import { onMounted } from 'vue'
  import axios from 'axios'
  import { ref } from 'vue'

  //Variaveis das funções
  const nome = ref('');
  const descricao = ref('');
  const custo = ref('');
  const risco = ref('');
  const duracao_dias = ref('');
  var setor = ref();
  var set = ref();
  const servicos = ref([]);
  var erro = ref()
  const setores = ref([])
  //conectando ao banco em nuvem

  const formatMONETARIO = (el) => {
  el.addEventListener('input', (e) => {
    let value = e.target.value;
    
    // Remove todos os caracteres, exceto números e a primeira vírgula
    value = value.replace(/[^\d,]|(,.*?,)/g, '');
    
    // Remove vírgulas duplicadas
    value = value.replace(/,+/g, ',');
    
    // Adiciona "R$ " no início
    e.target.value = `R$ ${value}`;
  });
};

//Variaveis do localstorage
var TokenStorage = localStorage.getItem("Token");



  //buscando todos os setores do banco
  async function getSetor() {
    set.value =  (await axios.get(`setor/${setor.value}`, {
      headers:{
        'Authorization': TokenStorage
      }
    })).data
  }

  //depois de realizar alguma ação ele volta pra pagina inicial e atualiza com as informações do banco
  async function atualizar(){
  try {
    servicos.value = (await axios.get('servico', {
      headers:{
        'Authorization': TokenStorage
      }
    })).data

  }
  catch(ex) {
     erro.value = (ex as Error).message
    }
  }
  
  //Pegar os campos do front e salvar no banco de dados
  async function cadastrarServico() {
  try {
    await axios.post('servico', {
      "nome": nome.value,
      "descricao": descricao.value,
      "risco": risco.value,
      "custo": custo.value.replace("R$","").replace(" ",""),
      "duracao_dias": duracao_dias.value,
      "setor": set.value
      },{
      headers: {
        'Authorization': TokenStorage
      }
      })
    atualizar();
    window.location.href='/Servico'
  } catch(ex){
    erro.value = (ex as Error).message;
    console.log(erro.value)
  }
  }

//Função para buscar os setores do banco
async function buscarSetor() {
  try {
    const response = await axios.get('setor', {
      headers:{
        'Authorization': TokenStorage
      }
    })

    setores.value = response.data
  } catch (error) {
    console.error('Error fetching servico:', error)
  }  
}

//para deixar carregado as funções antes da página carregar
onMounted(() => {
  
  buscarSetores();
  atualizar();
  const custoInput = document.getElementById('InputServicoCost');
formatMONETARIO(custoInput);

})

async function buscarSetores() {
  try {
    const response = await axios.get('setor', {
      headers:{
        'Authorization': TokenStorage
      }
    })

    setores.value = response.data
  } catch (error) {
    console.error('Error fetching setor:', error)
  } 
}

</script>
  
  <style>
  .servicoNome {
  width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.776);
  border: 1px solid rgba(0, 0, 0, 0.233);  
  margin-bottom: 1em;
  }

  .servicoDescricao {
    margin-top: 1em;
  width: 90%;
  height: 20em;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.651);
  border: 1px solid rgba(0, 0, 0, 0.233);
  padding: 1em;
  }

  .servicoCusto {
    width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.776);
  border: 1px solid rgba(0, 0, 0, 0.233);  
  margin-bottom: 1em;
  }

  .servicoRisco {
    width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.776);
  border: 1px solid rgba(0, 0, 0, 0.233);  
  margin-bottom: 1em;
  }

  .servicoDuracao {
    width: 20em;
  text-align: left;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.776);
  border: 1px solid rgba(0, 0, 0, 0.233);  
  margin-bottom: 1em;
  }
  .laudo {
    background-color: blueviolet !important;
  }
  
  .itensLaudo{ 
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
  
  button{
  
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
    color:  rgb(255, 187, 0);
    box-shadow: 1px 1px 2px  rgb(255, 187, 0);
    padding-top: .6%;
    padding-bottom: .6%;
    padding-left: 1.2%;
    padding-right: 1.2%;
    border-style: solid;
    border-color:  rgb(255, 187, 0);
    text-shadow: 1px black;
  }
  
  </style>
  