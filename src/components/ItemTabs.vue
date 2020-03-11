<template>
  <div class="tabs is-fullwidth">
    <ul>
      <router-link v-if="description" :to="{ name: 'itemDescription' }" active-class="is-active" v-slot="{ href, route, navigate, isActive, isExactActive }">
        <li :class="[isExactActive && 'is-active']">
          <a :href="href" @click="navigate"><span class="icon"><i class="fad fa-align-justify"></i></span> Description</a>
        </li>
      </router-link>
      <router-link v-if="properties.length > 0" :to="{ name: 'itemProperties' }" active-class="is-active" v-slot="{ href, route, navigate, isActive, isExactActive }">
        <li :class="[isExactActive && 'is-active']">
          <a :href="href" @click="navigate"><span class="icon"><i class="fad fa-table"></i></span> Properties</a>
        </li>
      </router-link>
      <router-link v-if="images.length > 0 && pimage" :to="{ name: 'itemImages' }" active-class="is-active" v-slot="{ href, route, navigate, isActive, isExactActive }">
        <li :class="[isExactActive && 'is-active']">
          <a :href="href" @click="navigate"><span class="icon"><i class="fad fa-images"></i></span> Images</a>
        </li>
      </router-link>
      <router-link v-if="sources.length > 0" :to="{ name: 'itemSources' }" active-class="is-active" v-slot="{ href, route, navigate, isActive, isExactActive }">
        <li :class="[isExactActive && 'is-active']">
          <a :href="href" @click="navigate"><span class="icon"><i class="fad fa-asterisk"></i></span> Sources</a>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['description', 'properties', 'images', 'pimage', 'sources'],
  }
</script>