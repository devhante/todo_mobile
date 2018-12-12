export interface UserSerializer {
    id: number;
    username: string
    authToken: string;
    name: string;
}

export class User {
    id: number;
    username: string
    authToken: string;
    name: string;
    
    constructor(value: UserSerializer) {
        this.id = value.id;
        this.username = value.username;
        this.authToken = value.authToken;
        this.name = value.name;
    }
}

export interface TodoSerializer {
    id: number;
    content: string;
    user: UserSerializer;
    like: number;
    createdAt: string;
    completedAt: string;
    isCompleted: boolean;
}