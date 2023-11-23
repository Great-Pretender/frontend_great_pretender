<script setup lang="ts">
import { RouterLink } from 'vue-router'

console.log("teste")
</script>
<template>
    <!-- <div>
        <nav>
          <ul>
            <li><RouterLink to="/">Landing Page</RouterLink></li>
            <li><RouterLink to="/ordemServico">Ordem de Servico</RouterLink></li>
            <li><RouterLink to="/usuario">Usuários</RouterLink></li>
            <li><RouterLink to="/client">Clientes</RouterLink></li>
            <li><RouterLink to="/Servico">Serviços</RouterLink></li>
            <li><RouterLink to="/Item">Items</RouterLink></li>
            <li><RouterLink to="/setor">Setores</RouterLink></li>
            <li><RouterLink to="/contrato">Contratos</RouterLink></li>
        </ul>
      </nav>
      <hr>
    </div> -->

<input type="checkbox" id="check">
    <label for="check">
      <i class="fas fa-bars" id="btn"></i>
      <i class="fas fa-times" id="cancel"></i>
    </label>
    <div class="sidebar">
      <header>Menu</header>
      <RouterLink to="/">
        <i class="fas fa-file"></i>
        <span>Landing Page</span>
      </RouterLink>
      <RouterLink to="/ordemServico">
        <i class="fas fa-table"></i>
        <span>OS</span>
      </RouterLink>
      <RouterLink to="/usuario">
        <i class="fas fa-users"></i>
        <span>Usuários</span>
      </RouterLink>
      <RouterLink to="/client">
        <i class="fas fa-address-book"></i>
        <span>Clientes</span>
      </RouterLink>
      <RouterLink to="/Servico">
        <i class="fas fa-stream"></i>
        <span>Serviços</span>
      </RouterLink>
      <RouterLink to="/Item">
        <i class="fas fa-wrench"></i>
        <span>Itens</span>
      </RouterLink>
      <RouterLink to="/setor">
        <i class="fas fa-building"></i>
        <span>Setores</span>
      </RouterLink>
      <RouterLink to="/contrato">
        <i class="fas fa-file-lines"></i>
        <span>Contratos</span>
      </RouterLink>
    </div> 
    
</template>

<style>
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
}
:root {
  --accent-color: #fff;
  --gradient-color: #FBFBFB;
}


.sidebar{
  position: fixed;
  width: 240px;
  left: -240px;
  height: 100%;
  margin-top: -20px;
  background-color: rgba(255, 255, 255, 0)070;
  transition: all .5s ease;
}
.sidebar header{
  font-size: 14px;
  color: #353535;
  width: 25%;
  line-height: 70px;
  text-align: center;
  background-color: #fff;
  user-select: none;
  font-family: 'Lato', sans-serif;
}
.sidebar a{
  display: block;
  height: 55px;
  width: 65%;
  color: #353535;
  line-height: 65px;
  padding-left: 15px;
  box-sizing: border-box;
  border-left: 5px solid transparent;
  font-family: 'Lato', sans-serif;
  transition: all .5s ease;
}
a.active,a:hover{
  border-left: 5px solid var(--accent-color);
  color: #fff;
   background: linear-gradient(to left, var(--accent-color), var(--gradient-color));
}
.sidebar a i{
  font-size: 15px;
  margin-right: 16px;
}
.sidebar a span{
  letter-spacing: 1px;
  font-size: 12px;
  text-transform: uppercase;
}
#check{
  display: none;
}
label #btn,label #cancel{
  position: absolute;
  left: 5px;
  cursor: pointer;
  color: white;
  border-radius: 5px;
  margin: -60px 12px;
  font-size: 15px;
  background-color: rgb(256,197,0);
  box-shadow:inset 2px 2px 2px 0px rgb(255, 255, 255)0.5),
    inset -7px -7px 10px 0px rgba(223, 220, 220, 0.1),
   3.5px 3.5px 20px 0px rgba(243, 237, 237, 0.1),
   2px 2px 5px 0px rgba(255, 255, 255, 0.1);
  height: 45px;
  width: 45px;
  text-align: center;
  text-shadow: 2px 2px 3px rgba(255,255,255,0.5);
  line-height: 45px;
  transition: all .5s ease;
}
label #cancel{
  opacity: 0;
  visibility: hidden;
}
#check:checked ~ .sidebar{
  left: 0;
}
#check:checked ~ label #btn{
  margin-left: 245px;
  opacity: 0;
  visibility: hidden;
}
#check:checked ~ label #cancel{
  margin-left: 105px;

  opacity: 1;
  visibility: visible;
}
@media(max-width : 860px){
  .sidebar{
    height: auto;
    width: 70px;
    left: 0;
    margin: 100px 0;
  }
  header,#btn,#cancel{
    display: none;
  }
  span{
    position: absolute;
    margin-left: 23px;
    opacity: 0;
    visibility: hidden;
  }
  .sidebar a{
    height: 60px;
  }
  .sidebar a i{
    margin-left: -10px;
  }
  a:hover {
    width: 200px;
    background: inherit;
  }
  .sidebar a:hover span{
    opacity: 1;
    visibility: visible;
  }
}

.sidebar > a.active,.sidebar > a:hover:nth-child(even) {
  --accent-color: rgb(255, 196, 0);
  --gradient-color: rgb(256,197,0);
}
.sidebar a.active,.sidebar > a:hover:nth-child(odd) {
  --accent-color: rgb(255,196,0);
  --gradient-color: #ffc400;
}


.frame {
  width: 50%;
  height: 30%;
  margin: auto;
  text-align: center;
}

h2 {
  position: relative;
  text-align: center;
  color: #353535;

  font-family: 'Lato', sans-serif;
  margin: 0;
  color: #1a1a1a;
}
RouterLink {
  background-color: black;
}

p {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  text-align: center;
  font-size: 16px;
  color: #000000;
  margin: 0;
}
</style>
