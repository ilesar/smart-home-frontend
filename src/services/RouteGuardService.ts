import { Route, VueRouter } from 'vue-router/types/router';
import { LocalStorageService } from '@/services/LocalStorageService';
import { LocalStorageKeyNames } from '@/enums/LocalStorageKeyNames';
import { RouteNames } from '@/enums/RouteNames';
import { AxiosResponse } from 'axios';
import AuthController from '@/api/controllers/AuthController';
import Token from '@/api/models/Token';
import TokenRepository from '@/repositories/TokenRepository';

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

        await AuthController
          .refreshToken()
          .then((responseObject: any) => {
              tokenRefreshed = TokenRepository.getToken();
              LocalStorageService.save(LocalStorageKeyNames.token, tokenRefreshed.access_token);
          })
          .catch((error: Error) => {
              console.error(error);
              this.redirectToLogin(next);
          });
    }

    private async redirectToLogin(next: any) {
        await AuthController.logout().then(() => {
            next('/login');
        });
    }
}
