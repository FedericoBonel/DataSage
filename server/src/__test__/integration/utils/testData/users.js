import bcrypt from "bcrypt";

const testingPasswordSalt = 2;

export const nonEncryptedUsers = [
    {
        _id: "661645f35333647769e601ac",
        names: "john",
        lastnames: "doe",
        email: "john.doe@example.com",
        password: { content: "testingPassword#1" },
        isAdmin: false,
        createdAt: new Date("2024-04-25T03:10:39.273Z"),
        updatedAt: new Date("2024-04-25T03:10:39.273Z"),
        verified: true,
        recoveryCode: {
            content: "6814d3f3-f617-4bbf-ac2f-3ae45cabd3c7",
            createdAt: new Date(),
        },
    },
    {
        _id: "6629c9afb2066717d74c3ec7",
        names: "jane",
        lastnames: "smith",
        email: "jane.smith@example.com",
        password: { content: "testingPassword#2" },
        isAdmin: false,
        createdAt: new Date("2024-04-25T03:10:39.273Z"),
        updatedAt: new Date("2024-04-25T03:10:39.273Z"),
        verified: true,
        recoveryCode: {
            content: "6814d3f3-f617-4bbf-ac2f-3ae45abcd3c7",
            createdAt: new Date(Date.now() - 60 * 60 * 1000),
        },
    },
    {
        _id: "664451b0c4bd45751bc41030",
        names: "lorenzo",
        lastnames: "smith",
        email: "lore.smith@example.com",
        password: { content: "testingPassword#3" },
        isAdmin: false,
        createdAt: new Date("2024-04-25T03:10:39.273Z"),
        updatedAt: new Date("2024-04-25T03:10:39.273Z"),
        verified: false,
        verificationCode: "6814d3f3-f617-4bbf-ac2f-3ae45cabd3c7",
    },
];

const hashedUsers = await Promise.all(
    nonEncryptedUsers.map(async (user) => ({
        ...user,
        password: { content: await bcrypt.hash(user.password.content, testingPasswordSalt) },
    }))
);

/** Testing data for users */
export default hashedUsers;
