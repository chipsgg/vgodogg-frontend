<template>
  <div class="item" @mouseenter="toggleOdds" @mouseleave="toggleOdds" >
    <div class="name">{{item.name}}</div>
    <div class="image">
      <img :src="item.image['300px']">
    </div>
    <div class="description" :style="{backgroundColor: color}">${{price}}</div>
    <div v-if="showOdds" class="odds">{{item.odds.relative_percent}}%</div>
  </div>
</template>

<script>
export default {
  name: "OverviewItem",
  props: ["item"],
  data(){
    return {
      showOdds: false
    }
  },
  methods: {
    toggleOdds() {
      if(!this.item.odds) return
      this.showOdds = !this.showOdds
    }
  },
  computed: {
    color() {
      const hasHash = this.item.color.includes("#");
      return hasHash ? this.item.color : "#" + this.item.color;
    },
    price() {
      return (this.item.suggested_price / 100).toFixed(2).toLocaleString("en");
    }
  }
};
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background-color: var(--layout-offwhite);
  max-width: 220px;
  overflow: hidden;
  padding: 20px;
  margin: 20px;
  position: relative;
  transition: all 1.2s ease;
}

.name {
  width: 100%;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.image {
  /* height: 100%; */
  width: 100%;
}

.image img {
  width: 100%;
  height: 100%;
}

.description {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  padding: 10px;
  margin: 10px;
  /* color: black; */
}

.odds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
}
/* 
.selected {
  outline: 4px solid var(--layout-yellow);
  box-shadow: 0px 10px 19px 0px rgba(0, 0, 0, 0.75);
} */
</style>
