import { action, observable } from "mobx"
import { UserSerializer, User } from '../serializer';
import RootStore from "./rootStore";

export default class UserStore {
    @observable public user: User;
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.user = new User({id: 0, username: '', authToken: '', name: ''});
        this.rootStore = rootStore;
    }

    @action
    public setUser = (user: UserSerializer) => {
        this.rootStore.userStore.user = user;
    }
}