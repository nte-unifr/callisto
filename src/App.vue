<template>
  <div id="app">
    <Navbar :project="project" :about="about" :media="media" />
    <Set />
    <Footer :project="project" :aboutProject="about" />
  </div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'
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
        about: '',
        media: ''
      }
    },
    created() {
      this.fetchAbout()
    },
    methods: {
      fetchAbout() {
        axios.get(this.api + 'items/about?fields=content,media.*').then(result => {
          let data = result.data.data[0]
          this.about = data.content
          if (_.has(data, 'media.data.full_url')) { 
            this.media = data.media.data.full_url
          }
        })
      }
    }
  }
</script>