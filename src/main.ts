import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';

// import './registerServiceWorker';
import vueDebounce from 'vue-debounce';

import './plugins/element.js';


Vue.config.productionTip = false;

Vue.use(vueDebounce, {
  listenTo: 'input',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
