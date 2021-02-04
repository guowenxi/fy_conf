// https://umijs.org/config/
import { defineConfig, utils } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
import c from './config.json';

const { winPath } = utils; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV, GA_KEY  } = process.env;
export default defineConfig({
  base: c.PUBLIC_PATH ? c.PUBLIC_PATH : '/',
  publicPath:c.PUBLIC_PATH ? c.PUBLIC_PATH : '/',
  title: c.TITLE,
  hash: true,
  antd: {},
  history: { type: 'hash' }, // 默认是 browser
  analytics: GA_KEY
    ? {
        ga: GA_KEY,
      }
    : false,
  dva: {
    // dynamicImport: true,
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/iframe',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              name: 'iframe',
              path: '/iframe',
              component: './iframe/index',
            }
          ]
        }
      ]
    },
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: c.ROUTERS
        },
        {
          component: '404',
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    'process.env.AMAP_KEY': "3aa3dcd94f2ebae2d345abcfb62d30aa",
    'process.env.ROOT_MAP_ZOOM': 14,
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          //这里可以去更改css的样式的命名
          return `fy${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }

        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  //静态script引入
  headScripts: [
    // 引入天地图
    {
      src: '//api.tianditu.gov.cn/api?v=4.0&tk=245295e435769dbd07aad292477a58ac',
      type: 'text/javascript',
    },
  ],
  //配置虚拟接口地址
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
});
