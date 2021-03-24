import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import ProInitExa from '@/router/modules/ProInitExa'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: '/loginIndex',
    component: Layout,
    redirect: '/loginIndex',
    // meta: {
    //   icon: 'el-icon-d-arrow-right'
    // },
    children: [{
      path: 'loginIndex',
      name: 'loginIndex',
      component: () => import('@/views/login/loginIndex'),
      meta: { title: 'loginIndex' }
    }]
  },
  {
    path: '/acticle',
    component: () => import('@/views/test/acticle'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard' }
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form' }
  //     }
  //   ]
  // },
  {
    path: 'register',
    component: Layout,
    children: [
      {
        path: '/index',
        component: () => import('@/views/register/index'),
        meta: { title: '注册' }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/myProRecordKeep',
    meta: {
      title: '个人',
       roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'myProRecordKeep',
        name: 'myProRecordKeep',
        component: () => import('@/views/personal/myProRecordKeep/myProRecordKeep'),
        meta: {
        title: '我的项目备案',
        roles: ['admin', 'editor'] }
      },
      {
        path: 'createProject',
        name: 'createProject',
        component: () => import('@/views/personal/myProRecordKeep/createProject'),
        meta: {
        title: '增加备案',
        roles: ['admin', 'editor'] },
        hidden: true
      },
      {
        path: 'editorProject/:id(\\d+)',
        name: 'editorProject',
        component: () => import('@/views/personal/myProRecordKeep/editorProject'),
        meta: {
        title: '编辑备案',
        roles: ['admin', 'editor'] },
        hidden: true
      },
      // 申报项目管理
      {
        path: 'applyProManage',
        name: 'applyProManage',
        component: () => import('@/views/personal/applyProManage/index'),
        meta: {
        title: '申报项目管理',
        roles: ['admin', 'editor'] }
      },
      {
        path: 'proProgress/:id(\\d+)',
        name: 'proProgress',
        component: () => import('@/views/personal/applyProManage/proProgress'),
        meta: {
        title: '项目跟踪',
        roles: ['admin', 'editor'] },
        hidden: true
      }
    ]
  },
  ProInitExa,
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/departments',
    meta: {
      title: '管理',
      roles: ['editor']
    },
    children: [
      {
        path: 'departments',
        name: 'departments',
        component: () => import('@/views/management/department/index'),
        meta: {
        title: '部门管理',
        roles: ['editor'] }
      },
      {
        path: 'people',
        name: 'people',
        component: () => import('@/views/management/people/index'),
        meta: {
        title: '人员管理',
        roles: ['editor'] }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/management/role/index'),
        meta: {
        title: '角色分配',
        roles: ['editor'] }
      },
      {
        path: 'roleauthority',
        name: 'roleauthority',
        component: () => import('@/views/management/roleauthority/index'),
        meta: {
        title: '角色权限管理',
        roles: ['editor'] }
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
