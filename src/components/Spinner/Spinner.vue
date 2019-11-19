<template>
  <div class="spinner" v-resize.initial="onResize">
    <div class="tick"/>
    <div class="spinneritems">
      <SpinnerItem v-for="(item, i) in spinnerContent" v-bind:key="i" :item="item"/>
    </div>
  </div>
</template>

<script>
import SpinnerItem from "@/components/SpinnerItem.vue";
import { shuffle, debounce, sample, clone, random } from "lodash";
import resize from "vue-resize-directive";
import Animation from "@/components/Spinner/animation";

export default {
  name: "Spinner",
  components: { SpinnerItem },
  props: ["items", "winningItem", "sound", "speed"],
  directives: {
    resize
  },
  data() {
    return {
      spinnerContent: [],
      width: 0
    };
  },
  methods: {
    onResize(el) {
      this.width = el.offsetWidth;
    },
    sampleItems() {
      const items = clone(this.items);
      const size = 500;
      let count = 0;
      const sampleSet = [];

      while (count < size) {
        ++count;
        const item = sample(items);
        sampleSet.push(item);
      }

      return sampleSet;
    }
  },
  mounted() {
    this.spinnerContent = this.sampleItems();

    // const duration = 5;
    const winningIndex = 100;

    // place the item in the array
    let winner = clone(this.winningItem);
    this.spinnerContent.splice(winningIndex, 1, winner);

    Animation.roll(
      {
        target: ".spinneritems",
        sound: this.sound,
        duration: this.speed ? 1 : 5,
        winningIndex,
        width: this.width
      },
      () => {
        this.winningItem.selected = true;
        this.spinnerContent.splice(winningIndex, 1, this.winningItem);

        setTimeout(() => {
          this.$emit("done");
        }, 1000);
      }
    );
  },
  destroyed() {
    Animation.kill();
  }
};
</script>


<style scoped>
.spinner {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* overflow-x: scroll; */
  position: relative;
}

.spinneritems {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.tick {
  background-color: red;
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 4px;
  top: 0px;
  bottom: 0px;
  z-index: 999999999999;
}
</style>
