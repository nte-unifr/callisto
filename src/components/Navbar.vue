<template>
  <nav class="navbar is-blue" role="navigation" aria-label="main navigation">
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
        <a class="navbar-item">
          Home
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    name: 'bnavbar',
    props: ['project']
  }
</script>