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
              component:
                '@/pages/componentsPage/dateSelectPage/dateSelectPage.tsx',
            },
            {
              path: '/componentsPage/confirmPage',
              component: '@/pages/componentsPage/confirmPage/confirmPage.tsx',
            },
            {
              path: '/componentsPage/VerifyPage',
              component: '@/pages/componentsPage/VerifyPage/VerifyPage.tsx',
            },
          ],
        },
      ],
    },
  ],
  fastRefresh: {},
  mfsu: {},
});
