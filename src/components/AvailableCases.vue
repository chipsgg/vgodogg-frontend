<template>
  <div class="avail">
    <div class="type">{{title}}</div>
    <CaseContainer class="cases" :pose="showCases">
      <Case is="CaseCard" v-for="box in cases" v-bind:key="box.id" :box="box"/>
    </CaseContainer>
    <div v-if="loading" class="loader">
      <scaling-squares-spinner :animation-duration="1250" :size="65" color="var(--layout-green)"/>
    </div>
  </div>
</template>

<script>
import CaseCard from "@/components/CaseCard.vue";
import { ScalingSquaresSpinner } from "epic-spinners";
import posed from "vue-pose";

export default {
  name: "AvailableCases",
  props: ["listCases", "title"],
  components: {
    CaseCard,
    ScalingSquaresSpinner,
    CaseContainer: posed.div({
      visible: {
        y: 0,
        beforeChildren: true,
        staggerChildren: 100
      },
      hidden: {
        y: 100,
        afterChildren: true
      }
    }),
    Case: posed.div({
      visible: { opacity: 1, x: 0 },
      hidden: { opacity: 0, x: 100 }
    })
  },
  computed: {
    loading() {
      return this.cases.length === 0;
    },
    showCases() {
      return !this.loading ? "visible" : "hidden";
    },
    cases() {
      return this.listCases();
    }
  }
};
</script>

<style scoped>
.loader {
  align-items: center;
  display: flex;
  justify-content: center;
  /* height: 100%; */
}
.avail {
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* height: 100%; */
}

.type {
  color: var(--layout-green);
  padding: 20px;
  font-size: 18px;
}

.cases {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>

