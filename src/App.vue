<template>
  <div id="app">
    <Navbar :project="project" />
    <Footer :project="project" :description="description" />
  </div>
</template>

<script>
  import axios from 'axios'
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'

  export default {
    name: 'app',
    components: {
      Navbar,
      Footer
    },
    data() {
      return {
        slug: 'callisto',
        project: '',
        description: ''
      }
    },
    created() {
      this.fetchProject()
    },
    methods: {
      fetchProject() {
        const url = 'https://eddb.unifr.ch/api/' + this.slug + '/'
        axios.get(url).then(result => {
          this.project = result.data.data.api.project_name
        })
        axios.get(url + 'items/about').then(result => {
          this.description = result.data.data[0].content
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import './variables.scss';
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>
