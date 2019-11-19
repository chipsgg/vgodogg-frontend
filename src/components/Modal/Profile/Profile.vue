<template>
  <div v-if="user" class="modal">
    <div class="close" @click="close">
      <i class="material-icons green">clear</i>
    </div>
    <div class="shade" v-show="loading">
      <scaling-squares-spinner :animation-duration="1250" :size="65" color="var(--layout-green)"/>
    </div>
    <div class="header">
      <div class="background">
        <img class="art" :src="backgroundURL">
      </div>
      <div class="sub-header">
        <img class="avatar" :src="user.avatar">
        <div class="details">
          <div class="detail-box">
            <div class="username">{{user.username}}</div>
          </div>
          <div v-show="!hideDetails" class="actions">
            <div class="detail-box action" @click="toggleContent">
              <i v-if="isContent('Settings')" class="material-icons action">contact_support</i>
              <i v-else class="material-icons action">settings</i>
            </div>
            <div class="detail-box action" @click="actions.logout">
              <i class="material-icons action">logout</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <Stats :userid="user.id" :actions="actions"/>
      <component
        v-show="!hideDetails"
        :is="content"
        :user="user"
        :actions="actions"
        :close="close"
        :setLoading="setLoading"
      />
    </div>
  </div>
</template>

<script>
import { ScalingSquaresSpinner } from "epic-spinners";
import Stats from "@/components/Modal/Profile/Stats.vue";

import Settings from "@/components/Modal/Profile/Content/Settings.vue";
import Support from "@/components/Modal/Profile/Content/Support.vue";

export default {
  name: "Profile",
  components: { ScalingSquaresSpinner, Stats, Settings, Support },
  props: ["user", "hideDetails", "actions"],
  data() {
    return {
      loading: false,
      content: "Settings"
    };
  },
  beforeMount() {
    if(!this.user) this.close()
  },
  computed: {
    backgroundURL() {
      return this.user.backgroundURL || 'https://media.giphy.com/media/2jMtN1BCK7gUIbzILm/giphy.gif'
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    toggleContent() {
      this.content = this.content === "Settings" ? "Support" : "Settings";
    },
    isContent(tab) {
      return this.content === tab;
    },
    setLoading(bool = true) {
      this.loading = bool;
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
  padding: 30px;
  width: 740px;
  position: relative;
  transform: translateZ(0);
}

.close {
  cursor: pointer;
  position: absolute;
  right: -30px;
  top: -30px;
  /* background: red; */
  /* width: 105%; */
  justify-content: flex-end;
  display: flex;
  /* flex-direction: column; */
}

.green {
  color: var(--layout-green);
}

.shade {
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  perspective: 500px;
  transform: translateZ(0);
  pointer-events: none;
}

.header {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 160px;
  /* background-color: red; */
}

.background {
  position: absolute;
  z-index: -1;
  width: 100%;
  overflow: hidden;
  height: 80%;
  /* box-shadow: inset 0 0 10px rgba(0, 0, 0, 1); */
}

.art {
  width: 100%;
}

.sub-header {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 90%;
  /* background: greenyellow; */
  align-items: flex-end;
}

.details {
  display: flex;
  width: 100%;
  height: 50%;
  margin-left: 20px;
  flex-direction: row;
  /* background: red; */
  justify-content: space-between;
}

.avatar {
  height: 125px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}

.username {
  color: var(--layout-label);
  font-size: 1.4em;
}

.actions {
  display: flex;
  flex-direction: row;
}

.actions > div {
  margin-right: 10px;
}

.action {
  color: var(--layout-label);
  cursor: pointer;
  /* align-self: flex-end; */
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

.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
}
</style>
