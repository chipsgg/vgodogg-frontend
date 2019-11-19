<template>
  <div :class="{'chat': true, 'hidden': hidden}">
    <div class="header">
      <div class="online">
        <i class="material-icons green">rss_feed</i>
        {{online.toLocaleString('en')}} ONLINE
      </div>
      <i class="material-icons green hide" @click="hide">clear</i>
    </div>
    <div id="messages" class="messages">
      <Message
        v-for="msg in messages"
        v-bind:key="msg.timestamp+msg.user.id"
        :avatar="msg.user.avatar"
        :text="msg.message"
        :username="msg.user.username"
        @click="openModal(msg.user)"
      />
    </div>
    <Input :actions="actions"/>
    <div class="footer">
      <div class="footer-text" @click="showRules">CHAT RULES</div>
      <div class="footer-text">VGODOGG, 2018</div>
    </div>
    <Modal
      v-show="showModal"
      type="Profile"
      :props="{actions, user: modalUser, hideDetails: true}"
      @close="closeModal"
    />
  </div>
</template>


<script>
import Message from "@/components/Chat/Message.vue";
import Input from "@/components/Chat/Input.vue";
import Modal from "@/components/Modal/Modal.vue";

export default {
  name: "Chat",
  props: ["state", "actions"],
  components: {
    Message,
    Input,
    Modal
  },
  data() {
    return {
      messages: [],
      online: 1337,
      hidden: false,
      showModal: false,
      modalUser: null
    };
  },
  beforeMount() {
    this.messages = this.state(["chats", 0, "messages"]);
    this.state.on('chat', chat => {
      this.messages = chat.messages;
    });
    this.online = this.state("sessions");
    this.state.on("sessions", online => {
      this.online = online;
    });
  },
  mounted() {
    document.getElementById("messages").scrollTop = document.getElementById(
      "messages"
    ).lastElementChild.offsetTop;
  },
  methods: {
    showRules() {
      // show rules modal
    },
    hide() {
      this.hidden = true;
    },
    show() {
      this.hidden = false;
    },
    closeModal() {
      this.modalUser = null;
      this.showModal = false;
    },
    openModal(user) {
      this.modalUser = user;
      this.showModal = true;
    }
  }
};
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  width: 300px;
  flex-shrink: 0;
  padding: 20px;
  background-color: var(--layout-background);
  /* transition: all 1s linear; */
}

@media only screen and (max-width: 600px) {
  .chat {
    visibility: hidden;
    position: absolute;
  }
}

.hidden {
  visibility: hidden;
  position: absolute;
}

.hide {
  cursor: pointer;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
}

.online {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.material-icons {
  padding-right: 10px;
}

.green {
  color: var(--layout-green);
}

.messages {
  flex: 1;
  overflow-x: hidden;
  max-width: 300px;
  overflow-y: scroll;
}

.footer {
  opacity: 0.4;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: var(--layout-label);
}
</style>
