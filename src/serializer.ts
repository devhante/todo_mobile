export class UserSerializer {
    public id = 0;
    public username = '';
    public authToken = '';
    public name = '';
}

export class TodoSerializer {
    public id = 0;
    public content = '';
    public user = new UserSerializer();
    public like = 0;
    public createdAt = '';
    public completedAt = '';
    public isCompleted = false;
}