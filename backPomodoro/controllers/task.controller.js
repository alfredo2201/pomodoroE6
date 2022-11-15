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
            const {title, status} = req.body;
            const newTask = await repoTask.save({title, status});
            res.status(200).send(newTask);
        }catch(error){
            next(error);
        }
    },
    list: async (req,res,next) => {
        try{
            const tasks = await repoTask.findAll();
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
    findOne:async (req,res,next) => {
        try{
            // console.log('help me');
            if (!req.params) {
                const error = new Error('Bad Request');
                error.httpStatusCode = 400;
                next(error);
                return;
            }
            // console.log('params->',req.params);
            const {title} = req.params
            const tasks = await repoTask.findOneByTitle({title});
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
        const {task} = req.body;
        const taskFound = await repoTask.findOneByTitle(task)
        console.log(taskFound)
        if (!taskFound) {
            const error = new Error('task not found');
            error.httpStatusCode = 400;
            next(error);
            return;
        }
        const newTask = {...taskFound.dataValues,...task}
        const taskUpdated = await repoTask.update(newTask);
        if (taskUpdated === 0) {
            const error = new Error('task not found');
            error.httpStatusCode = 400;
            next(error);
        }
        res.status(200).send(taskUpdated)
        }catch(error){
            next(error);
        }
    },
    updateTitle: async(req, res, next) =>{
        try{
            if(!req.body || !req.params){
                const error = new Error('Bad Request');
                error.httpStatusCode = 400;
                next(error);
                return;
            }

        const {task} = req.body;
        const {title} = req.params;
        const taskFound = await repoTask.findOneByTitle({title: title});
        if (!taskFound) {
            const error = new Error('task not found');
            error.httpStatusCode = 400;
            next(error);
            return;
        }
        const newTask = {...taskFound.dataValues}
        newTask.title = task;
        const taskUpdated = await repoTask.updateTitle({newTitle: newTask.title, title: title})
        if (taskUpdated === 0) {
            const error = new Error('Client not found');
            error.httpStatusCode = 400;
            next(error);
        }
        res.status(200).send(taskUpdated)
        }catch(error){
            next(error);
        }
    }
    ,
    delete: async (req,res,next) => {
        try{
            if (!req.params) {
                const error = new Error('Bad Request');
                error.httpStatusCode = 400;
                next(error);
                return;
            }
            const {title} = req.params;
            await repoTask.deleteOne({title});
        }catch(error){
            next(error);
        }
    }
}