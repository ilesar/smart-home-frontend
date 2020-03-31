import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';


// import './registerServiceWorker';
import vueDebounce from 'vue-debounce';

import './plugins/element.js';


Vue.config.productionTip = false;

Vue.use(Antd);

Vue.use(vueDebounce, {
  listenTo: ['keyup', 'click'],
  defaultTime: '200ms',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
