import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const routes = [
  { path: '*', redirect: '/home' },
  { 
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  { 
    path: '/home', 
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true },
    children: [
      { 
        path: '',
        name: 'Home', 
        component: () => import('../components/HomeContent.vue')
      },
      {
        path: 'data/:place',
        component: () => import('../views/PlaceView.vue'),
        beforeEnter: (to, from, next) => {
          if (from.name !== "Home") { next('/home') }
          next()
        },
        children: [
          {
            path: '',
            component: () => import('../views/DataView.vue'),
            meta: { firstPage: true }
          },
          {
            path: 'new-data',
            name: 'DataInput',
            component: () => import('../views/PlaceInputView.vue')
          },
          {
            path: 'subjects',
            name: 'SubjectsInput',
            component: () => import('../views/SubjectsInputView.vue'),
            beforeEnter: (to, from, next) => {
              if (from.name !== "DataInput") { next('/home') }
              next()
            }
          },
          {
            path: 'doctors',
            name: 'DoctorsInput',
            component: () => import('../views/DoctorInputView.vue'),
            beforeEnter: (to, from, next) => {
              if (from.name !== "SubjectsInput") { next('/home') }
              next()
            }
          }
        ]
      }
    ]
  }
]

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router