<template>
  <div class="box-controls">
    <div class="controlbtn" :class="{disabled: spinning}">
      <div class="controlbtn" @click="toggleSound">
        <i v-if="sound" class="material-icons">volume_up</i>
        <i v-else class="material-icons">volume_off</i>
      </div>
      <!-- <div class="controlbtn">
        <i class="material-icons">av_timer</i>
      </div>-->
      <div class="controlbtn" :class="{active: speed}" @click="toggleSpeed">
        <i class="material-icons">offline_bolt</i>
      </div>
    </div>
    <Button :class="{disabled: spinning}" v-if="spinning" text="OPENING..." type="important"/>
    <Button
      :class="{disabled: spinning}"
      v-else-if="remaining > 0"
      text="OPEN CASE"
      type="attention"
      @click.native="onClick"
    />
    <Button :class="{disabled: spinning}" v-else-if="remaining == 0" text="BUY MORE" type="primary" @click="showBuyModal"/>
    <Button :class="{disabled: spinning}" v-else text="PREPARING..." type="disabled"/>
    <div class="controlbtn" @click="stopSpin" :class="{disabled: !spinning}">
      Skip
      <i class="material-icons">skip_next</i>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "OpenCases",
  components: {
    Button
  },
  props: ["spinning", "remaining"],
  data() {
    return {
      sound: true,
      speed: false
    };
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
    toggleSound() {
      this.sound = !this.sound;
      this.$emit("sound", this.sound);
    },
    toggleSpeed() {
      this.speed = !this.speed;
      this.$emit("speed", this.speed);
    },
    stopSpin() {
      this.$emit("stop");
    },
    showBuyModal() {
      this.$emit("buyCases");
    }
  }
};
</script>

<style scoped>
.box-controls {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: var(--layout-label);
  user-select: none;
  /* max-width: 400px; */
}

.box-controls > div {
  margin-right: 10px;
}

.controlbtn {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
}

.active {
  color: var(--layout-yellow);
}

.disabled {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>


