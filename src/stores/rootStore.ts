import { configure } from 'mobx';
import AxiosStore from './axiosStore';
import DeleteStore from './deleteStore';
import KeychainStore from './keychainStore';
import LoadingStore from './loadingStore';
import ModalStore from './modalStore';
import SearchStore from './searchStore';
import TodoStore from './todoStore';

configure({
    enforceActions: 'observed'
});

export default class RootStore {
    public axiosStore: AxiosStore;
    public deleteStore: DeleteStore;
    public keychainStore: KeychainStore;
    public loadingStore: LoadingStore;
    public modalStore: ModalStore;
    public searchStore: SearchStore;
    public todoStore: TodoStore;

    constructor() {
        this.axiosStore = new AxiosStore(this);
        this.deleteStore = new DeleteStore(this);
        this.keychainStore = new KeychainStore(this);
        this.loadingStore = new LoadingStore(this);
        this.modalStore = new ModalStore(this);
        this.searchStore = new SearchStore(this);
        this.todoStore = new TodoStore(this);
    }
}

const STORE_NAME = 'rootStore';

interface IStoreInjectedProps {
    [STORE_NAME]?: RootStore;
}

export { RootStore, STORE_NAME, IStoreInjectedProps };
