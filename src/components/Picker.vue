<template>
  <div class="level-item">
    <div class="field has-addons">
      <div class="control">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span class="icon is-small">
                <i class="fad fa-list-alt"></i>
              </span>
              <span>{{ title }}</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a
                v-for="choice in choices"
                :key="choice.id"
                href="#"
                class="dropdown-item"
                @click="pick(choice)"
              >{{ choice.nom }}</a>
            </div>
          </div>
        </div>
      </div>
      <p class="control" v-if="choice">
        <button @click="pick('')" class="button is-primary">
          {{ choice.nom }}&nbsp;
          <i class="fad fa-times-circle"></i>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import directus from "../mixins/Directus.vue";

export default {
  props: ["name"],
  mixins: [directus],
  data() {
    return {
      choices: [],
      choice: ""
    };
  },
  computed: {
    title: function() {
      return _.replace(this.name, "_", " ");
    }
  },
  async created() {
    this.fetchFilters(this.name);
  },
  methods: {
    pick: function(value) {
      this.choice = value;
      this.$emit("pick", this.name, this.choice);
    }
  }
};
</script>

<style scoped>
.dropdown-content {
  max-height: 50em;
  overflow: auto;
}
</style>