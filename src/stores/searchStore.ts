import { action, observable } from "mobx";
import RootStore from "./rootStore";

export default class SearchStore {
  @observable public searchWord = '';
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  public setSearchWord = (value: string) => {
    this.rootStore.searchStore.searchWord = value;
  }
}