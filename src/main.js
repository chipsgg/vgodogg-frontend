import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'
Vue.use(SequentialEntrance)
import VueNoty from 'vuejs-noty'
Vue.use(VueNoty)

Vue.config.productionTip = false

import ChipsGG from 'chipsgg-client'

// const SOCKET_URL = 'socket.jackpotgg.pepefarms.com'
// const AUTHSERVER_URL = 'http://steamauth.daywiss.com'

// const SOCKET_URL = "http://localhost:9992"
// const AUTHSERVER_URL = "http://localhost:9993"

async function init() {
  let chipsgg = null

  try {
    chipsgg = await ChipsGG(
      'http://cloudogg.chips.gg:9992',
      'http://cloudogg.chips.gg:9993'
      // 'http://localhost:9992',
      // 'http://localhost:9993'
      // 'https://socket.vgodogg.com',
      // 'https://auth.vgodogg.com'
    )
  } catch (e) {
    // handle
    console.error(e)
    return
  }

  if (chipsgg.authenticated) {
    const user = chipsgg.userState('me')
    // console.log('USER LOGIN:', user)
    // LogRocket.identify(user.id, user)
  }

  console.log(chipsgg.state.get())
  // console.log(chipsgg.userState.get())

  new Vue({
    router,
    render: createElement =>
      createElement(App, {
        props: { chipsgg },
      }),
  }).$mount('#app')
}

init()
