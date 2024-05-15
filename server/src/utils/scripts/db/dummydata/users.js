import bcrypt from "bcrypt";
import config from "../../../../config/index.js";

const createRandomString = () => Math.floor(Math.random() * 100000000000000).toString(36);

const users = [
    {
        names: "john",
        lastnames: "doe",
        email: "john.doe@example.com",
        password: {
            content: await bcrypt.hash(createRandomString(), config.bcrypt.saltRounds),
        },
        isAdmin: false,
    },
    {
        names: "jane",
        lastnames: "smith",
        email: "jane.smith@example.com",
        password: {
            content: await bcrypt.hash(createRandomString(), config.bcrypt.saltRounds),
        },
        isAdmin: false,
    },
    {
        names: "michael",
        lastnames: "johnson",
        email: "michael.johnson@example.com",
        password: {
            content: await bcrypt.hash(createRandomString(), config.bcrypt.saltRounds),
        },
        isAdmin: false,
    },
    {
        names: "emily",
        lastnames: "brown",
        email: "emily.brown@example.com",
        password: {
            content: await bcrypt.hash(createRandomString(), config.bcrypt.saltRounds),
        },
        isAdmin: false,
    },
    {
        names: "david",
        lastnames: "wilson",
        email: "david.wilson@example.com",
        password: {
            content: await bcrypt.hash(createRandomString(), config.bcrypt.saltRounds),
        },
        isAdmin: false,
    },
    {
        names: "sarah",
        lastnames: "taylor",
        email: "sarah.taylor@example.com",
        password: {
            content: await bcrypt.hash(createRandomString(), config.bcrypt.saltRounds),
        },
        isAdmin: false,
    },
    {
        names: "james",
        lastnames: "martinez",
        email: "james.martinez@example.com",
        password: {
            content: await bcrypt.hash(createRandomString(), config.bcrypt.saltRounds),
        },
        isAdmin: false,
    },
    {
        names: "jessica",
        lastnames: "anderson",
        email: "jessica.anderson@example.com",
        password: {
            content: await bcrypt.hash(createRandomString(), config.bcrypt.saltRounds),
        },
        isAdmin: false,
    },
    {
        names: "daniel",
        lastnames: "thomas",
        email: "daniel.thomas@example.com",
        password: {
            content: await bcrypt.hash(createRandomString(), config.bcrypt.saltRounds),
        },
        isAdmin: false,
    },
    {
        names: "lisa",
        lastnames: "white",
        email: "lisa.white@example.com",
        password: {
            content: await bcrypt.hash(createRandomString(), config.bcrypt.saltRounds),
        },
        isAdmin: false,
    },
];

export default users;
