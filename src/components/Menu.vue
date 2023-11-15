<script setup lang="ts">
import { RouterLink } from 'vue-router'

function abrirMenu() {
 
}
</script>

<template>
    <div>
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
    </div>
    <div>
      <ul class="menu">

<li title="home"><a href="#" class="menu-button home">menu</a></li>
<li title="Laudo"><a href="#" class="fa-file-lines">Laudo</a></li>
<li title="Usuários"><RouterLink to="/usuario" class="active about">Usuário</RouterLink></li>
<li title="Ordem de Serviço"><RouterLink to="/ordemServico" class="fa-file-circle-plus">Ordem de Servico</RouterLink></li>
<li title="Setor"><RouterLink to="/setor" class="fa-building-o">Setores</RouterLink></li>
<li title="pencil"><RouterLink to="/client" class="fa-people-group">Clientes</RouterLink></li>
<li title="contact"><RouterLink to="/Servico" class="fa-server">Serviços</RouterLink></li>
<li title="contact"><RouterLink to="/contrato" class="fa-file-contract">Contratos</RouterLink></li>
<li title="archive"><RouterLink to="/Item" class="fa-wrench">Items</RouterLink></li>

</ul>

<ul class="menu-bar">
  <li><a href="#" class="menu-button" >Menu</a></li>
  <li><a href="#">Home</a></li>
  <li><a href="#">Profile</a></li>
  <li><a href="#">Editorial</a></li>
  <li><a href="#">About</a></li>
</ul>
    </div>
</template>

<style>
@import url("//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.min.css");
.menu, .menu-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background: #f7f7f7;
    z-index:10;  
    overflow:hidden;
    box-shadow: 2px 0 18px rgba(0, 0, 0, 0.26);
}
.menu li a{
  display: inline-block;
  text-indent: -500em;
  height: 5em;
  width: 5em;
  line-height: 5em;
  text-align:center;
  color: #72739f;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background 0.1s ease-in-out;
}
.menu li a:before {
  font-family: FontAwesome;
  speak: none;
  text-indent: 0em;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 1.4em;
}
.menu li a.search:before {
  content: "\f002";
}
.menu li a.archive:before {
  content: "\f187";
}
.menu li a.pencil:before {
  content: "\f040";
}
.menu li a.contact:before {
  content: "\f003";
}
.menu li a.about:before {
  content: "\f007";
}
.menu li a.home:before {
  content: "\f039";
}
.menu-bar li a:hover,
.menu li a:hover,
.menu li:first-child a {
  background: #FFBB00;
  color: #fff;
}
.menu-bar{
    overflow:hidden;
    left:5em;
    z-index:5;
    width:0;
    height:0;
    transition: all 0.1s ease-in-out;
}
.menu-bar li a{
  display: block;
  height: 4em;
  line-height: 4em;
  text-align:center;
  color: #72739f;
  text-decoration:none;  
  position: relative;
  font-family:verdana;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background 0.1s ease-in-out;
}
.menu-bar li:first-child a{
    height:5em;
    background: #FFBB00;
    color: #fff;    
    line-height:5
}


.para{
    color:#FFBB00;
    padding-left:100px;
    font-size:3em;
    margin-bottom:20px;
}

.open{
    width:10em;
    height:100%;
}

@media all and (max-width: 500px) {
    .container{
        margin-top:100px;
    }
    .menu{
        height:5em;
        width:100%;
    }
    .menu li{
        display:inline-block;
    }
    .menu-bar li a{
        width:100%;
    }
    .menu-bar{
        width:100%;
        left:0;
      bottom: 0;
        height:0;
    }
    .open{
        width:100%;
        height:auto;
    }
    .para{
    padding-left:5px;
}  
}
@media screen and (max-height: 34em){
  .menu li,
  .menu-bar {
    font-size:70%;
  }
}
@media screen and (max-height: 34em) and (max-width: 500px){
  .menu{
        height:3.5em;
    }
}
</style>
