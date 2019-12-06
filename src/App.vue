<template>
  <div id="app">
    <Navbar :project="project" />
    <Set />
    <Footer />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Set from './components/Set.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: { Navbar, Set, Footer },
  data() {
    return {
      project: process.env.VUE_APP_TITLE
    }
  }
}
</script>