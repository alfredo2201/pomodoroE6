import { Task } from "../models/Task";

const save = async (value) => {
  const { title } = value;
  const newTask = await Task.create({
    title: title,
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
  return await Task.findAll();
};

const findOne = async (value) => {
  const { idTask } = value;
  return await Task.findAll({
    where: {
      idTask: idTask,
    },
  });
};
const deleteOne = async (value) => {
  const { idTask } = value;
  return await Task.destroy({
    where: { idTask: idTask },
  });
};
export { save, update, findAll, findOne, deleteOne };
