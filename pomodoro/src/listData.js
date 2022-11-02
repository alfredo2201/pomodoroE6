import { v4 as uuidv4 } from "uuid";
window.onload = ( async () => {
  const responseData = await fetch("http://127.0.0.1:3000/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const data = await responseData.json();
  console.log(data);
  await addTask(data);
})();


const addTask = async(values) => {
  for (let item of values) {
    if (item.status === "to_do") {
    listData[0].tasks.push(item);
    } else if (item.status === "in_progress") {
      listData[0].tasks.push(item);
    } else if (item.status === "done") {
      listData[0].tasks.push(item);
    }
  }
};

export const listData = [
  {
    id: uuidv4(),
    title: " 📃 To do",
    tasks: [],
  },
  {
    id: uuidv4(),
    title: " ✏️ In progress",
    tasks: [],
  },
  {
    id: uuidv4(),
    title: " ✔️ Completed",
    tasks: [],
  },
];


