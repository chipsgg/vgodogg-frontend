<template>
  <div v-if="!loading" class="overview">
    <Modal v-show="showModal" type="KeyDeposit" :props="{box, actions}" @close="closeModal"/>
    <OverviewCase
      :authenticated="authenticated"
      :box="box"
      :actions="actions"
      :openModal="openModal"
      :userState="userState"
    />
    <Itemlist id="itemlist" :items="items"/>
  </div>
  <div v-else class="loader">
    <scaling-squares-spinner :animation-duration="1250" :size="65" color="var(--layout-green)"/>
  </div>
</template>

<script>
import Modal from "@/components/Modal/Modal.vue";
import OverviewCase from "@/components/OverviewCase.vue";
import OverviewItem from "@/components/OverviewItem.vue";
import { sortBy, uniqBy } from "lodash";
import { ScalingSquaresSpinner } from "epic-spinners";
import Itemlist from "@/components/Itemlist.vue";
import posed, { PoseTransition } from "vue-pose";

export default {
  name: "CaseOverview",
  props: ["actions", "authenticated", "userState"],
  components: {
    Modal,
    OverviewCase,
    OverviewItem,
    ScalingSquaresSpinner,
    Itemlist
  },
  data() {
    return {
      box: null,
      showModal: false,
      odds: null,
      page: 1,
      totalPages: 1,
      stopAsync: false,
      loading: true
    };
  },
  computed: {
    items() {
      return this.box.items.map(item => {
        if (this.odds) {
          item.odds = this.odds.odds.find(stat => {
            return stat.sku === parseInt(item.sku);
          });
        }
        return item;
      });
    }
  },
  async beforeMount() {
    const caseid = this.$route.params.caseid;

    const [box, items] = await Promise.all([
      this.actions.getVCase({ caseid }),
      this.getBoxContents(caseid)
    ]);
    console.log(items);
    this.box = { ...box, items };

    const [odds] = await this.actions.listVCaseOdds({ cases: [caseid] });
    this.odds = odds;
    this.loading = false;
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
    async getBoxContents(caseid) {
      var {
        currentPage,
        totalPages,
        data
      } = await this.actions.getVCaseContents({ caseid, page: 1 });
      
      if (totalPages > 1) {
        totalPages = [...Array(totalPages).keys()];
        const pages = await Promise.all(
          totalPages.map(page => {
            return this.actions.getVCaseContents({ caseid, page: page + 1 });
          })
        );
        return pages.reduce((memo, { data }) => {
          return [...memo, ...data];
        }, []);
      }

      return data
    }
  },
  beforeDestroy() {
    this.stopAsync = true;
  }
};
</script>


<style scoped>
.overview {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  /* height: 100%; */
}

/* sequential-entrance items */
.items > span {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.loader {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
}
</style>