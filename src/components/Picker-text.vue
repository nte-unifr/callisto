<template>
  <div class="level-item">
    <div class="field has-addons">
      <div class="control">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span class="icon is-small">
                <i class="fad fa-text"></i>
              </span>
              <span>{{ name }}</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <input class="input" type="text" v-model="input" placeholder="Enter some text.." />
              </div>
              <hr class="dropdown-divider" />
              <div class="dropdown-item">
                <button @click="pick(true)" class="button is-small is-primary is-fullwidth">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="control" v-if="choice">
        <button @click="pick(false)" class="button is-primary">
          {{ choice }}&nbsp;
          <i class="fad fa-times-circle"></i>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      input: "",
      choice: ""
    };
  },
  methods: {
    pick: function(state) {
      if (state) {
        this.choice = this.input;
      } else {
        this.choice = this.input = "";
      }
      this.$emit("pick", this.name, this.choice);
    }
  }
};
</script>