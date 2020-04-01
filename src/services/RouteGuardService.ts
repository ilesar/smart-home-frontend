import { Route, VueRouter } from 'vue-router/types/router';
import { LocalStorageService } from '@/services/LocalStorageService';
import { LocalStorageKeyNames } from '@/enums/LocalStorageKeyNames';
import User from '@/api/models/User';
import { RouteNames } from '@/enums/RouteNames';
import { AxiosResponse } from 'axios';
import AuthController from '@/api/controllers/AuthController';

export class RouteGuardService {
    constructor(private router: VueRouter) {
        this.guard();
    }

    private get token(): string | null {
        return LocalStorageService.get(LocalStorageKeyNames.token);
    }

    private guard() {
        this.router.beforeEach(async (to, from, next) => {
            await this.manageTokenExistence(to, next);
            next();
        });
    }

    private async manageTokenExistence(route: Route, next: any) {
        if (route.name === RouteNames.Login) {
            next();
            return;
        }

        if (this.token === null || this.token.length <= 0) {
            this.redirectToLogin(next);
        } else {
            await this.checkTokenValidation(next);
        }
    }

    private async checkTokenValidation(next: any) {
        let tokenRefreshed;
        try {
            tokenRefreshed = await AuthController.refreshToken() as AxiosResponse;
        } catch (e) {
            await this.redirectToLogin(next);
            return;
        }
        User.setToken(tokenRefreshed.response);
    }

    private async redirectToLogin(next: any) {
        await AuthController.logout().then(() => {
            next('/login');
        });
    }
}
