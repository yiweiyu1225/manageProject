import Layout from '@/layout'

const ProInitExaRouter = {
    path: '/admin',
    component: Layout,
    redirect: '/personal/admin/ProInitExa',
    meta: {
      title: 'personal',
       roles: ['admin', 'editor']
    },
    children: [
        {
          path: 'ProInitExa',
          name: 'ProInitExa',
          component: () => import('@/views/admin/ProInitExa/index'),
          meta: {
          title: '项目备案审核',
          roles: ['admin', 'editor'] }
        }
      ]
}

export default ProInitExaRouter
