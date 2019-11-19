<template>
  <div class="stats">
    <div v-for="stat in stats" v-bind:key="stat.id" :class="{'stat': true, 'profit': stat.profit}">
      <div class="value">
        <div v-show="stat.money">$</div>
        {{stat.value.toLocaleString('en')}}
      </div>
      <div class="label">{{stat.id}}</div>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5%;
  /* margin-bottom: 5%; */
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: var(--layout-offwhite);
  background: var(--layout-label);
  padding-left: 50px;
  padding-right: 50px;
  white-space: nowrap;
}

.value {
  padding: 5px;
  font-size: 1.6em;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.label {
  font-size: 1em;
}

.profit {
  background: var(--layout-red);
}
</style>

<script>
export default {
  name: "Stats",
  props: ["userid", "actions"],
  data() {
    return {
      stats: [
        {
          id: "Opened Cases",
          value: 0
        },
        {
          id: "Total Unboxed",
          value: 0.0,
          money: true
        },
        {
          id: "Total Profit",
          value: 0.0,
          money: true,
          profit: true
        }
      ]
    };
  },
  async beforeMount() {
    // TODO: fetch user stats
    const {
      vcasesOpened,
      vcasesTotalAwarded,
      vcasesKeysDeposited
    } = await this.actions.getUserStats({ userid: this.userid });
    this.stats = [
      {
        id: "Opened Cases",
        value: vcasesOpened || 0
      },
      {
        id: "Total Unboxed",
        value: vcasesTotalAwarded || 0,
        money: true
      },
      {
        id: "Total Profit",
        value: vcasesTotalAwarded - vcasesKeysDeposited * 2.5,
        money: true,
        profit: true
      }
    ];
  }
};
</script>