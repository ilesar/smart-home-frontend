<template>
    <div class="co-login">
        <div class="co-login__inner">
            <LoginUpperSection/>
            <LoginForm/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import LoginForm from '@/components/views/login/LoginForm.vue';
    import LoginUpperSection from '@/components/views/login/LoginUpperSection.vue';

    @Component({
        name: 'Login',
        components: {
            LoginUpperSection,
            LoginForm,
        },
    })
    export default class Login extends Vue {
    }
</script>

<style lang="scss" scoped>
    .co-login {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
        background-color: $very-light-blue-two;

        &__inner {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 450px;
            align-items: center;
        }

        &__logo {
            margin-bottom: 40px;
        }

        &__message {
            margin-bottom: 16px;
            color: $black;
        }

        &__additional-info {
            margin-bottom: 24px;
            text-align: center;
            max-width: 380px;
        }

    }
</style>
