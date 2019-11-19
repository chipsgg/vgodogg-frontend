<template>
  <Container
    :class="['button', type || 'primary', icon ? 'withicon' : null]"
    @click.native="clicked"
  >
    <div class="label">{{ text }}</div>
    <i v-if="icon" class="material-icons icon green">{{ icon }}</i>
  </Container>
</template>

<script>
import posed from "vue-pose";

export default {
  name: "Button",
  components: {
    Container: posed.div({
      hoverable: true,
      pressable: true,
      init: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
      hover: { scale: 1.03, boxShadow: "0px 5px 10px rgba(0,0,0,0.2)" },
      press: { scale: 1.01, boxShadow: "0px 2px 3px rgba(0,0,0,0.1)" }
    })
  },
  props: ["text", "icon", "type"],
  methods: {
    clicked() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  white-space: nowrap;
  font-size: 1.1em;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  user-select: none;
  justify-content: center;
  color: white;
}

.withicon {
  justify-content: space-between;
}

.primary {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  background-color: var(--layout-green);
  border: 1px solid var(--layout-green-shadow);
}

.icon {
  display: flex;
  justify-content: flex-end;
}

.disabled {
  /* padding: 15px; */
  color: black;
  background-color: white;
  cursor: not-allowed;
  justify-content: center;
}

.important {
  background-color: var(--layout-red);
  justify-content: center;
}

.attention {
  background-color: var(--layout-yellow);
  justify-content: center;
  color: black;
}
</style>
