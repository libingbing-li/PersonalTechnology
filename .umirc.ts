import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        {
          path: '/componentsPage',
          component: '@/pages/componentsPage/componentsPage',
          routes: [
            {
              path: '/componentsPage/dateSelectPage',
              component: '@/pages/componentsPage/dateSelectPage.tsx',
            },
            {
              path: '/componentsPage/confirmPage',
              component: '@/pages/componentsPage/confirmPage.tsx',
            },
            {
              path: '/componentsPage/verifyPage',
              component: '@/pages/componentsPage/verifyPage.tsx',
            },
            {
              path: '/componentsPage/moveBoxPage',
              component: '@/pages/componentsPage/moveBoxPage.tsx',
            },
            {
              path: '/componentsPage/slideBoxPage',
              component: '@/pages/componentsPage/slideBoxPage.tsx',
            },
          ],
        },
      ],
    },
  ],
  fastRefresh: {},
  mfsu: {},
});
