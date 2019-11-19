<template>
  <transition-group name="fade" tag="div" class="items">
    <OverviewItem v-for="item in sorted" v-bind:key="item.id" :item="item"/>
  </transition-group>
</template>

<script>
import OverviewItem from "@/components/OverviewItem.vue";
import {sortBy} from 'lodash'

export default {
  name: "Itemlist",
  components: { OverviewItem },
  props: ["items"],
  computed: {
    sorted() {
      return sortBy(this.items, 'suggested_price').reverse()
    }
  },
};
</script>


<style scoped>
.items {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
</style>