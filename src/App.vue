<template>
  <v-app>
    <v-main>
      <HomePage :key="this.$store.state.isUserLoggedIn"/>
      <router-view/>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
  import HomePage from './components/HomePage.vue';
</script>
