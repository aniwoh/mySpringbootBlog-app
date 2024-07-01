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
                path:'/',
                component: Index
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/article/:id',
        name: 'article',
        component: Article
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
]
export default Routes;