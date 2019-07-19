<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="column is-6">
          <aside v-if="project" class="menu">
            <p class="menu-label">
              About {{ project }}
            </p>
            <span v-html="description"></span>
          </aside>
        </div>
        <div class="column is-3">
          <aside class="menu">
            <p class="menu-label">
              About EDDB
            </p>
            <span v-html="about"></span>
          </aside>
        </div>
        <div class="column is-3">
          <aside class="menu">  
            <p class="menu-label">
              EDDB databases
            </p>
            <ul class="menu-list">
              <li v-for="project of projects" :key="project.id">
                <a :href="project.url">{{ project.title }}</a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
      <hr>
      <p>© 2019 Centre NTE, Université de Fribourg</p>
    </div>
  </footer>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'bfooter',
    props: ['project', 'description'],
    data() {
      return {
        projects: [],
        about: ''
      }
    },
    created() {
      this.fetchProjects()
      this.fetchAbout()
    },
    methods: {
      fetchProjects() {
        const url = 'https://eddb.unifr.ch/api/_/items/projects?sort=title'
        axios.get(url).then(result => {
          this.projects = result.data.data
        })
      },
      fetchAbout() {
        const url = 'https://eddb.unifr.ch/api/_/items/about'
        axios.get(url).then(result => {
          this.about = result.data.data[0].content
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .footer, .menu { font-size: 0.9rem }
</style>