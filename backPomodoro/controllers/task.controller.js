import * as repoTask from '../data/repositories/task.repo.js'

export const TaskController = {
    create: async (req,res, next) => {
        try{
            if (!req.body) {
                const error = new Error('Bad Request');
                error.httpStatusCode = 400;
                next(error);
                return;
            }
        }catch(error){
            next(error);
        }
    },
    list: async (req,res,next) => {
        try{
            const tasks = await repoTask.list();
            if (!tasks) {
                const error = new Error('Error');
                error.httpStatusCode = 400;
                next(error);
            }
            res.status(200).send(tasks);
        }catch(error){
            next(error);
        }
    },
    update: async (req,res,next) => {
        try{
            if (!req.body) {
                const error = new Error('Bad Request');
                error.httpStatusCode = 400;
                next(error);
                return;
            }
        const {idTask,data} = req.body;
        const task = await repoTask.findOne({idTask})
        if (!task) {
            const error = new Error('task not found');
            error.httpStatusCode = 400;
            next(error);
            return;
        }
        const newTask = {...task.dataValues,...data}
        const taskUpdated = await repoTask.update(newTask);
        if (taskUpdated === 0) {
            const error = new Error('Client not found');
            error.httpStatusCode = 400;
            next(error);
        }
        res.status(200).send(taskUpdated)
        }catch(error){
            next(error);
        }
    },
    delete: async (req,res,next) => {
        try{
            if (!req.param) {
                const error = new Error('Bad Request');
                error.httpStatusCode = 400;
                next(error);
                return;
            }
        }catch(error){
            next(error);
        }
    }
}