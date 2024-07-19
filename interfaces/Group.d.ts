export interface Group {
    id: string;
    name: string;
    description?: string;
    image?: string;
    creator?: User;
    members: User[];
    _count: {
        members: number;
        posts: number;
    };
}
interface User {
    id: string;
    name: string;
    avatar?: string;
}
