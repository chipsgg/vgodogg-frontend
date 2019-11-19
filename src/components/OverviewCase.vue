<template>
  <div class="casebuy">
    <div class="name">{{box.name}}</div>
    <div class="description">
      Costs
      <u>{{box.key_amount_per_case}} Key(s)</u>
    </div>
    <img class="image" :src="image">
    <Button
      v-if="pending.length > 0"
      :text="`OPEN ${pending.length} CASES`"
      type="important"
      @click="openCases"
    />

    <Button v-else text="PURCHASE CASE" icon="arrow_forward_ios" @click="openModal"/>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  name: "OverviewCase",
  components: { Button },
  props: ["authenticated", "box", "actions", "openModal", "userState"],
  methods: {
    openCases() {
      this.$router.push(`/cases/${this.box.id}/open`);
    }
  },
  computed: {
    image() {
      if (!this.box.image) return;
      return this.box.image["600px"];
    }
  },
  data() {
    return {
      pending: []
    };
  },
  async beforeMount() {
    if (!this.authenticated) return;
    const caseid = this.box.id.toString();

    this.pending = await this.actions.listMyPendingVCasesByCaseid({
      caseid
    });

    this.userState.on(["pendingCases", caseid], cases => {
      this.pending = cases
    });
  }
};
</script>

<style scoped>
.casebuy {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.casebuy > div {
  margin: 5px;
}

.name {
  font-size: 1.5em;
}

.description {
  font-size: 1.2em;
  color: var(--layout-label);
}

.image {
  max-width: 300px;
}
</style>


