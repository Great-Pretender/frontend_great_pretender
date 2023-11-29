<template>
    
   
  <div id="tabBox">
    <div class="tabWrap">
      <input id="tab-01" name="tab" type="radio" checked />
      <label class="tab label-01" for="tab-01"><span>Itens</span></label>
      <!-- tabContent 01 -->
      <article class="tabContent">
        <h1>Lista de Itens</h1>
        <table>

          <thead>
              <th> ITEM </th>
              <th> MODELO </th>
              <th> MARCA </th>
              <th> SERVIÇO </th>
              <th> SETOR</th>
              <th> VALIDAÇÕES </th>
          </thead>

          <tbody>
            <tr v-for="item in itens" :key="item.id">
                <td><RouterLink :to="{ name: 'DetalhesItem', params: {id :item.id} }" class="link">{{ item.nome }}</RouterLink></td>
                <td>{{ item.modelo }}</td>
                <td>{{ item.marca }}</td>
                <td>{{ item.servico.nome }}</td>
                <td>{{ item.setor }}</td>
                <td>{{ item.validade }}</td>

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

            <div>
              <label for="ItemName">Item:</label><br>
              <input type="text" id="InputItemName" name="ItemName" v-model="ItemName"><br>
            </div>
              
            <div>
              <label for="ItemModel">Modelo:</label><br>
              <input type="text" id="InputItemModel" name="ItemModel" v-model="ItemModel"><br>
            </div>

            <div>
              <label for="ItemBrand">Marca:</label><br>
              <input type="text" id="InputItemBrand" name="ItemBrand" v-model="ItemBrand"><br>
            </div>

            <div>
              <label for="ItemBrand">Serviço:</label><br>
                <select class="servico" id="servico_id" v-model="servico" @change="getServico()">
                    <option v-for="servicos in SelectionServico" :key="servicos.id" :value="servicos.id">{{ servicos.nome}}</option>
                </select>
            </div>

            <div>
              <label for="ServicoSection">Setor:</label><br>
              <input list="ListSection" type="text" id="InputServicoSection" name="ServicoSection" v-model="itemSetor"><br>
            </div>

            <div>
              <label for="ItemValidation">Validação:</label><br>
              <input type="text" id="InputItemValidation" name="ItemValidation" v-model="ItemValidation"><br>
            </div>
            
          </form>
        </div>
      
        <button id="addItem" @click="CadastrarItem">Cadastrar</button>
      </article>
    </div>

  </div>
</template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue'
  import axios from 'axios'
  import { ref } from 'vue'

  
  const ItemName = ref('');
  const SelectionSection = ref('');
  var SelectionServico = ref();
  const ItemModel = ref('');
  const ItemBrand = ref('');
  const ItemServico = ref('');
  const ItemValidation = ref('');
  const itens = ref('');
  const setor = ref('');
  const itemSetor = ref('');

  //Variaveis utilizada para filtro e busca
  var TokenStorage = localStorage.getItem("Token");
  var IdStorage = localStorage.getItem("id")
  var UserStorage = localStorage.getItem("cargo")
  const usuario = ref()
  //conectando ao banco em nuvem
 // axios.defaults.baseURL = 'https://8080-greatpreten-backendgrea-t1i4c91qf2n.ws-us105.gitpod.io/'
  
 //buscando todos os setores do banco
  var servico = ref()
  const serv = ref()

  async function getServico() {
    serv.value =  (await axios.get(`servico/${servico.value}`, {
      headers:{
        'Authorization': TokenStorage
      }
    })).data
    console.log(servico.value)
    console.log (serv.value)
  }
  
  var erro = ref("")
  //depois de realizar alguma ação ele volta pra pagina inicial e atualiza com as informações do banco
  async function atualizar(){
    if(UserStorage == "ROLE_ADMIN"){
      try {
        itens.value = (await axios.get('item', {
        headers:{
          'Authorization': TokenStorage
        }
        })).data
        console.log(itens.value)
      }
      catch(ex) {
        erro.value = (ex as Error).message
      }
    }else{
      try {
        usuario.value = (await axios.get(`usuario/${IdStorage}`, {
        headers:{
        'Authorization': TokenStorage
        }
        })).data

        itens.value = (await axios.post('item/idSetor',{
          id: usuario.value.setor.id
        },{
        headers:{
          'Authorization': TokenStorage
        }
        })).data
      }
      catch(ex) {
        erro.value = (ex as Error).message
      }
    }
  }
  //Pegar os campos do front e salvar no banco de dados
  async function CadastrarItem() {
  console.log(serv.value)
    try {
    await axios.post('item', {
      "nome": ItemName.value,
      "marca": ItemBrand.value,
      "modelo": ItemModel.value,
      "validade": ItemValidation.value,
      "setor": itemSetor.value,
      "servico": serv.value
      },{
      headers: {
        'Authorization': TokenStorage
      }
      })
    atualizar();
    window.location.href='/Item'
  } catch(ex){
    erro.value = (ex as Error).message;
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
    SelectionSection.value = response.data
  } catch (error) {
    console.error('Error fetching servico:', error)
  }  
}

 //Função para buscar os servicos do banco
 async function buscarServico() {
  try {
    const response = await axios.get('servico', {
      headers:{
        'Authorization': TokenStorage
      }
    })
    SelectionServico.value = response.data
  } catch (error) {
    console.error('Error fetching servico:', error)
  }  
}

  //para deixar carregado as funções antes da página carregar
  onMounted(() => {
    buscarServico();
    // buscarSetor();
    atualizar();
  })
</script>
  
  <style>
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
  