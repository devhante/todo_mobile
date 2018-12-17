import { action, observable } from 'mobx';
import RootStore from './rootStore';

export default class LoadingStore {
    private rootStore: RootStore;

    @observable
    public isLoading: boolean;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.isLoading = false;
    }

    @action
    public startLoading = () => {
        this.rootStore.loadingStore.isLoading = true;
    };

    @action
    public endLoading = () => {
        this.rootStore.loadingStore.isLoading = false;
    };
}
