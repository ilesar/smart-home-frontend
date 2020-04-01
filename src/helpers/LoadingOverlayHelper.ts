export class LoadingOverlayHelper {
    public loaderInstance: any = null;

    constructor(
        public vue: any = vue,
        public options: any,
    ) {
        const defaultOptions = {
            zIndex: 1001,
        };
        this.options = {...options, ...defaultOptions};
    }

    public start() {
        if (this.loaderInstance !== null) {
            return;
        }
        this.loaderInstance = this.vue.$loading.show(this.options);
    }

    public stop() {
        if (this.loaderInstance === null) {
            return;
        }

        this.loaderInstance.hide();
        this.loaderInstance = null;
    }
}
