<template>
    <a-form-item class="co-login__form-row"
                 :validate-status="error ? 'error' : ''" :help="error || ''">
        <a-input
                data-test="login-email"
                v-decorator="[
                      'email',
                    ]"
                placeholder="Email"
                type="email"
                autocomplete="email"
                :disabled="isPending"
        >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
        </a-input>
    </a-form-item>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class EmailLoginField extends Vue {

    @Prop()
    private isPending!: boolean;

    @Prop()
    private error!: any;

  }
</script>

<style lang="scss" scoped>
    .co-login__form-row {
        margin-bottom: 0px !important;
    }
</style>
