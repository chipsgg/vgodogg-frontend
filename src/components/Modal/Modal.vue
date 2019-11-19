<template>
  <PoseTransition>
    <Shade class="container">
        <Modal :is="type" v-bind="props" @close="close"/>
    </Shade>
    <!-- <div class="container" v-on:click.self="close">
      <component :is="type" v-bind="props" @close="close"/>
    </div>-->
  </PoseTransition>
</template>

<style scoped>
.container {
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  perspective: 500px;
  transform: translateZ(0);
  /* pointer-events: none; */
}

</style>


<script>
import KeyDeposit from "@/components/Modal/KeyDeposit.vue";
import WinningItem from "@/components/Modal/WinningItem.vue";
import Profile from "@/components/Modal/Profile/Profile.vue";

import posed, { PoseTransition } from "vue-pose";

export default {
  name: "Modal",
  props: ["type", "props"],
  components: {
    KeyDeposit,
    WinningItem,
    Profile,
    PoseTransition,
    Shade: posed.div({
      enter: {
        opacity: 1,
        beforeChildren: true,
        transition: { duration: 200, ease: "linear" }
      },
      exit: {
        opacity: 0,
        afterChildren: true,
        transition: { duration: 200, ease: "linear" }
      }
    }),
    Modal: posed.div({
      enter: { opacity: 1, z: 0 },
      exit: { opacity: 0, z: -150 }
    })
  },
  mounted() {
    // this.type = "KeyDeposit";
  },
  methods: {
    isType(type) {
      return this.type === type;
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>