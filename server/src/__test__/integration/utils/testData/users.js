import bcrypt from "bcrypt";

const testingPasswordSalt = 2;

/** Testing data for users */
export default [
    {
        _id: "661645f35333647769e601ac",
        names: "john",
        lastnames: "doe",
        email: "john.doe@example.com",
        password: { content: await bcrypt.hash("testingPassword", testingPasswordSalt) },
        isAdmin: false,
        createdAt: new Date("2024-04-25T03:10:39.273Z"),
        updatedAt: new Date("2024-04-25T03:10:39.273Z"),
    },
    {
        _id: "6629c9afb2066717d74c3ec7",
        names: "jane",
        lastnames: "smith",
        email: "jane.smith@example.com",
        password: { content: await bcrypt.hash("testingPassword", testingPasswordSalt) },
        isAdmin: false,
        createdAt: new Date("2024-04-25T03:10:39.273Z"),
        updatedAt: new Date("2024-04-25T03:10:39.273Z"),
    },
];
