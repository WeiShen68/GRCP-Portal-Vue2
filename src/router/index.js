import { routes } from './router-components';
import AppStorage from '@/plugins/storage/index.js';
import Router from 'vue-router';
import store from '../store';
import i18n from '@/translations';
import { showError } from '@/mixins/common';
import Vue from 'vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  autoRefresh(to, from, next);
});

async function autoRefresh(to, from, next) {
  const expireTime = store.getters.getExpireTime;
  const currentTime = new Date().getTime() / 1000;

  // var exp = expireTime * 1000;
  // console.log(new Date(exp));

  if (to.meta.requireAuth) {
    if (store.getters.getToken) {
      // 如果有禁止访问的情况，则跳转到指定页面
      if (currentTime > expireTime) {
        await store.dispatch('logout_act');
        // showError(i18n.t('lbl.sessionTimeout'));
        return next({ name: 'Login', });
      }

      if (to.meta.allowAccess) {
        let jumpAddress = to.meta.jumpAddress,
          jumper = function(condition, jumpTo) {
            if (condition) {
              next();
            } else {
              next({ name: jumpTo || 'Home' });
            }
          },
          // userRole = store.getters.getUserRole,
          locType = store.getters.getLocType;
        if (!locType) {
          return next({ name: 'Home' });
        }
        jumper(to.meta.allowAccess.includes(parseInt(locType)), jumpAddress);
        jumper = null;
      } else {
        next();
      }
    } else {
      next({
        name: 'Login',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        // query: { redirect: to.fullPath },
      });
    }
  } else {
    if (store.getters.getToken) {
      let disableAccessAfterLogin = ['Login'];
      // 如果用户已经登陆了则不允许再调转到登录页面
      if (disableAccessAfterLogin.indexOf(to.name) !== -1) {
        next({
          name: store.state.app.defaultPageAfterLogin, //maybe this is the redirect after re-login
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }

  let timer = setTimeout(() => {
    let storageToken = AppStorage.local.get('token');
    let token = store.getters.getToken;
    // 用户在其他页面退出或重新登录了，则刷新页面
    if (token && storageToken !== token) {
      // window.location.reload(true);
    }
    clearTimeout(timer);
  }, 200);
}

router.afterEach(to => {
  //console.log('路由 afterEach', to)
  if (!to.meta.keepAlive) {
    window.scrollTo(0, 0);
  }
});

export default router;
