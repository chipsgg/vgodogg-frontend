<template>
  <div class="entry" @mouseenter="showUser = true" @mouseleave="showUser = false">
    <img v-if="!showUser" class="item-image" :src="box.item.image['300px']">
    <img v-else class="item-image" :src="box.user.avatar">
    <div v-if="!showUser" class="name">{{box.item.name}}</div>
    <div v-else class="name">{{box.user.username}}</div>
    <div v-if="!showUser" class="price">${{price}}</div>
    <div v-else class="price">CaseID: {{box.caseid}}</div>
  </div>
</template>

<style scoped>
.entry {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  min-width: 200px;
  width: 200px;
  background-color: var(--layout-foreground);
  border-radius: 5px;
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.item-image {
  width: 100%;
  z-index: 1;
  position: absolute;
  opacity: 0.2;
  /* filter: drop-shadow(0 5px 2px rgba(0, 0, 0, 0.5)) saturate(123%) contrast(110%); */
}

.name {
  z-index: 2;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.price {
  z-index: 2;
  padding-top: 5px;
}
</style>

<script>
import posed from "vue-pose";

export default {
  name: "Entry",
  props: ["box"],
  data() {
    return {
      showUser: false
    };
  },
  components: {
    // Item: posed.div({
    //   hoverable: true,
    //   init: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
    //   hover: {
    //     scale: 1.2,
    //     boxShadow: "0px 5px 10px rgba(0,0,0,0.2)"
    //   }
    // })
  },
  mounted() {
    // console.log(this.box);
  },
  computed: {
    price() {
      return (this.box.item.suggested_price / 100)
        .toFixed(2)
        .toLocaleString("en");
    }
  }
};
</script>