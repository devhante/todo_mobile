import { action, observable } from "mobx"
import RootStore from "./rootStore";
import { User, UserSerializer } from "../serializer";

export default class UserStore {
    private rootStore: RootStore;

    @observable
    public user: User;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.user = new User({id: 0, username: '', authToken: '', name: ''});
    }

    @action
    public setUser = (user: UserSerializer) => {
        this.rootStore.userStore.user = user;
    }
}