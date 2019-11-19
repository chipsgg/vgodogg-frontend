<template>
  <div class="content">
    <div class="props">
      <div class="detail-box prop">
        <div class="label">Profile Background URL</div>
        <input
          type="text"
          v-model="user.backgroundURL"
          placeholder="https://media.giphy.com/media/2jMtN1BCK7gUIbzILm/giphy.gif"
        >
      </div>
      <div class="detail-box prop">
        <div class="label">OPSkins Trade URL</div>
        <input
          type="text"
          v-model="user.expresstradeurl"
          placeholder="https://trade.opskins.com/t/..."
        >
      </div>
    </div>
    <div class="footer">
      <Button @click="updateSettings" text="UPDATE SETTINGS" icon="fingerprint"/>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: flex-end;
  width: 100%;
  margin-top: 5%;
}

.detail-box {
  display: flex;
  align-items: center;
  padding: 20px;
  background: var(--layout-white);
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  /* border-radius: 4px; */
}

.props {
  display: flex;
  flex-direction: column;
}

.props > div {
  margin-bottom: 20px;
}

.prop {
  display: flex;
  justify-content: space-between;
}

input {
  height: 45px;
  width: 360px;
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  font-size: 1em;
  box-shadow: none;
  padding: 0 0 0 10px;
  margin: 0 10px;
  color: var(--layout-label);
}

input::placeholder {
  color: rgba(0, 0, 0, 0.2);
}

.footer {
  display: flex;
  justify-content: flex-end;
}

.updatebtn {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: var(--layout-green);
}
</style>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "Settings",
  components: { Button },
  props: ["user", "actions", "close", "setLoading"],
  data() {
    return {};
  },
  methods: {
    updateSettings() {
      this.setLoading();

      return Promise.all([
        this.actions.setMyProfileBackgroundURL({
          backgroundURL: this.user.backgroundURL || 'https://media.giphy.com/media/2jMtN1BCK7gUIbzILm/giphy.gif'
        }),
        this.actions.setMyExpressTradeUrl({
          expresstradeurl: this.user.expresstradeurl
        })
      ])
        .then(() => {
          this.$noty.success("Your settings have been updated!");
          this.setLoading(false);
          this.close();
        })
        .catch(this.$noty.error);
    }
  }
};
</script>