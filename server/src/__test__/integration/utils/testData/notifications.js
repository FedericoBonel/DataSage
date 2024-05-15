/** Testing data for notifications */
export default [
    // Janes notifications
    {
        _id: "66309dc2c16105f754eaecad",
        from: {
            _id: "661645f35333647769e601ac",
            names: "john",
            lastnames: "doe",
        },
        to: {
            _id: "6629c9afb2066717d74c3ec7",
            names: "jane",
            lastnames: "smith",
        },
        type: {
            _id: "662a047746b19cf3049e2cf3",
            name: "chat_invitation",
        },
        relatedEntityId: "661b53ab0e4f9aaf2a83d80a",
        relatedEntityType: {
            _id: "662a041fe9d81b015e9b9218",
            name: "chat",
        },
        isRead: true,
        createdAt: new Date("2024-04-30T07:29:06.046Z"),
        updatedAt: new Date("2024-05-02T06:29:18.354Z"),
    },
    // Johns notifications
    {
        _id: "66309dc2c16105f754eaedad",
        from: {
            _id: "6629c9afb2066717d74c3ec7",
            names: "jane",
            lastnames: "smith",
        },
        to: {
            _id: "661645f35333647769e601ac",
            names: "john",
            lastnames: "doe",
        },
        type: {
            _id: "662a047746b19cf3049e2cf3",
            name: "chat_invitation",
        },
        relatedEntityId: "66431cbb3b3d919c0412dccb",
        relatedEntityType: {
            _id: "662a041fe9d81b015e9b9218",
            name: "chat",
        },
        isRead: false,
        createdAt: new Date("2024-04-30T07:29:06.046Z"),
        updatedAt: new Date("2024-05-02T06:29:18.354Z"),
    },
    {
        _id: "66309dc2c16105f754eaedaa",
        from: {
            _id: "6629c9afb2066717d74c3ec7",
            names: "jane",
            lastnames: "smith",
        },
        to: {
            _id: "661645f35333647769e601ac",
            names: "john",
            lastnames: "doe",
        },
        type: {
            _id: "662a047746b19cf3049e2cf3",
            name: "chat_invitation",
        },
        relatedEntityId: "6632f3dd38353a255cbaee88",
        relatedEntityType: {
            _id: "662a041fe9d81b015e9b9218",
            name: "chat",
        },
        isRead: true,
        createdAt: new Date("2024-04-30T07:29:06.046Z"),
        updatedAt: new Date("2024-05-02T06:29:18.354Z"),
    },
];
