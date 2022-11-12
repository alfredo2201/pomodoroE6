import { Task } from "../models/Task.js";
import { Op } from "sequelize";

const save = async (value) => {
  const { title, status } = value;
  const newTask = await Task.create({
    title: title,
    status: status,
  });
  return newTask;
};

const update = async (value) => {
  const { id, status, title} = value; 
  const updateTask = await Task.update({status },{   
    where: {
      title: title
    }
  });
  return updateTask;
};

const updateTitle = async(value)=>{
  const {newTitle, title} = value;
  const updateTask = await Task.update({title: newTitle},{
    where:{
      title: title
    }
  })
  return updateTask;
}

const findAll = async () => {
  //select * from tabla order by id asc
  return await Task.findAll({ order: [["createdAt", "DESC"]] });
};

const findOneByTitle = async (value) => {
  const { title } = value;
  const task = await Task.findOne({
    where: { title: title },
  });
  // console.log('task found->', task);
  return task;
};
const deleteOne = async (value) => {
  const { title } = value;
  return await Task.destroy({
    where: { title: title },
  });
};
export { save, update, updateTitle,findAll, findOneByTitle, deleteOne };
