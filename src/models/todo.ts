import { IUserSerializer } from './user';

export interface ITodoSerializer {
    id: number;
    content: string;
    user: IUserSerializer;
    like: number;
    createdAt: string;
    completedAt: string;
    isCompleted: boolean;
}
