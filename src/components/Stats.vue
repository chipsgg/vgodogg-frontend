<template>
  <div class="topbar">
    <div class="stats">
      <div v-for="stat in stats" v-bind:key="stat.id" class="stat">
        <div class="label">{{stat.id.toUpperCase()}}</div>
        <div class="value">
          <div v-show="stat.money">$</div>
          <div>{{stat.value.toLocaleString('en')}}</div>
        </div>
      </div>
    </div>
    <div class="spacer"/>
    <div class="social">
      <a href="https://discord.gg/vvZrPPZ" target="_blank" class="link discord">DISCORD</a>
      <a href="https://twitter.com/VgoDogg" target="_blank" class="link twitter">TWITTER</a>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  .topbar {
    visibility: hidden;
    position: absolute;
  }
}

.topbar {
  display: flex;
  flex-direction: row;
  height: 45px;
  background-color: var(--layout-background);
}
.stats {
  display: flex;
  flex-direction: row;
}

.stat {
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 16px;
}

.label {
  white-space: nowrap;
  color: var(--layout-label);
}

.value {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 5px;
  color: var(--layout-label-text);
}

.spacer {
  flex: 1;
}

.social {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
}

.social,
a {
  text-decoration: none !important;
}

.social,
a:hover {
  opacity: 0.8;
}

.link {
  margin-left: 10px;
  margin-right: 10px;
}

.discord {
  color: var(--layout-discord);
}

.twitter {
  color: var(--layout-twitter);
}
</style>

<script>
export default {
  name: "Stats",
  props: ["state"],
  data() {
    return {
      stats: [
        // {
        //   id: "Daily Rewarded",
        //   value: 32304.23,
        //   money: true
        // },
        // {
        //   id: "Unboxed Today",
        //   value: 530
        // },
        {
          id: "Total Unboxed",
          value: this.state(["stats", "vcasesOpened"])
        },
        {
          id: "Total Rewarded",
          value: this.state(["stats", "vcasesTotalAwarded"]),
          money: true
        },
        {
          id: "Total Keys Deposited",
          value: this.state(["stats", "vcasesKeysDeposited"])
        }
      ]
    };
  },
  beforeMount() {
    this.state.on("stats", stats => {
      this.stats = [
        {
          id: "Total Unboxed",
          value: stats.vcasesOpened
        },
        {
          id: "Total Rewarded",
          value: stats.vcasesTotalAwarded,
          money: true
        },
        {
          id: "Total Keys Deposited",
          value: stats.vcasesKeysDeposited
        }
      ];
    });
  }
};
</script>