export class LocalStorageService {

    public static save(name: string, value: string) {
        localStorage.setItem(name, value);
    }

    public static get(name: string) {
        return localStorage.getItem(name);
    }

    public static has(name: string) {
        return localStorage.getItem(name) !== null;
    }

    public static remove(name: string) {
        return localStorage.removeItem(name);
    }

}
