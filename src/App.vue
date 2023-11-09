<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Menu from './components/Menu.vue';
import Multiselect from './components/Multiselect.vue';

</script>

<template>
  <header>
    <!--  <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div>
      <HelloWorld msg="LAUDO DE INSPEÇÃO PREDIAL" />
      <Menu/>
    </div>
  </header>

  <RouterView />
</template>

