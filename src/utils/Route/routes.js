import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Home from "@/Home.vue";
import Index from "@/views/Index.vue";
import Article from "@/views/Article.vue";

const Routes= [
    {
        path: '/',
        name:'Home',
        component: Home,
        children: [
            {
                path: '/article/:id',
                component: Article
            },
            {
                path:'/',
                component: Index
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
]
export default Routes;