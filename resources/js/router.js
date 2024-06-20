import { createRouter, createWebHistory } from 'vue-router'

// import StatusPage from './pages/StatusPage.vue'
import UnoCssPage from './pages/UnoCssPage.vue'
import BlogForm from './pages/BlogForm.vue'
import BlogDetails from './pages/BlogDetails.vue'
import Movie from './components/Movie.vue'
import Review from './components/Review.vue'

const routes = [
    // {
    //     path: '/',
    //     name: 'StatusPage',
    //     component: StatusPage,
    //     meta: {
    //         title: 'StatusPage',
    //     },
    // },
    {
        path: '/uno',
        name: 'UnoCssPage',
        component: UnoCssPage,
        meta: {
            title: 'UnoCssPage',
        },
    },
    {
        path: '/blog-form',
        name: 'BlogForm',
        component: BlogForm,
        meta: {
            title: 'BlogForm',
        },
    },
    {
        path: '/blog/:id',
        name: 'BlogDetails',
        component: BlogDetails,
        meta: {
            title: 'BlogDetails',
        },
    },
    {
        path: '/movie',
        name: 'Movie',
        component: Movie,
        meta: {
            title: 'Movie',
        },
    },
    {
        path: '/review',
        name: 'Review',
        component: Review,
        meta: {
            title: 'Review',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    const context = { to, from, next }
    document.title = to.meta.title

    return next()
})

export default router
