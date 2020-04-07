<template>
    <a-form-item class="co-login__form-row">
        <a-button type="primary"
                  data-test="login-submit"
                  html-type="submit"
                  class="co-login__button"
                  :loading="isPending"
                  :disabled="isPending">
            {{'Prijavi se'}}
        </a-button>
    </a-form-item>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class LoginButton extends Vue {

    @Prop()
    private isPending!: boolean;

  }
</script>

<style lang="scss" scoped>
    .co-login {

        &__spinner-wrapper {
            text-align: center;
            height: 30px;
        }
    }
</style>
