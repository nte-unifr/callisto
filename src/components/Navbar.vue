<template>
  <div>
    <nav class="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="../assets/callisto-logo.png" width="112" height="28" />
        </a>
        <router-link to="/about" class="navbar-burger burger">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </router-link>
      </div>

      <div id="main-menu" class="navbar-menu">
        <div class="navbar-start is-hidden-touch">
          <p class="navbar-item">Iconography of Play and Games</p>
        </div>

        <div class="navbar-end">
          <router-link to="/about" class="navbar-item">About</router-link>
          <a class="navbar-item" href="#">
            <span href="#" class="icon is-medium">
              <i class="fad fa-angle-up fa-2x"></i>
            </span>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>