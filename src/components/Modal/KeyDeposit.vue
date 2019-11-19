<template>
  <div class="modal">
    <div class="close" @click="close">
      <i class="material-icons green">clear</i>
    </div>
    <img class="image" :src="box.image['300px']">
    <div class="content">
      <div class="details">
        <div class="name">{{box.name}}</div>
        <div class="description">
          Costs
          <u>{{totalCost}} Key(s)</u>
        </div>
      </div>
      <div class="input">
        <i @click="subtract" class="material-icons green">remove</i>
        <input type="number" v-model="amount" :max="max" :min="min">
        <i @click="add" class="material-icons green">add</i>
      </div>
      <div class="button primary" @click="requestCases">
        <div v-if="!loading" class="button-label">PURCHASE CASE</div>
        <div v-else class="button-label">Requesting...</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KeyDeposit",
  props: ["box", "actions"],
  data() {
    return {
      loading: false,
      amount: 1,
      max: 100,
      min: 1
    };
  },
  computed: {
    totalCost() {
      return this.box.key_amount_per_case * this.amount;
    }
  },
  watch: {
    amount() {
      this.amount = parseInt(this.amount);
    }
  },
  methods: {
    add() {
      if (this.amount >= this.max) this.amount = this.max;
      else this.amount += 1;
    },
    subtract() {
      if (this.amount <= this.min) this.amount = this.min;
      else this.amount -= 1;
    },
    async requestCases() {
      this.loading = true;
      const request = await this.actions
        .requestVCaseOpening({
          caseid: this.box.id.toString(),
          amount: this.amount
        })
        .catch(err => {
          this.loading = false;
          this.close();
          this.$noty.error(err);
        });
      this.$noty.success("Your request has been submitted!");
      this.loading = false;
      this.close();
    },
    close() {
      this.$emit("close")
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
  width: 240px;
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

.image {
  z-index: 9999;
  height: 50%;
  display: flex;
  align-self: center;
  position: absolute;
  top: -95px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 280px;
  width: 100%;
}

.content > div {
  margin: 10px;
}

.details {
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
  justify-content: space-between;
  width: 80%;
  padding: 10px;
  height: 60px;
  background-color: var(--layout-white);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
}

input {
  display: flex;
  align-self: center;
  justify-content: center;
  /* width: 100%; */
  /* height: 100%; */
  background: none;
  outline: none;
  box-shadow: none;
  border: none;
  color: var(--layout-label);
  font-size: 1.4em;
  text-align: center;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
  padding: 0;
}

.input .material-icons {
  cursor: pointer;
  color: var(--layout-label);
  user-select: none;
}

.button {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 220px;
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
