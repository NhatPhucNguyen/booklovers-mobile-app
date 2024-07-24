export interface Group {
    id: string;
    name: string;
    description?: string;
    image?: string;
    creator: User;
    members: User[];
    _count: {
        members: number;
        posts: number;
    };
    createdAt: string;
}
interface User {
    id: string;
    name: string;
    avatar?: string;
}
export interface Discussion {
    id: string;
    content: string;
    author: User;
    updatedAt: Date;
    _count: {
        likes: number;
    };
    likes: { id: string }[];
}
