import {
    createRouter,
    createWebHistory
} from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import toRawTest from '../components/toRawTest.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: HelloWorld
        },
        {
            path: "/toRawTest",
            component: toRawTest
        },
    ]
})

export default router