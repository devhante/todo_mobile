import { action, observable } from "mobx";
import RootStore from "./rootStore";

export default class LoadingStore {
    @observable public loadingSwitch = true;
    @observable public isLoading = false;
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action
    public allowLoading = () => {
        this.rootStore.loadingStore.loadingSwitch = true;
    }

    @action
    public disallowLoading = () => {
        this.rootStore.loadingStore.loadingSwitch = false;
    }

    @action
    public startLoading = () => {
        if(this.rootStore.loadingStore.loadingSwitch) {
            this.rootStore.loadingStore.isLoading = true;
        }    
    }

    @action
    public endLoading = () => {
        this.rootStore.loadingStore.isLoading = false;
    }
}