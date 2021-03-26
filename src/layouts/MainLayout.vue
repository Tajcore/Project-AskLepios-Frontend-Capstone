<template>
  <q-layout view="lHh Lpr lFf">
    <Header :dark="darkheader" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script>
import { Header, Footer } from "components/";

export default {
  name: "MainLayout",
  components: { Header, Footer },
  data() {
    return {};
  },
  computed: {
    darkheader: {
      get: function() {
        return this.$q.dark.mode;
      }
    }
  },
  watch: {
    $q: function() {
      console.log($q);
    },
    $route(to, from) {
      if (window.location.pathname === "/team") {
        document.body.className =
          window.location.pathname === "/team" ? "team" : "bg-light";
      }
    }
  }
};
</script>
