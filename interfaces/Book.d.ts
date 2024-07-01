export interface Book {
    id: string;
    title: string;
    imageLinks?: {
        thumbnail: string;
        smallThumbnail: string;
        largeThumbnail: string;
    };
    authors?: string[];
    description?: string;
    categories: string[];
    publisher?: string;
    publishedDate?: string;
    reviews: Review[];
    avgRating?: number;
    userRating?: number;
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
    _count: {
        likes: number;
    };
    likes: { id: string }[];
}
