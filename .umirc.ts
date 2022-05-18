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
        {
          path: '/jsPage',
          component: '@/pages/jsPage/jsPage',
          routes: [
            {
              path: '/jsPage/backAlertPage',
              component: '@/pages/jsPage/backAlertPage.tsx',
            },
            {
              path: '/jsPage/qrlinkPage',
              component: '@/pages/jsPage/qrlinkPage.tsx',
            },
            {
              path: '/jsPage/messagesPage',
              component: '@/pages/jsPage/messagesPage.tsx',
            },
            {
              path: '/jsPage/DTPage',
              component: '@/pages/jsPage/DTPage.tsx',
            },
          ],
        },
        {
          path: '/browserPage',
          component: '@/pages/browserPage/browserPage',
          routes: [
            {
              path: '/browserPage/HWPage',
              component: '@/pages/browserPage/HWPage.tsx',
            },
          ],
        },
      ],
    },
  ],
  fastRefresh: {},
  mfsu: {},
  // build
  // history: {
  //   type: 'hash'
  // },
  // base: './',
  // publicPath: './',
  // hash: true,
});
