import { action, observable } from "mobx";
import RootStore from "./rootStore";

export default class AppStore {
    private rootStore: RootStore;

    @observable
    public isLogined: boolean;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.isLogined = false;
    }

    @action
    public login = () => {
        this.rootStore.appStore.isLogined = true;
    }

    @action
    public logout = () => {
        this.rootStore.appStore.isLogined = false;
    }
}