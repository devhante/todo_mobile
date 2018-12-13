import AppStore from "./appStore";
import AxiosStore from "./axiosStore";
import DeleteStore from "./deleteStore";
import LoadingStore from "./loadingStore";
import ModalStore from "./modalStore";
import SearchStore from "./searchStore";
import TodoStore from "./todoStore";
import UserStore from "./userStore";

export default class RootStore {
    public appStore: AppStore;
    public axiosStore: AxiosStore;
    public deleteStore: DeleteStore;
    public loadingStore: LoadingStore;
    public modalStore: ModalStore;
    public searchStore: SearchStore;
    public todoStore: TodoStore;
    public userStore: UserStore;
    
    constructor() {
        this.appStore = new AppStore(this);
        this.axiosStore = new AxiosStore(this);
        this.deleteStore = new DeleteStore(this);
        this.loadingStore = new LoadingStore(this);
        this.modalStore = new ModalStore(this);
        this.searchStore = new SearchStore(this);
        this.todoStore = new TodoStore(this);
        this.userStore = new UserStore(this);
    }
}