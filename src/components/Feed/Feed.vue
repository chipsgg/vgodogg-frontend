<template>
  <transition-group name="slideDown" tag="div" class="feed">
    <Entry v-for="box in openings" v-bind:key="box.id" :box="box"/>
  </transition-group>
</template>

<style scoped>
.feed {
  display: flex;
  flex-direction: row;
  background-color: var(--layout-background);
  min-height: 100px;
  /* height: 100px; */
  width: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
}

@media only screen and (max-width: 600px) {
  .feed {
    /* visibility: hidden; */
    /* position: absolute; */
    min-height: 50px;
    max-height: 50px;
  }
}
</style>

<script>
import Entry from "@/components/Feed/Entry.vue";

export default {
  name: "Feed",
  props: ["state"],
  components: {
    Entry
  },
  beforeMount() {
    this.openings = this.state("recentVCaseOpenings");
  },
  data() {
    return {
      openings: []
    };
  }
};
</script>