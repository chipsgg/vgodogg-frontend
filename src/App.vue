<template>
  <div id="app">
    <Stats v-bind="chipsgg"/>
    <Nav v-bind="chipsgg"/>
    <div class="container">
      <div class="view">
        <Feed :state="chipsgg.state"/>
        <!-- <transition name="slideDown"> -->
        <router-view v-bind="chipsgg"/>
        <!-- </transition> -->
      </div>
      <Chat v-bind="chipsgg"/>
    </div>
  </div>
</template>

<script>
import Stats from "@/components/Stats.vue";
import Nav from "@/components/Nav.vue";
import Feed from "@/components/Feed/Feed.vue";
import Chat from "@/components/Chat/Chat.vue";
import "circular-std";
import "vue2-animate/dist/vue2-animate.min.css";
import "vuejs-noty/dist/vuejs-noty.css";

export default {
  name: "app",
  props: ["chipsgg"],
  components: {
    Stats,
    Nav,
    Feed,
    Chat
  },
  mounted() {
    if (!this.chipsgg.authenticated) return;
    this.chipsgg.userState.set('pendingCases', {})
    this.chipsgg.userState.on("commands", async (commands, cmd, key) => {
      switch (cmd.type) {
        case "vcaseRequestOpen":
          if (!cmd.done) return;
          if (cmd.reject) this.$noty.error(cmd.reject.message);
          else {
            this.$noty.success(
              cmd.resolve.message || `${cmd.type}: command completed`
            );

            // update local cache
            const pendingCases = await this.chipsgg.actions.listMyPendingVCasesByCaseid({
              caseid: cmd.caseid
            });
            this.chipsgg.userState.set(["pendingCases", cmd.caseid], pendingCases)
          }
          return;
        default:
          if (!cmd.done) return;
          console.log(cmd);
      }
    });
  }
};
</script>

<style>
@font-face {
  font-family: TTMussels;
  src: url("./assets/font/TTMussels-DemiBold.ttf") format("truetype");
}

* {
  /* box-sizing: border-box; */
  margin: 0;
  padding: 0;
  font-family: "TTMussels", "CircularStd";
  letter-spacing: 0.02em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  --layout-background: #141a1d;
  --layout-foreground: #171d21;
  --layout-green: #9bd03e;
  --layout-green-shadow: #7ea834;
  --layout-red: #d03e3e;
  --layout-yellow: #ffd700;
  --layout-label: #55646e;
  --layout-label-text: #9ba9b2;
  --layout-white: #ffffff;
  --layout-offwhite: #f0f0f0;
  --layout-twitter: #38a1f3;
  --layout-discord: #7289da;
}

::-webkit-scrollbar {
  width: 5px;
  height: 0px; /* causes wierd bug */
}

::-webkit-scrollbar-thumb {
  background: var(--layout-label);
}

#app {
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  position: relative;
  color: white;
  overflow: hidden;
}

#app::before {
  content: "";
  background-color: var(--layout-foreground);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}

#app::after {
  content: "";
  background: url("./assets/bg.png");
  background-size: cover;
  /* background-position: center; */
  opacity: 0.1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}

.container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.view {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>