import { action, observable } from 'mobx';
import { ITodoSerializer } from '../serializer';
import RootStore from './rootStore';

export default class TodoStore {
    private rootStore: RootStore;

    @observable
    public todoList: ITodoSerializer[];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.todoList = [];
    }

    @action
    public setTodoList = (data: ITodoSerializer[]) => {
        this.rootStore.todoStore.todoList = data;
    };
}
