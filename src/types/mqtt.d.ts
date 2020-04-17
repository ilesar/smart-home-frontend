import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $mqtt: any;
  }

  interface VueConstructor {
    $mqtt: any;
  }
}
