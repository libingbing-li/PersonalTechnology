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
          path: '/components',
          component: '@/pages/components/components',
          routes: [
            {
              path: '/components/confirm',
              component: '@/pages/components/confirm/confirm.tsx',
            },
            {
              path: '/components/moveBox',
              component: '@/pages/components/moveBox/moveBox.tsx',
            },
            {
              path: '/components/slideBox',
              component: '@/pages/components/slideBox/slideBox.tsx',
            },
            {
              path: '/components/dateSelect',
              component: '@/pages/components/dateSelect/dateSelect.tsx',
            },
          ],          
        },
      ],
    },
  ],
  fastRefresh: {},
  mfsu: {},
});
