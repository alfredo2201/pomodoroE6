import { Task } from "../models/Task.js";
import { Op } from "sequelize"

const save = async (value) => {
  const { title, status } = value;
  const newTask = await Task.create({
    title: title,
    status: status,
  });
  return newTask;
};

const update = async (value) => {
  const { idTask, status } = value;
  const updateTask = await Task.update({
    status: status,
    where: {
      idTask: idTask,
    },
  });
  return updateTask;
};

const findAll = async () => {
  //select * from tabla order by id asc
  return await Task.findAll({order:[['createdAt', 'DESC']]});
};

const findOne = async (value) => {
  const { title } = value;
  return await Task.findAll({
    where:{title}
    // where: {
    //   title: title,
    //   [Op.or]: [
    //     {
    //       status: "to_do",
    //     },
    //     {
    //       status: "in_progress",
    //     },
    //   ],
    // },
  }
  );
};
const deleteOne = async (value) => {
  const { title } = value;
  return await Task.destroy({
    where: { title: title },
  });
};
export { save, update, findAll, findOne, deleteOne };
