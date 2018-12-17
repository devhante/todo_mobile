import { action, observable } from 'mobx';
import { IUserSerializer, User } from '../serializer';
import RootStore from './rootStore';

export default class UserStore {
    private rootStore: RootStore;

    @observable
    public user: User;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.user = new User({
            id: 0,
            username: '',
            authToken: '',
            name: ''
        });
    }

    @action
    public setUser = (user: IUserSerializer) => {
        this.rootStore.userStore.user = user;
    };
}
