<template>
  <div>
    <nav class="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://www.unifr.ch">
          <img src="../assets/logo-unifr.png" width="28" height="28">
        </a>
        <a class="navbar-item" href="/">
          <h1><strong>{{ project }}</strong></h1>
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="main-menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="main-menu" class="navbar-menu">
        <div class="navbar-start">
          <p class="navbar-item is-italic">Iconography of Play and Games</p>
        </div>

        <div class="navbar-end">
          <a @click="toggleAbout(true)" class="navbar-item">
            About
          </a>
          <a class="navbar-item" href="#">
            <span href="#" class="icon is-medium">
              <i class="fad fa-angle-up fa-2x"></i>
            </span>
          </a>
        </div>
      </div>
    </nav>
    <NavbarAbout :about="about" :media="media" :active="activeAbout" @toggle="toggleAbout" />
  </div>
</template>

<script>
  import NavbarAbout from './NavbarAbout.vue'

  export default {
    components: {
      NavbarAbout
    },
    props: ['project', 'about', 'media'],
    data() {
      return {
        activeAbout: false,
      }
    },
    methods: {
      toggleAbout(state) {
        this.activeAbout = state
      }
    }
  }
</script>