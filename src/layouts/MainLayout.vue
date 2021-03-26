<template>
  <q-layout view="lHh Lpr lFf">
    <Header  />
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer/>
  </q-layout>
</template>

<script>
import { Header, Footer } from "components/";
export default {
  name: "MainLayout",
  components: { Header, Footer },
  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
