import {v4 as uuidv4} from 'uuid'

export const data = [
    {
        id: uuidv4(),
        title: 'To Do',
        tasks: [{
            id: uuidv4(),
            title: 'To do'
        },
        {
            id: uuidv4(),
            title: 'clean'
        },
        {
            id: uuidv4(),
            title: 'sleep'
        }
        ]
    },
    {
        id: uuidv4(),
        title: 'in progress',
        tasks: [
            {
                id: uuidv4(),
                title: 'lean css'
            },
            {
                id: uuidv4(),
                title: 'learn js'
            }
        ]
    },
    {
        id: uuidv4(),
        title: 'done',
        tasks: [
            {
                id: uuidv4(),
                title: 'ejercicie'
            },
            {
                id: uuidv4(),
                title: 'play videogames'
            }
        ]
    }
];