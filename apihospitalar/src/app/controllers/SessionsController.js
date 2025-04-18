import jwt from "jsonwebtoken";
import User from "../models/User.js";

class SessionsController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        const passwordMatched = await user.checkPassword(password);

        if (!passwordMatched) {
            return res.status(401).json({ error: "Password does not match" });
        }

        const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, {
            expiresIn: "7d",
        });

        return res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
}

export default new SessionsController();
