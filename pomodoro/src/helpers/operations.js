import axios from "axios";

export const actualizarTask = async (task) =>{
    console.log(task)
    await axios({
      method: 'put',
      url: `http://localhost:3000/task`,
      data:{
        task
      }
      });
} 

export const obtenTaskExistente = async (task) => {
    return await axios.get(
        `http://localhost:3000/existTasks/${task}`
      );
}

export const agregarTask = async (task) => {
    return await axios.post("http://localhost:3000/task", {
        title: task,
        status: "to_do",
      });
}