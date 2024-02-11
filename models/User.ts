import { DataTypes } from "sequelize";
import { sequelize as db } from "../util/db.js";

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
  admin: { type: DataTypes.BOOLEAN, defaultValue: false },
  disabled: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default User;
