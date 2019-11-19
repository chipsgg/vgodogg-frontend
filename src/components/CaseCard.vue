<template>
  <div class="box">
    <img class="image" :src="box.image['300px']">
    <div class="content">
      <div class="descriptions">
        <div class="name">{{box.name}}</div>
        <div class="openings">Total Opened: {{totalOpened}}</div>
      </div>
      <Button
        v-if="box.remaining_opens > 0"
        :text="`DEPOSIT ${box.key_amount_per_case} KEYS`"
        icon="arrow_forward_ios"
        @click="viewBox(box.id)"
      />
      <Button v-else text="SOLD OUT" type="disabled"/>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "CaseCard",
  components: { Button },
  props: ["box"],
  methods: {
    viewBox(boxid) {
      this.$router.push(`/cases/${boxid}`);
    }
  },
  computed: {
    totalOpened() {
      return (this.box.max_opens - this.box.remaining_opens).toLocaleString(
        "en"
      );
    }
  }
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 80px;
  margin-bottom: 20px;
  position: relative;
  justify-content: flex-end;
}

.image {
  height: 90%;
  display: flex;
  align-self: center;
  position: absolute;
  top: -110px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 200px;
  background-color: var(--layout-background);
  padding: 20px;
}

.content > div {
  margin: 5px;
}

.descriptions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.descriptions > div {
  margin-bottom: 10px;
}

.name {
  white-space: nowrap;
  font-size: 18px;
}

.openings {
  color: var(--layout-label);
}
</style>