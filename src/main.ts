import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
const Loading = require('vue-loading-overlay');
import 'vue-loading-overlay/dist/vue-loading.css';
import '@simonwep/pickr/dist/themes/classic.min.css';
import '@simonwep/pickr/dist/themes/monolith.min.css';
import '@simonwep/pickr/dist/themes/nano.min.css';
import VuePageTransition from 'vue-page-transition';
import VueMobileDetection from 'vue-mobile-detection';
import vueDebounce from 'vue-debounce';
const mqtt = require('mqtt');

// import './registerServiceWorker';

declare module 'vue/types/vue' {
  interface Vue {
    $mqtt: any;
  }
}

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(Loading);
Vue.use(VuePageTransition);
Vue.use(VueMobileDetection);


Vue.use(vueDebounce, {
  listenTo: ['keyup', 'click', 'input', 'change'],
  defaultTime: '500ms',
});

const mqttClient = mqtt.connect('mqtt://192.168.31.125:9001');

mqttClient.on('connect', () => {
  console.log('CONNECTED');
});

Vue.prototype.$mqtt = mqttClient;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
