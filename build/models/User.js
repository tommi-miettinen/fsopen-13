import { DataTypes } from "sequelize";
import db from "../db.js";
const User = db.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
});
export default User;
