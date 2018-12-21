import { AxiosResponse } from 'axios';
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
    public setTodoList = (todoList: ITodoSerializer[]) => {
        this.rootStore.todoStore.todoList = todoList;
    };

    @action
    public replaceTodo = (todo: ITodoSerializer) => {
        const newTodoList = this.rootStore.todoStore.todoList.map(item => {
            if (item.id === todo.id) {
                return todo;
            } else {
                return item;
            }
        });
        this.setTodoList(newTodoList);
    };

    public addTodo = async () => {
        const response = await this.rootStore.axiosStore.instance.post<
            ITodoSerializer
        >('todo/', {
            content: this.rootStore.modalStore.content
        });
        const newTodoList = [...this.todoList];
        newTodoList.push(response.data);
        this.setTodoList(newTodoList);
    };

    public deleteTodo = async (todo: ITodoSerializer) => {
        const response = (await this.rootStore.axiosStore.instance.delete(
            'todo/' + todo.id + '/'
        )) as AxiosResponse<ITodoSerializer>;
        const newTodoList = this.rootStore.todoStore.todoList.filter(
            item => item.id !== response.data.id
        );
        this.setTodoList(newTodoList);
    };

    public completeTodo = async (todo: ITodoSerializer) => {
        const response = await this.rootStore.axiosStore.instance.post<
            ITodoSerializer
        >('todo/' + todo.id + '/complete/');
        this.replaceTodo(response.data);
    };

    public revertTodo = async (todo: ITodoSerializer) => {
        const response = await this.rootStore.axiosStore.instance.post<
            ITodoSerializer
        >('todo/' + todo.id + '/revert_complete/');
        this.replaceTodo(response.data);
    };

    public addLike = async (todo: ITodoSerializer) => {
        const response = await this.rootStore.axiosStore.instance.post<
            ITodoSerializer
        >('todo/' + todo.id + '/add_like/');
        this.replaceTodo(response.data);
    };
}
