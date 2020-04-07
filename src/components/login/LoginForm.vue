<template>
    <a-form ref="form" class="co-login__form" :form="form" @submit="handleSubmit">
        <div class="co-login__form-fields">
            <EmailLoginField :is-pending="isPending"/>
            <PasswordLoginField :is-pending="isPending" :error="this.passwordError"/>
        </div>
        <LoginButton :is-pending="isPending"/>
        <a href="#" class="co-login__forgot-password u-b3--bold-">Zaboravili ste lozinku?</a>
    </a-form>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import {IformCreateOption} from 'ant-design-vue/types/form/form';
import {LoginValues} from '@/interfaces/LoginValues';
import {RouteNames} from '@/enums/RouteNames';
import AuthController from '@/api/controllers/AuthController';
import EmailLoginField from '@/components/login/EmailLoginField.vue';
import PasswordLoginField from '@/components/login/PasswordLoginField.vue';
import LoginButton from '@/components/login/LoginButton.vue';
import TokenRepository from '@/repositories/TokenRepository';
import Token from '@/api/models/Token';
import {LocalStorageService} from '@/services/LocalStorageService';
import {LocalStorageKeyNames} from '@/enums/LocalStorageKeyNames';
import LoginFormError from '@/errors/LoginFormError';

@Component({
  name: 'LoginForm',
  components: {LoginButton, PasswordLoginField, EmailLoginField},
})
export default class LoginForm extends Vue {

  public get form() {
    if (this._form === undefined) {
      this._form = this.$form.createForm(this, {name: 'login_form'} as IformCreateOption);
    }

    return this._form;
  }

  public get emailError() {
    if (!this.errors) {
      return null;
    }

    return this.errors.email;
  }

  public get passwordError() {
    if (!this.errors) {
      return null;
    }

    return this.errors.password;
  }
  public errors: any = {};

  // private httpRequestStarted: boolean = false;
  private requiredFieldNames = ['username', 'password'];
  private isPending: boolean = false;
  private _form;

  public handleSubmit(event: Event) {
    event.preventDefault();
    this.isPending = true;

    this.form.validateFields(
      async (formError: Error, loginValues: LoginValues) => {
        if (formError) {
          console.error(formError);
          return;
        }

        await AuthController
          .login(loginValues.email, loginValues.password)
          .then((responseObject: any) => {
            const token: Token = TokenRepository.getToken();
            LocalStorageService.save(LocalStorageKeyNames.token, token.access_token);
            this.$router.push({name: RouteNames.Devices});
          })
          .catch((error: LoginFormError) => {
            console.log(error);
            this.errors = error.formattedErrors;
            console.log(this.errors);
          }).finally(() => {
            this.isPending = false;
          });
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
            /*background-color: white;*/
            margin-bottom: 32px;
        }

        &__form-row {
            width: 100%;
        }

        &__forgot-password {
            margin-bottom: 8px;
            color: #1890ff;
        }

    }
</style>
