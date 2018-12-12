interface UserSerializer {
    id: number;
    username: string
    authToken: string;
    name: string;
}

class User {
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

interface TodoSerializer {
    id: number;
    content: string;
    user: UserSerializer;
    like: number;
    createdAt: string;
    completedAt: string;
    isCompleted: boolean;
}

export { UserSerializer, User, TodoSerializer }