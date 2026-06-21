import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

export const loginAdmin = async (
    req,
    res
) => {
    try {
        const { email, password } =
            req.body;

        const admin =
            await Admin.findOne({
                email,
            });

        if (
            admin &&
            (await admin.matchPassword(
                password
            ))
        ) {
            return res.json({
                success: true,

                token: generateToken(
                    admin._id
                ),

                admin: {
                    id: admin._id,

                    email:
                        admin.email,
                },
            });
        }

        res.status(401).json({
            success: false,

            message:
                "Invalid credentials",
        });
    } catch (error) {
        res.status(500).json({
            success: false,

            message:
                error.message,
        });
    }
};