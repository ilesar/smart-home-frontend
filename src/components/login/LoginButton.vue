<template>
    <a-form-item class="co-login__form-row">
        <a-button type="primary"
                  data-test="login-submit"
                  html-type="submit"
                  class="co-login__button"
                  :disabled="isPending">
            {{'Prijavi se'}}
        </a-button>
        <div
                class="co-login__spinner-wrapper"
        >
            <a-spin
                    v-if="isPending === true"
            />
        </div>
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
