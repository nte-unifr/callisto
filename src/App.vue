<template>
  <div id="app">
    <Navbar />
    <Set />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Set from "./components/Set.vue";

export default {
  name: "app",
  components: { Navbar, Set },
  data() {
    return {
      project: process.env.VUE_APP_TITLE
    };
  }
};
</script>