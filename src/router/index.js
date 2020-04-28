import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/forget_password',
        name: 'forgetPassword',
        component: () => import('@/views/forget-password/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/error/404'),
        hidden: true
    },

    {
        path: '/401',
        component: () => import('@/views/error/401'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
    },


    {
        path: '/user',
        component: Layout,
        redirect: '/user/profile',
        hidden: true,
        children: [
            {
                path: 'profile',
                name: 'profile',
                component: () => import('@/views/profile/index'),
                meta: { title: '个人中心', }
            }
        ]
    },

    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/index',
        children: [
            {
                path: 'index',
                name: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                meta: { title: '数据概览', icon: 'dashboard', affix: true }
            }
        ]
    }
]

export const asyncRoutes = [
    {
        path: '/customer',
        component: Layout,
        redirect: '/customer/index',
        children: [
            {
                path: 'index',
                name: 'customer',
                component: () => import('@/views/customer/index'),
                meta: { title: '客户管理', icon: 'customer', roles: ['admins'] },
            },
            {
                path: 'profile',
                name: 'customerProfile',
                hidden: true,
                component: () => import('@/views/customer/profile/index'),
                meta: { title: '客户详情', roles: ['admin'] }
            }
        ]
    },

    {
        path: '/supplier',
        component: Layout,
        redirect: '/supplier/index',
        children: [
            {
                path: 'index',
                name: 'supplier',
                component: () => import('@/views/supplier/index'),
                meta: { title: '服务商管理', icon: 'supplier', roles: ['admin'] }
            },
            {
                path: 'profile',
                name: 'supplierProfile',
                hidden: true,
                component: () => import('@/views/supplier/profile/index'),
                meta: { title: '服务商管理', roles: ['admin'] }
            }
        ]
    },

    {
        path: '/order',
        component: Layout,
        redirect: '/order/index',
        children: [
            {
                path: 'index',
                name: 'order',
                component: () => import('@/views/order/index'),
                meta: { title: '订单管理', icon: 'order', roles: ['admin'] }
            },
            {
                path: 'profile',
                name: 'orderProfile',
                hidden: true,
                component: () => import('@/views/order/profile/index'),
                meta: { title: '订单详情', roles: ['admin'] }
            },
            // {
            //     path: 'create',
            //     name: 'orderCreate',
            //     hidden: true,
            //     component: () => import('@/views/order/create/index'),
            //     meta: { title: '订单新增', roles: ['admin'] }
            // }
        ]
    },

    {
        path: '/order/create',
        name: 'orderCreate',
        hidden: true,
        component: () => import('@/views/order/create/index'),
        meta: { title: '订单新增', roles: ['admin'] }
    },

    {
        path: '/business',
        component: Layout,
        redirect: '/business/index',
        children: [
            {
                path: 'index',
                name: 'business',
                component: () => import('@/views/business/index'),
                meta: { title: '商务管理', icon: 'business', roles: ['admin'] }
            }
        ]
    },

    {
        path: '/financial',
        component: Layout,
        redirect: '/financial/cost/index',
        meta: { title: '财务管理', icon: 'financial', roles: ['admin'] },
        children: [
            {
                path: '/cost/index',
                name: 'cost',
                component: () => import('@/views/cost/index'),
                meta: { title: '费用管理', roles: ['admin'] }
            },
            {
                path: '/invoice',
                name: 'invoice',
                component: () => import('@/views/invoice/index'),
                meta: { title: '发票管理', roles: ['admin'] }
            }
        ]
    },

    {
        path: '/statistics',
        component: Layout,
        redirect: '/statistics/index',
        children: [
            {
                path: '/index',
                name: 'statistics',
                component: () => import('@/views/statistics/index'),
                meta: { title: '数据统计', icon: 'statistics', roles: ['admin'] }
            }
        ]
    },

    {
        path: '/system',
        component: Layout,
        redirect: '/system/user/index',
        name: 'system',
        meta: { title: '系统管理', icon: 'system', roles: ['admin'] },
        children: [
            {
                path: 'user/index',
                name: 'user',
                component: () => import('@/views/user/index'),
                meta: { title: '用户管理', roles: ['admin'] },
            },
            {
                path: 'role/index',
                name: 'role',
                meta: { title: '角色管理', roles: ['admin'] },
                component: () => import('@/views/role/index'),
            },
            {
                path: 'role/create',
                name: 'roleCreate',
                meta: { title: '角色新增', roles: ['admin'] },
                hidden: true,
                component: () => import('@/views/role/create/index'),
            },
            {
                path: 'role/profile',
                name: 'roleProfile',
                meta: { title: '角色详情', roles: ['admin'] },
                hidden: true,
                component: () => import('@/views/role/profile/index'),
            },
            {
                path: 'dictionary/index',
                name: 'dictionary',
                component: () => import('@/views/dictionary/index'),
                meta: { title: '数据字典', roles: ['admin'] },
            }
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
