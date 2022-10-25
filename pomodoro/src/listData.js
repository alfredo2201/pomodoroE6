import { v4 as uuidv4 } from "uuid";

export const listData = [
  {
    id: uuidv4(),
    title: ' 📃 To do',
    tasks: [
      {
        id: uuidv4(),
        title: ' Eat',
      },
      {
        id: uuidv4(),
        title: 'Clean',
      },
      {
        id: uuidv4(),
        title: 'Sleep',
      },
      {
        id: uuidv4(),
        title: 'Do homework',
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
      },
      {
        id: uuidv4(),
        title: "Learn Spanish",
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
      },
      {
        id: uuidv4(),
        title: "Play videogames",
      },
    ],
  },
];
