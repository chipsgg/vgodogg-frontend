<template>
  <div class="modal">
    <div class="header">
      <img class="image" :src="box.image['300px']">
    </div>
    <div class="content">
      <div class="details">
        <div class="name">You've received a new item!</div>
        <div class="description">{{item.name}}</div>
      </div>

      <img class="itemImage" :src="item.image['300px']">

      <div class="input">${{price}}</div>
      <div class="button primary" @click="close">
        <div class="button-label">DISMISS</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CaseBase",
  props: ["box", "actions", "item"],
  computed: {
    price() {
      return (this.item.suggested_price / 100).toFixed(2).toLocaleString("en");
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  background: var(--layout-offwhite);
  box-shadow: 0 0 25px black;
  padding: 20px;
  width: 300px;
  position: relative;
  transform: translateZ(0);
}

.header {
  display: flex;
  justify-content: center;
  position: relative;
}

.image {
  z-index: 9999;
  height: 240px;
  display: flex;
  align-self: center;
  position: absolute;
  top: -170px;
}

.itemImage {
  /* height: 100%; */
  width: 80%;
}

.itemImage img {
  width: 100%;
  height: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  /* height: 280px; */
  width: 100%;
  margin-top: 50px;
}

.content > div {
  margin: 10px;
}

.details {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.details > div {
  margin: 5px;
}

.name {
  font-size: 1.2em;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.description {
  font-size: 1em;
  color: var(--layout-label);
}

.input {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80%;
  /* padding: 10px; */
  height: 60px;
  background-color: var(--layout-white);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
  color: var(--layout-label);
  font-size: 1.3em;
}

.button {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* width: 220px; */
  width: 80%;
  white-space: nowrap;
  font-size: 1.1em;
}

.primary {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  background-color: var(--layout-green);
  border: 1px solid var(--layout-green-shadow);
}

.button-label {
  padding: 15px;
  /* width: 65%; */
  display: flex;
  align-self: center;
}

.button-icon {
  display: flex;
  align-self: center;
}
</style>
