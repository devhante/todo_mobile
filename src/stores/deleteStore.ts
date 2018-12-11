import { action, observable } from "mobx"
import RootStore from "./rootStore";

export default class deleteStore {
    @observable public isDeletable = false;
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }


    @action public allowDelete = () => {
        //this.isDeletable = true;
        this.isDeletable = !this.isDeletable;
    }

    @action public disallowDelete = () => {
        this.isDeletable = false;
    }

}