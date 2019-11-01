<template>
  <!-- <p v-if="loading">Loading...</p> -->
  <!-- <p v-if="error">{{error}}</p> -->
  <!-- <v-container fluid class="fill-height"> -->
  <v-data-table
    :dense="false"
    :height="height"
    :disable-pagination="true"
    hide-default-footer
    :fixed-header="true"
    :loading="loading"
    loading-text="lädt..."
    :no-data-text="error"
    v-if="tabelle"
    :headers="headers"
    :items="tabelle"
    :sort-by="['platz']"
    :sort-desc="[false]"
    :multi-sort="false"
    :mobile-breakpoint="0"
  ></v-data-table>
  <!-- </v-container> -->
  <!-- <pre v-if="tabelle">{{JSON.stringify(tabelle, null, 2)}}</pre> -->
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      height: window.innerHeight - 50,
      tabelle: null,
      loading: false,
      error: null,
      headers: [
        {
          text: "Platz",
          align: "left",
          sortable: true,
          value: "platz"
        },
        { text: "Name", align: "left", value: "name" },
        { text: "Sp.", align: "right", value: "spiele" },
        { text: "Pkt", align: "right", value: "punkte" }
      ]
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        const res = await fetch(".netlify/functions/tabelle");
        const { tabelle } = await res.json();
        this.tabelle = tabelle;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.error = err.message;
      }
    }
  }
};
</script>
