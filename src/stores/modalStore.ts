import { action, observable } from "mobx";
import RootStore from "./rootStore";

export default class ModalStore {
    private rootStore: RootStore;

    @observable
    public content: string

    @observable
    public isModalVisible: boolean;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.content = '';
        this.isModalVisible = false;
    }

    @action public setModalVisible = () => {
        this.isModalVisible = true;
    }

    @action public setModalInvisible = () => {
        this.isModalVisible = false;
        this.content = '';
    }
}