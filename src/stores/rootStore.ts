import UserStore from './userStore'

export default class RootStore {
    public userStore: UserStore;
    
    constructor() {
        this.userStore = new UserStore(this);
    }
}