/** Testing data for collaborators */
export default [
    {
        _id: "661b53ab0e4f9aaf2a83d80f",
        user: {
            _id: "661645f35333647769e601ac",
            names: "john",
            lastnames: "doe",
            email: "john.doe@example.com",
        },
        chat: {
            _id: "661b53ab0e4f9aaf2a83d80a",
            name: "Cheat sheets",
            owner: {
                _id: "661645f35333647769e601ac",
                names: "john",
                lastnames: "doe",
            },
            createdAt: new Date("2024-04-14T03:55:23.822Z"),
        },
        hasJoined: true,
        permissions: [],
        createdAt: new Date("2024-04-14T03:55:23.851Z"),
        updatedAt: new Date("2024-04-25T02:15:25.449Z"),
    },
    {
        _id: "661f80982002a4f28c5006dc",
        user: {
            _id: "661645f35333647769e601ac",
            names: "john",
            lastnames: "doe",
            email: "john.doe@example.com",
        },
        chat: {
            _id: "661f80972002a4f28c5006d7",
            name: "Resumes",
            owner: {
                _id: "661645f35333647769e601ac",
                names: "john",
                lastnames: "doe",
            },
            createdAt: new Date(),
        },
        hasJoined: true,
        permissions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
