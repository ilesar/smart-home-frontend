<template>
    <div class="co-login__upper-section">
        <h4 data-test="login-title" class="u-a4 co-login__message">SMART HOME</h4>
        <p class="u-a1 co-login__additional-info">{{'Za korištenje aplikacije potrebno je unijeti vaše korisničko ime i lozinku'}}:</p>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import RoltekLogo from '@/icons/RoltekLogo.vue';

    @Component({
        name: 'LoginUpperSection',
        components: {
            RoltekLogo,
        },
    })
    export default class Login extends Vue {
    }
</script>

<style lang="scss" scoped>
    .co-login {

        &__upper-section {
            text-align: center;
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
