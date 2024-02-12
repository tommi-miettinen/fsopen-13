import { DataTypes } from "sequelize";
import { sequelize as db } from "../util/db.js";

const Session = db.define("session", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Session;
