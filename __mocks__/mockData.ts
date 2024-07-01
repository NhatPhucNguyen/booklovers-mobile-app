export const mockBookData = [
    {
        id: "1",
        title: "Book Title",
        imageLinks: {
            thumbnail: "https://via.placeholder.com/150",
            smallThumbnail: "https://via.placeholder.com/50",
        },
        authors: ["Author Name"],
        description: "Book Description",
        categories: ["Category"],
        reviews: [
            {
                id: "1",
                title: "Review Title",
                content: "Review Content",
                rating: 5,
                author: {
                    name: "reviewer",
                    id: "1",
                    avatar: "default",
                },
                updatedAt: "1-1-2000",
                _count: {
                    likes: 1,
                },
                likes: [{ id: "1" }],
            },
        ],
    },
];
