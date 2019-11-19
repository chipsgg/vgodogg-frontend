<template>
  <div :class="{item, selected: item.selected}">
    <img class="image" :src="item.image['300px']">
    <div class="name">{{item.name}}</div>
    <div class="description" :style="{backgroundColor: color}">${{price}}</div>
  </div>
</template>

<script>
export default {
  name: "OverviewItem",
  props: ["item"],
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
  justify-content: center;
  align-items: center;
  min-width: 200px;
  width: 200px;
  background-color: var(--layout-offwhite);
  padding: 10px;
  margin: 10px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
  /* height: 240px; */
}

.selected {
  outline: 4px solid var(--layout-yellow);
  box-shadow: 0px 10px 19px 0px rgba(0, 0, 0, 0.75);
  transform: scale(1.01);
}

.image {
  max-height: 50%;
  z-index: 1;
  position: absolute;
  /* opacity: 0.8; */
}

.name {
  z-index: 2;
  width: 100%;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  flex: 1;
}

.description {
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  padding: 10px;
  margin: 10px;
  /* color: black; */
}
</style>
