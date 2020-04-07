<template>
    <div class="co-login">
        <div class="co-login__inner">
            <h1>Strašna greška. Sustav se potrgao!</h1>
            <p>Šalim se. Samo javi Ivanu.</p>
            <a-button type="primary" @click="goBack()">Vrati se nazad</a-button>
        </div>
    </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

  @Component({
    name: 'Error',
  })
  export default class Rooms extends Vue {
    public goBack() {
      window.history.back();
    }
  }

</script>

<style lang="scss" scoped>
    .co-login {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;

        &__inner {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 450px;
            align-items: center;
        }
    }
</style>
