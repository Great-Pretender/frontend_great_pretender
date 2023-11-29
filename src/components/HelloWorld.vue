<script setup lang="ts">
defineProps<{
  msg: string
}>()


</script>

<template>
  <div class="cabecalho">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>



@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
   
  }
}
</style>
