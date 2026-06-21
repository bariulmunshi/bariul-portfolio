import dotenv from "dotenv";

import connectDB from "./config/db.js";

import Admin from "./models/Admin.js";

dotenv.config();

connectDB();

const createAdmin = async () => {
    try {
        const admin =
            await Admin.create({
                email:
                    "mdbariulmunshi@gmail.com",

                password:
                    "BariulAdmin123",
            });
console.log("Creating admin...");
        console.log(
            "Admin Created:"
        );

        console.log(admin.email);

        process.exit();
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

createAdmin();