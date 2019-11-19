<template>
  <div class="navigation">
    <Modal v-show="showModal" type="Profile" :props="{actions, user}" @close="closeModal"/>
    <img class="logo" src="@/assets/logo.png" @click="toHome">
    <div class="desktopnav">
      <div class="links">
        <router-link
          v-for="link in links"
          v-bind:key="link.id"
          tag="div"
          class="link"
          :to="link.path"
          active-class="link-selected"
        >
          <i class="material-icons">face</i>
          {{link.id}}
        </router-link>
      </div>
      <div v-if="userState" class="userlinks">
        <div class="userlinks-left">
          <div class="keycount">
            <i class="material-icons keyicon">vpn_key</i>
            {{totalKeys.toLocaleString("en")}} KEYS
          </div>
        </div>
        <div class="userlinks-right">
          <div class="userinfo" @click="openModal">
            <div class="username">
              <div class="username">{{user.username}}</div>
              <div class="userlevel">Level: {{user.level || 0}}</div>
            </div>
            <img class="avatar" :src="user.avatar">
            <i class="material-icons settingsicon">arrow_drop_down</i>
          </div>
        </div>
      </div>
      <div v-else class="userlinks">
        <Button
          text="Login via OPSkins"
          type="primary"
          icon="how_to_reg"
          @click="actions.loginOpskins"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal/Modal.vue";
import Button from "@/components/Button.vue";
export default {
  name: "Nav",
  components: { Button, Modal },
  props: ["userState", "actions", "authenticated"],
  async beforeMount() {
    if (!this.authenticated) return;
    this.user = this.userState("me");
    this.totalKeys = await this.actions.getMyVCaseKeyCount();
    setInterval(async () => {
      this.totalKeys = await this.actions.getMyVCaseKeyCount();
    }, 5000);
  },
  methods: {
    toHome() {
      this.$router.push(`/`);
    },
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    }
  },
  data() {
    return {
      user: {},
      showModal: false,
      totalKeys: 0,
      links: [
        // {
        //   id: "CASES",
        //   path: "/",
        //   icon: null
        // },
        // {
        //   id: "LEADERBOARDS",
        //   path: "/leaderboards",
        //   icon: null
        // }
        // {
        //   id: "INVENTORY",
        //   path: "/inventory",
        //   icon: null
        // },
      ]
    };
  }
};
</script>

<style scoped>
.navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: var(--layout-foreground);
}

.logo {
  max-height: 41px;
  padding: 20px;
  cursor: pointer;
}

.desktopnav {
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.links {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  color: var(--layout-label);
}

.material-icons {
  padding: 10px;
}

.icon-selected {
  color: var(--layout-green);
}

.link {
  display: flex;
  align-items: center;
  /* padding: 20px; */
}

.link-selected {
  color: white;
}

.link:hover {
  cursor: pointer;
  color: var(--layout-green);
}

.userlinks {
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.userlinks-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.keycount {
  display: flex;
  align-items: center;
  background-color: var(--layout-background);
  padding-right: 10px;
  border-radius: 5px;
  white-space: nowrap;
}

.keyicon {
  font-size: 1.2em;
  color: var(--layout-label);
}

.userlinks-right {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}

.userinfo {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.username {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
  margin-right: 14px;
  font-size: 1.1em;
}

.userlevel {
  color: var(--layout-green);
  font-size: 0.8em;
}

.avatar {
  border: 1px solid var(--layout-green);
  max-width: 40px;
  /* border-radius: 4px; */
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}

.settingsicon {
  font-size: 1.3em;
  color: var(--layout-label);
  padding: 5px;
}

.loginbtn {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  white-space: nowrap;
  font-size: 1.1em;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  user-select: none;
}

@media only screen and (max-width: 600px) {
  .logo {
    visibility: hidden;
    position: absolute;
  }
  .navigation {
    height: 160px;
    padding: 0;
    margin: 0;
  }
  .links {
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
  }
  .desktopnav {
    padding: 0;
    margin: 0;
    flex-direction: column;
  }
}
</style>
