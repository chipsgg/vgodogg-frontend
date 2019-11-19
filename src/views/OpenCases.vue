<template>
  <div v-if="box" class="opencase">
    <div class="box-info">
      <div class="name">{{box.name}}</div>
      <div
        class="description"
      >Unboxed {{`${this.items.length}/${pending.length}`}} Cases (${{totalValueUnboxed}})</div>
    </div>

    <div class="stage">
      <div class="backdrop" :style="{opacity: spinning ? '0.5' : '1'}">
        <div class="image">
          <img :src="image">
        </div>
      </div>
      <PoseTransition appear v-if="spinning">
        <Stage class="stage">
          <Spinner
            :items="box.items"
            :winningItem="currentCase.item"
            @done="endSpin"
            :sound="sound"
            :speed="speed"
          />
        </Stage>
      </PoseTransition>
    </div>

    <SpinnerControls
      :spinning="spinning"
      :remaining="remaining"
      @click="startSpin"
      @sound="setSound"
      @stop="endSpin"
      @speed="setSpeed"
      @buyCases="showBuyModal = true"
    />
    <Itemlist :flex="true" :items="items"/>
    <Modal
      v-if="showModal"
      type="WinningItem"
      :props="{box, actions, item: currentCase.item}"
      @close="showModal = false"
    />
    <Modal
      v-show="showBuyModal"
      type="KeyDeposit"
      :props="{box, actions}"
      @close="showBuyModal = false"
    />
  </div>
  <div v-else class="loader">
    <scaling-squares-spinner :animation-duration="1250" :size="65" color="var(--layout-green)"/>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { ScalingSquaresSpinner } from "epic-spinners";
import Spinner from "@/components/Spinner/Spinner.vue";
import Itemlist from "@/components/Itemlist.vue";
import SpinnerControls from "@/components/Spinner/SpinnerControls.vue";
import posed, { PoseTransition } from "vue-pose";
import Modal from "@/components/Modal/Modal.vue";
import { sumBy, concat, uniqBy } from "lodash";

export default {
  name: "OpenCases",
  components: {
    Modal,
    Spinner,
    Button,
    ScalingSquaresSpinner,
    Itemlist,
    SpinnerControls,
    PoseTransition,
    Stage: posed.div({
      enter: {
        opacity: 1,
        beforeChildren: true,
        transition: { duration: 200, ease: "linear" }
      },
      exit: {
        opacity: 0,
        afterChildren: true,
        transition: { duration: 200, ease: "linear" }
      }
    })
  },
  props: ["authenticated", "actions", "userState"],
  computed: {
    image() {
      if (!this.box.image) return;
      return this.box.image["600px"];
    },
    remaining() {
      return this.pending.length - this.items.length;
    },
    totalValueUnboxed() {
      if (this.items.length === 0) return 0;
      return (sumBy(this.items, "suggested_price") / 100).toLocaleString("en");
    }
  },
  data() {
    return {
      caseid: this.$route.params.caseid,
      spinning: false,
      box: null,
      pending: [],
      items: [],
      currentCase: null,
      sound: true,
      speed: false,
      showModal: false,
      showBuyModal: false
    };
  },
  methods: {
    toHome() {
      this.$router.push(`/`);
    },
    setSound(sound) {
      this.sound = sound;
    },
    setSpeed(speed) {
      this.speed = speed;
    },
    startSpin() {
      this.currentCase = this.pending[this.items.length];
      this.spinning = true;
    },
    async endSpin() {
      var { currentCase } = this;
      this.items.push(currentCase.item);
      this.actions
        .setMyCaseOpened({
          caseid: currentCase.id
        })
        .catch(console.error);
      const price = currentCase.item.suggested_price / 100;
      if (price > 25) {
        this.showModal = true;
      }
      this.spinning = false;
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

      return data;
    }
  },
  async beforeMount() {
    const [box, items] = await Promise.all([
      this.actions.getVCase({
        caseid: this.caseid
      }),
      this.getBoxContents(this.caseid)
    ]);
    this.box = { ...box, items };

    if (!this.authenticated) {
      this.$noty.error("You need to be authenticated to open cases!");
      this.$router.push(`/cases/${this.box.id}`);
    }
    this.pending = await this.actions.listMyPendingVCasesByCaseid({
      caseid: this.caseid
    });
    // if (this.pending < 1) this.toHome();
    this.userState.on(["pendingCases", this.caseid], cases => {
      this.pending = uniqBy(concat(this.pending, cases), "id");
    });
  }
};
</script>

<style scoped>
.opencase {
  overflow-x: hidden;
  overflow-y: scroll;
}

.box-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.box-info > div {
  margin: 5px;
}

.name {
  font-size: 1.5em;
}

.description {
  font-size: 1.2em;
  color: var(--layout-label);
}

.backdrop {
  display: flex;
  justify-content: center;
}

.image {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  height: 100%;
}

.image img {
  max-height: 100%;
}

.stage {
  height: 300px;
  position: relative;
}

.box-controls {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: var(--layout-label);
  user-select: none;
  /* max-width: 400px; */
}

.box-controls > div {
  margin-right: 10px;
}

.controlbtn {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
}

.active {
  color: var(--layout-yellow);
}

.loader {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
}

.items {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

@media only screen and (max-width: 600px) {
  .stage {
    height: 240px;
  }
}
</style>


