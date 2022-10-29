import { DataType } from "sequelize";
import { sequelize } from "../connection.js";

export const Task = sequelize.define("tasks", {
  idTask: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataType.STRING(60),
    allowNull: false,
  },
  status:{
    type: DataType.EMUN({
        values: ['to_do', 'in_progress', 'done'],
        defaultValue: "to_do",
    })
  }
},{ timestamps: false });
