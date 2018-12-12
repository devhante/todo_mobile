import { action, observable } from "mobx"
import RootStore from "./rootStore";
import { TodoSerializer } from "../serializer";

export default class TodoStore {
    private rootStore: RootStore;

    @observable
    public todoList: TodoSerializer[]

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.todoList = [];
    }

    @action
    public setTodoList = (data: TodoSerializer[]) => {
        this.rootStore.todoStore.todoList = data;
    }

    @action
    public setLike = (id: number, like: number) => {
        this.rootStore.todoStore.todoList.forEach((item) => {
            if (item.id === id) {
                item.like = like;
            }
        });
    }

    @action
    public addTodo = (data: TodoSerializer) => {
        this.rootStore.todoStore.todoList.push(data);
    }

    @action
    public deleteTodo = (id: number) => {
        let index = 0;
        this.rootStore.todoStore.todoList.forEach((item) => {
            if (item.id === id) {
                this.rootStore.todoStore.todoList.splice(index, 1);
            }
            index += 1;
        });
    }

    @action
    public completeTodo = (id: number, completedAt: string) => {
        this.rootStore.todoStore.todoList.forEach((item) => {
            if (item.id === id) {
                item.isCompleted = true;
                item.completedAt = completedAt;
            }
        });
    }

    @action
    public revertTodo = (id: number) => {
        this.rootStore.todoStore.todoList.forEach((item) => {
            if (item.id === id) {
                item.isCompleted = false;
            }
        });
    }
}