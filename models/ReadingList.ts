import { DataTypes } from "sequelize";
import { sequelize as db } from "../util/db.js";

const ReadingList = db.define("reading_list", {
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default ReadingList;
