export interface Book {
    id: string;
    volumeInfo: {
        title: string;
        imageLinks?: {
            thumbnail?: string;
            smallThumbnail?: string;
        };
        authors?: string[];
        description?: string;
        categories: string[];
        publisher?: string;
        publishedDate?: Date;
    };
    reviews: Reviews[];
}
export interface Reviews {
    id: string;
    title: string;
    content: string;
    rating?: number;
    author: {
        name: string;
        id: string;
    };
    updatedAt: Date;
    _counts: {
        like: number;
    };
}
