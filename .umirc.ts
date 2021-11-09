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
              path: '/componentsPage/confirm',
              component: '@/pages/componentsPage/confirm/confirm.tsx',
            },
            {
              path: '/componentsPage/moveBox',
              component: '@/pages/componentsPage/moveBox/moveBox.tsx',
            },
            {
              path: '/componentsPage/slideBox',
              component: '@/pages/componentsPage/slideBox/slideBox.tsx',
            },
            {
              path: '/componentsPage/dateSelect',
              component:
                '@/pages/componentsPage/dateSelectPage/dateSelectPage.tsx',
            },
          ],
        },
      ],
    },
  ],
  fastRefresh: {},
  mfsu: {},
});
