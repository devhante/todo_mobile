import { action, observable } from "mobx";
import RootStore from "./rootStore";

export default class SearchStore {
    private rootStore: RootStore;

    @observable
    public searchWord: string;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.searchWord = '';
    }

    @action
    public setSearchWord = (word: string) => {
        this.rootStore.searchStore.searchWord = word;
    }
}