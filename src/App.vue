<template>
  <div id="app">
    <Navbar :project="project" />
    <Set />
    <Footer :project="project" :aboutProject="about" />
  </div>
</template>

<script>
  import axios from 'axios'
  import Navbar from './components/Navbar.vue'
  import Set from './components/Set.vue'
  import Footer from './components/Footer.vue'

  export default {
    name: 'app',
    components: {
      Navbar,
      Set,
      Footer
    },
    data() {
      return {
        api: process.env.VUE_APP_API,
        project: process.env.VUE_APP_TITLE,
        about: ''
      }
    },
    created() {
      this.fetchAbout()
    },
    methods: {
      fetchAbout() {
        axios.get(this.api + 'items/about').then(result => {
          this.about = result.data.data[0].content
        })
      }
    }
  }
</script>