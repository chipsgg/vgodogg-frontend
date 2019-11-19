<template>
  <div class="input">
    <input
      v-if="!error"
      type="text"
      placeholder="SAY SOMETHING..."
      v-model="message"
      @keyup.enter="send"
    >
    <div v-else class="error">{{this.message}}</div>
    <div class="send" @click="send">
      <i class="material-icons green">send</i>
    </div>
  </div>
</template>

<style scoped>
.input {
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 65px;
  background-color: var(--layout-foreground);
  border-radius: 5px;
}

input {
  display: flex;
  align-self: center;
  padding: 10px;
  width: 100%;
  height: 100%;
  background: none;
  outline: none;
  box-shadow: none;
  border: none;
  color: var(--layout-label);
  font-size: 1em;
}

.send {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px;
  cursor: pointer;
}

.green {
  color: var(--layout-green);
}

.error {
  padding: 10px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* border: 1px solid rgba(255, 0, 0, 0.5); */
  color: red;
  width: 100%;
  height: 100%;
  font-size: 1em;
}
</style>

<script>
export default {
  name: "Input",
  props: ["actions"],
  data() {
    return {
      message: "",
      error: false
    };
  },
  methods: {
    send() {
      return this.actions
        .chat({ roomid: "en", message: this.message })
        .then(result => {
          this.message = "";
        })
        .catch(err => {
          this.message = '';
          this.$noty.error(err)
        });
    }
  }
};
</script>