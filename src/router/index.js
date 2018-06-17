import Vue from 'vue';
import Router from 'vue-router';

/* Layout */
import Layout from '../views/layout/Layout';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
* */
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      meta: { title: '首页', icon: 'home' },
      component: () => import('@/views/dashboard/index'),
    }],
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/settings',
    meta: { title: '系统管理', icon: 'form' },
    children: [
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '系统设置', icon: 'user' },
      }
    ],
  },

  {
    path: '/gallerys',
    component: Layout,
    redirect: '/gallerys/index',
    children: [
      {
        path: 'index',
        name: 'gallerys',
        component: () => import('@/views/gallerys'),
        meta: { title: '轮播图管理', icon: 'user' },
      },
    ],
  },

  {
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    children: [
      {
        path: 'index',
        name: 'users',
        component: () => import('@/views/users/index'),
        meta: { title: '用户管理', icon: 'user' },
      },
    ],
  },

  {
    path: '/goodses',
    component: Layout,
    redirect: '/goodses/index',
    children: [
      {
        path: 'index',
        name: 'goodses',
        component: () => import('@/views/goodses/index'),
        meta: { title: '商品管理', icon: 'user' },
      },
    ],
  },

  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/index',
    children: [
      {
        path: 'index',
        name: 'orders',
        component: () => import('@/views/orders/index'),
        meta: { title: '订单管理', icon: 'user' },
      },
    ],
  },

  { path: '*', redirect: '/404', hidden: true },
];

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});
