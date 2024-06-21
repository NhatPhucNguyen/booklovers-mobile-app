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
        publishedDate?: string;
    };
    reviews: Review[];
}
export interface Review {
    id: string;
    content: string;
    rating?: number;
    author: {
        name: string;
        id: string;
        avatar?: string;
    };
    updatedAt: Date;
    _counts: {
        like: number;
    };
}
