import {
    createRouter,
    createWebHistory
} from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import toRawTest from '../components/toRawTest.vue'
import toRefAndtoRefs from '../components/toRefAndtoRefs.vue'
import customRef from '../components/customRef.vue'
import readonly from '../components/readonly.vue'

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
        {
            path: "/toRefAndtoRefs",
            component: toRefAndtoRefs
        },
        {
            path: "/customRef",
            component: customRef
        },
        {
            path: "/readonly",
            component: readonly
        },
    ]
})

export default router