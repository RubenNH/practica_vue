import VueRouter from "vue-router";
import Vue from "vue";
import { jwtDecode } from 'jwt-decode';
import login from "../components/Login.vue";
import admin from "../components/Admin.vue";
import editor from "../components/Editor.vue";
import viewer from "../components/Viewer.vue";
import unauthorized from "../components/Unauthorized.vue";
import NotFound from "../components/NotFound.vue";


Vue.use(VueRouter);

const routes = [
    //la ruta base
    {
        path: "/",
        redirect: "/login",
    },
    //rutas asociadas a los componentes
    {
        path: "/",
        component: {
            render(c) {
                return c("router-view");
            }
        },
        children: [
            {
                path: "/inicio",
                name: "inicio",
                component: () =>
                    import ("../components/Inicio.vue")
                
            },
            {
                path: "/main",
                name: "main",
                component: () =>
                    import ("../components/Main.vue")
            },
            {
                path: "/tercero",
                name: "tercero",
                component: () =>
                    import ("../components/Tercero.vue")
            },
            {
                path: "/LandsPage",
                name: "LandsPage",
                component: () =>
                    import ("../components/InicioLandspage.vue")
            },
            {
                path: "/RentarEspacio",
                name: "RentarEspacio",
                component: () =>
                    import ("../components/RentarEspacio.vue")
            },
            {
                path: "/RentarTuEspacio",
                name: "RentarTuEspacio",
                component: () =>
                    import ("../components/RentarTuEspacio.vue")
            },
            {
                path: "/CatalogoEspacios",
                name: "CatalogoEspacios",
                component: () =>
                    import ("../components/CatalogoEspacios.vue")
            },
            {
                path: "/DetallesEspacio",
                name: "DetallesEspacio",
                component: () =>
                    import ("../components/DetallesEspacio.vue")
            },
            {
                path: "/InfoEspacios",
                name: "InfoEspacios",
                component: () =>
                    import ("../components/InfoEspacios.vue")
            },
            {
                path: "/OfertarEspacio",
                name: "OfertarEspacio",
                component: () =>
                    import ("../components/OfertarEspacio.vue")
            },
            {
                path: "/formularioUsuario",
                name: "formularioUsuario",
                component: () =>
                    import ("../components/formularioUsuario.vue")
            },
            {
                path: "/peliculas",
                name: "peliculas",
                component: () =>
                    import ("../components/Peliculas.vue")
            },
            {
                path: "/dragndrop",
                name: "dragndrop",
                component: () =>
                    import ("../components/MoviesDragNDrop.vue")
            },
            {
                path: "/dragNDropCreateMovie",
                name: "dragNDropCreateMovie",
                component: () =>
                    import ("../components/DragNDropCreateMovie.vue")
            }
        ]
    },
    {
        name: "login",
        path: "/login",
        component: login
    },
    {
        name: "admin",
        path: "/admin",
        meta: { role: 'SUPER_ADMIN_ROLE' },
        component: admin
    },
    {
        name: "editor",
        path: "/editor",
        meta: { role: 'editor' },
        component: editor
    },
    {
        name: "viewer",
        path: "/viewer",
        meta: { role: 'viewer' },
        component: viewer
    },
    {
        name: "unauthorized",
        path: "/unauthorized",
        component: unauthorized
    },
    {
        path: "/:catchAll(.*)",
        name: "not-found",
        component: NotFound
    }
];

const router = new VueRouter({
    routes
});


router.beforeEach((to, from, next) => {
    const PUBLIC_PAGES = ['/login', '/', '/unauthorized'];
    const authRequired = !PUBLIC_PAGES.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    if (loggedIn) {
        const token = jwtDecode(loggedIn);
        const userRole = token.roles[0].authority;
        const authRole = to.matched.some(record => record.meta.role);
        console.log(userRole);
        console.log(authRole);
        console.log(to.meta.role);
        if(to.meta.role && userRole !== to.meta.role) {
            return next('/unauthorized');
        }
        // if (authRole && authRole !== userRole) {
        //     return next('/unauthorized');
        // }
    }

    next();
});


export default router;