<template>
    <a-form class="co-login__form" layout="inline" :form="form" @submit="handleSubmit">
        <div class="co-login__form-fields">
            <a href="#" class="co-login__forgot-password u-b3--bold-">{{'Zaboravili ste lozinku?'}}</a>
            <a-form-item class="co-login__form-row"
                         :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
                <a-input
                    data-test="login-username"
                    v-decorator="[
                      'username',
                    ]"
                    placeholder="Username"
                    autocomplete="username"
                >
                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item class="co-login__form-row"
                         :validate-status="passwordError() ? 'error' : ''"
                         :help="passwordError() || ''">
                <a-input
                    data-test="login-password"
                    v-decorator="[
                      'password',
                    ]"
                    type="password"
                    placeholder="Password"
                    autocomplete="password"
                >
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
        </div>
        <a-form-item class="co-login__form-row">
            <a-button type="primary"
                      data-test="login-submit"
                      html-type="submit"
                      class="co-login__button u-a2--bold"
                      :class="[{'--is-disabled': httpRequestStarted}]">
                {{'Prijavi se'}}
            </a-button>
            <div
                class="co-login__spinner-wrapper"
            >
                <a-spin
                    v-if="httpRequestStarted === true"
                />
            </div>
        </a-form-item>
    </a-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import User from '@/api/models/User';
import { IformCreateOption } from 'ant-design-vue/types/form/form';
import { LoginValues } from '@/interfaces/LoginValues';
import { RouteNames } from '@/enums/RouteNames';
import { TAnyKeyValueObject } from 'jsona/lib/JsonaTypes';

interface DynamicObject {
    [key: string]: any;
}

@Component({
    name: 'LoginForm',
})
export default class LoginForm extends Vue {

    private httpRequestStarted: boolean = false;
    private requiredFieldNames = ['username', 'password'];

    private get form() {
        return this.$form.createForm(this, {name: 'horizontal_login'} as IformCreateOption);
    }

    private async login(loginValues: LoginValues) {
        this.httpRequestStarted = true;
        const resetErrors: DynamicObject = {};
        this.requiredFieldNames.forEach((fieldName: string) => {
            resetErrors[fieldName] = {};
            resetErrors[fieldName].value = loginValues[fieldName] ? loginValues[fieldName] : '';
            resetErrors[fieldName].errors = [];
        });
        // resets errors before submitting the form
        this.form.setFields(resetErrors);
        try {
            await User.login(loginValues);
        } catch (e) {
            const errors: DynamicObject = {};
            if (e.response.data.errors) {
                e.response.data.errors.forEach((errorDetails: TAnyKeyValueObject) => {
                    const field = errorDetails.source.pointer.split('/')[3];
                    if (errors[field] === undefined) {
                        errors[field] = {};
                        errors[field].value = loginValues[field] ? loginValues[field] : '';
                        errors[field].errors = [];
                    }
                    errors[field].errors.push(errorDetails.detail);
                });
            }
            this.form.setFields(errors);
            this.httpRequestStarted = false;
            return;
        }
        this.$router.push({name: RouteNames.home});
        this.httpRequestStarted = false;
    }

    private hasErrors(fieldsError: any) {
        return Object.keys(fieldsError).some((field) => fieldsError[field]);
    }

    private userNameError() {
        const {getFieldError} = this.form;

        return (getFieldError('username')) ? getFieldError('username')[0] : '';
    }

    private passwordError() {
        const {getFieldError} = this.form;

        return (getFieldError('password')) ? getFieldError('password')[0] : '';
    }

    private handleSubmit(event: Event) {
        event.preventDefault();

        this.form.validateFields(
            (err: Error, loginValues: LoginValues) => {
                if (!err) {
                    this.login(loginValues);
                }
            });
    }
}
</script>

<style lang="scss" scoped>
.co-login {

    &__form {
        width: 100%;
    }

    &__form-fields {
        display: flex;
        width: 100%;
        flex-direction: column;
        padding: 32px;
        background-color: white;
        border-radius: 18px;
        margin-bottom: 32px;
    }

    &__form-row {
        width: 100%;
    }

    &__button {
        width: 100%;
        padding: 16px;
        height: auto;
        background-color: $mid-blue;
        border-color: $mid-blue;
        border-radius: 18px;
        box-shadow: 0 2px 8px 0 rgba(38, 88, 165, 0.32);
    }

    &__spinner-wrapper {
        text-align: center;
        height: 30px;
    }

    &__forgot-password {
        margin-bottom: 8px;
        color: $mid-blue;
    }

}
</style>
