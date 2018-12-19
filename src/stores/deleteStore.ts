import { action, observable } from 'mobx';
import RootStore from './rootStore';

export default class DeleteStore {
    private rootStore: RootStore;

    @observable
    public isDeletable: boolean;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.isDeletable = false;
    }

    @action
    public changeDeletable = () => {
        this.rootStore.deleteStore.isDeletable = !this.isDeletable;
    };

    @action
    public disallowDelete = () => {
        this.rootStore.deleteStore.isDeletable = false;
    };
}
