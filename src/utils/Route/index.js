import { createRouter, createWebHashHistory,RouterLink } from 'vue-router';
import Routes from './routes.js'

console.log(Routes)
const router =  createRouter ({
    history: createWebHashHistory(),
    routes:Routes
})

export default router;