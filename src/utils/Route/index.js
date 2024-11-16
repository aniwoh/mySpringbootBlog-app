import { createRouter, createWebHistory } from 'vue-router';
import Routes from './routes.js'

const router =  createRouter ({
    history: createWebHistory('/blog/'),
    routes:Routes
})

export default router;