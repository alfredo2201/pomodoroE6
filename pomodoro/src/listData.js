import { v4 as uuidv4 } from "uuid";

export const listData = [
  {
    id: uuidv4(),
    title: ' 📃 To do',
    tasks: [
      {
        id: uuidv4(),
        title: ' Eat',
        done: false,
      },
      {
        id: uuidv4(),
        title: 'Clean',
        done: false
      },
      {
        id: uuidv4(),
        title: 'Sleep',
        done: false
      },
      {
        id: uuidv4(),
        title: 'Do homework',
        done: false
      },
    ],
  },
  {
    id: uuidv4(),
    title:  ' ✏️ In progress',
    tasks: [
      {
        id: uuidv4(),
        title: 'Play guitar',
        done: false
      },
      {
        id: uuidv4(),
        title: "Learn Spanish",
        done: false
      },
    ],
  },
  {
    id: uuidv4(),
    title:' ✔️ Completed',
    tasks: [
      {
        id: uuidv4(),
        title: "Ejercicie",
        done: false
      },
      {
        id: uuidv4(),
        title: "Play videogames",
        done: false
      },
    ],
  },
];
