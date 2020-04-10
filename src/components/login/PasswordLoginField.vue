<template>
    <a-form-item class="co-login__form-row"
                 :validate-status="error ? 'error' : ''"
                 :help="error || ''">
        <a-input
                data-test="login-password"
                v-decorator="[
                      'password',
                    ]"
                type="password"
                placeholder="Password"
                autocomplete="password"
                required
                :disabled="isPending"
        >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
    </a-form-item>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class PasswordLoginField extends Vue {

    @Prop()
    private isPending!: boolean;

    @Prop()
    private error!: any;

  }
</script>

<style lang="scss" scoped>

</style>
