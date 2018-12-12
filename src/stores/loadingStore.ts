import { action, observable } from "mobx";
import RootStore from "./rootStore";

export default class LoadingStore {
    private rootStore: RootStore;

    @observable
    public isSwitchOn: boolean;

    @observable
    public isLoading: boolean;
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.isSwitchOn = false;
        this.isLoading = false;
    }

    @action
    public allowLoading = () => {
        this.rootStore.loadingStore.isSwitchOn = true;
    }

    @action
    public disallowLoading = () => {
        this.rootStore.loadingStore.isSwitchOn = false;
    }

    @action
    public startLoading = () => {
        if (this.rootStore.loadingStore.isSwitchOn) {
            this.rootStore.loadingStore.isLoading = true;
        }
    }
    
    @action
    public endLoading = () => {
        this.rootStore.loadingStore.isLoading = false;
    }
}