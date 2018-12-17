interface IUserSerializer {
    id: number;
    username: string;
    authToken: string;
    name: string;
}

class User {
    public id: number;
    public username: string;
    public authToken: string;
    public name: string;

    constructor(value: IUserSerializer) {
        this.id = value.id;
        this.username = value.username;
        this.authToken = value.authToken;
        this.name = value.name;
    }
}

interface ITodoSerializer {
    id: number;
    content: string;
    user: IUserSerializer;
    like: number;
    createdAt: string;
    completedAt: string;
    isCompleted: boolean;
}

export { IUserSerializer, User, ITodoSerializer };
