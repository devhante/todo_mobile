import { action, observable } from "mobx"
import { TodoSerializer } from '../serializer';
import RootStore from "./rootStore";

export default class TodoStore {
    @observable public todoList: TodoSerializer[] = [];
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action
    public setTodoList = (data: TodoSerializer[]) => {
        this.rootStore.todoStore.todoList = data;
    }

    @action
    public addTodo = (data: TodoSerializer) => {
        this.rootStore.todoStore.todoList.push(data);
    }

    @action
    public setLike = (id: number, like: number) => {
        this.rootStore.todoStore.todoList.forEach((item) => {
            if(item.id === id) {
                item.like = like;
            }
        });
    }

    @action
    public revertTodo = (id: number) => {
        this.rootStore.todoStore.todoList.forEach((item) => {
            if(item.id === id) {
                item.isCompleted = false;
            }
        })
    }

    @action
    public completeTodo = (id: number, completedAt: string) => {
        this.rootStore.todoStore.todoList.forEach((item) => {
            if(item.id === id) {
                item.isCompleted = true;
                item.completedAt = completedAt;
            }
        })
    }

    @action
    public deleteTodo = (id: number) => {
        let index = 0;
        this.rootStore.todoStore.todoList.forEach((item) => {
            console.log(item.id);
            console.log(id);
            if(item.id === id) {
                console.log(id);
                this.rootStore.todoStore.todoList.splice(index, 1);
            }
            index += 1;
        });
    }

    
}