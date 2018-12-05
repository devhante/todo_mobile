import { action, observable } from "mobx"
import { UserSerializer } from '../serializer';
import RootStore from "./rootStore";

export default class UserStore {
    @observable public user = new UserSerializer();
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }


    @action
    public setUser = (user: UserSerializer) => {
        this.rootStore.userStore.user = user;
    }
}