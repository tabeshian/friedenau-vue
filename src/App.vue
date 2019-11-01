<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-bottom-navigation app height="50">
      <v-layout align-center justify-center>
        <v-btn to="/">Tabelle</v-btn>
        <v-btn>Stats</v-btn>
        <v-btn>Editor</v-btn>
      </v-layout>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    //
  })
};
</script>
