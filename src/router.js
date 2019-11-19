import Vue from 'vue'
import Router from 'vue-router'
// import Cases from './views/Cases.vue'
// import CaseOverview from './views/CaseOverview.vue'
// import OpenCases from './views/OpenCases.vue'

Vue.use(Router)

const route = new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Cases',
      component: () => {
        return import('./views/Cases.vue')
      },
    },
    {
      path: '/cases/:caseid',
      name: 'Case Overview',
      component: () => {
        return import('./views/CaseOverview.vue')
      },
    },
    {
      path: '/cases/:caseid/open',
      name: 'Open Cases',
      component: () => {
        return import('./views/OpenCases.vue')
      },
    },
    // {
    //   path: "/inventory",
    //   name: "inventory",
    //   component: Inventory
    // },
    // {
    //   path: "/loaderboards",
    //   name: "loaderboards",
    //   component: loaderboards
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ],
})


route.afterEach((toRoute, fromRoute) => {
  window.document.title = `VgoDogg | ${toRoute.name}`
  // console.log(toRoute)  // this lets you check what else is available to you here
})

export default route