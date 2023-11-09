<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
</template>