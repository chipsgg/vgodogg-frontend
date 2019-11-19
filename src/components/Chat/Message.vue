<template>
  <div class="msg" @click="click">
    <div class="avatar">
      <img :src="avatar">
    </div>
    <div class="content">
      <div class="username">{{username}}</div>
      <div class="msg-content">{{text}}</div>
    </div>
  </div>
</template>

<style scoped>
.msg {
  display: flex;
  flex-direction: row;
  min-height: 50px;
  padding: 10px;
}

.msg:hover {
  background-color: var(--layout-foreground);
  cursor: pointer;
}

.avatar {
  height: 50px;
  box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
}

.avatar img {
  /* border-radius: 4px; */
  height: 100%;
}

.content {
  padding-left: 10px;
}

.username {
  text-overflow: ellipsis;
}

.msg-content {
  /* word-break: break-all; */
  font-family: "CircularStd";
  font-size: 14px;
  color: var(--layout-label);
}
</style>

<script>
export default {
  name: "Message",
  props: ["username", "text", "avatar"],
  methods: {
    click() {
      console.log('clicked')
      this.$emit('click')
    }
  }
};
</script>