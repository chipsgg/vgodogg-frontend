<template>
  <div class="cases">
    <div class="tabs">
      <div v-for="tab in tabs" :key="tab" :class="{'tab':true, 'selected': selectedTab == tab}" @click="selectedTab = tab">{{tab}}</div>
    </div>
    <AvailableCases v-show="tabFilter('LOW RISK')" :listCases="listLowRisk" title='OFFICIAL "Low Risk" vIRL CASES'/>
    <AvailableCases v-show="tabFilter('ELECTRONICS')" :listCases="listElectronics" title='OFFICIAL "Electronics" vIRL CASES'/>
    <AvailableCases v-show="tabFilter('HYPEBEAST')" :listCases="listHypebeast" title='OFFICIAL "Hypebeast" vIRL CASES'/>
    <AvailableCases v-show="tabFilter('VIRL')" :listCases="listIRLCases" title="OFFICIAL vIRL CASES"/>
    <AvailableCases v-show="tabFilter('VGO')" :listCases="listVGOCases" title="OFFICIAL VGO CASES"/>
  </div>
</template>

<style scoped>
.cases {
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.tabs {
  display: flex;
  flex-direction: row;
  background-color: var(--layout-foreground);
  flex-wrap: wrap;
  justify-content: center;
}

.tab {
  padding: 15px;
  margin: 5px;
  border-radius: 5px;
}

.tab:hover {
  background-color: var(--layout-green);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.selected {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  background-color: var(--layout-green);
  border: 1px solid var(--layout-green-shadow);
}
</style>

<script>
import AvailableCases from "@/components/AvailableCases.vue";
import { sortBy } from "lodash";

export default {
  name: "home",
  props: ["state", "actions"],
  components: {
    AvailableCases
  },
  data() {
    return {
      available: [],
      selectedTab: 'ALL',
      tabs: ['ALL', 'VIRL', 'VGO', 'LOW RISK', 'ELECTRONICS', 'HYPEBEAST']
    };
  },
  async beforeMount() {
    let cases = await this.actions.listAvailableVCases();
    cases = cases.filter(box => box.remaining_opens > 0)
    this.available = sortBy(cases, "id").reverse();
  },
  methods: {
    tabFilter(tab) {
      return this.selectedTab == "ALL" || this.selectedTab == tab
    },
    listLowRisk() {
      return this.available.filter(box => {
        return !box.flags["VGO_CASE"] && 
        (
          box.name.includes("Low Risk") ||
          box.name.includes("10%") || 
          box.name.includes("15%")
        )
      });
    },
    listElectronics() {
      return this.available.filter(box => {
        return !box.flags["VGO_CASE"] && 
        (
          box.name.includes("Electronics") || 
          box.name.includes("Apple") ||
          box.name.includes("Budget") ||
          box.name.includes("Mix") ||
          box.name.includes("Gamer") 
        );      
      });
    },
    listHypebeast() {
      return this.available.filter(box => {
        return !box.flags["VGO_CASE"] && 
        (
          box.name.includes("Yeezy") || 
          box.name.includes("Hypebeast") || 
          box.name.includes("Mix") || 
          box.name.includes("Nike") || 
          box.name.includes("Adidas") ||
          box.name.includes("Budget")
        );
      });
    },
    listIRLCases() {
      return this.available.filter(box => {
        return (
          !box.flags["VGO_CASE"]
        );
      });
    },
    listVGOCases() {
      return this.available.filter(box => {
        return box.flags["VGO_CASE"];
      });
    }
  }
};
</script>
