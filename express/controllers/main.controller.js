const shortid = require("shortid");

const toDoListController = function(repository) {
    const controller = {
        getHomePage: function(req, res) {
            res.json('To Do Lists API Server');
        },
        getTasks: async function(req, res) {
            try {
                const data = await repository.getTasks();

                return res.status(200).json({
                    data: data[0][0]
                })
            } catch (err) {
                return res.status(error.errorCode).json({
                  errorMessage: error.errorMessage  
                })
            }
        },
        getTask: async function(req, res) {
            try {
                const taskId = req.params.taskId;
                
                if (!taskId) {
                    throw new Error({
                        errorCode: 400,
                        errorMessage: 'Missing or invalid parameters'
                    })
                }

                await repository.getTask(taskId);

                if (!data[0][0][0]) {
                    throw new Error({
                        errorCode: 404,
                        errorMessage: 'Task not found'
                    })
                }

                return res.status(200).json({
                    data: data[0][0]
                })
            } catch (err) {
                return res.status(error.errorCode).json({
                  errorMessage: error.errorMessage  
                })
            }
        },
        createTask: async function(req, res) {
            try {
                const payload = req.body

                const taskId = shortid.generate();
                const taskTitle = req.body.taskTitle;
                const taskDescription = req.body.taskDescription;

                if (!taskId || !taskTitle || !taskDescription) {
                    throw new Error({
                        errorCode: 400,
                        errorMessage: 'Missing or invalid parameters'
                    })
                }
                
                await repository.createTask(taskId, taskTitle, taskDescription);

                return res.status(200).json({
                    data: payload
                })
            } catch (err) {
                return res.status(error.errorCode).json({
                  errorMessage: error.errorMessage  
                })
            }
        },
        updateTask: async function(req, res) {
            try {
                const payload = req.body;

                const taskId = req.params.taskId;
                const taskTitle = payload.taskTitle;
                const taskDescription = payload.taskDescription;

                if (!taskId || !taskTitle || !taskDescription) {
                    throw new Error({
                        errorCode: 400,
                        errorMessage: 'Missing or invalid parameters'
                    })
                }

                const data = await repository.updateTask(taskId, taskTitle, taskDescription);

                if (!data[0][0][0]) {
                    throw new Error({
                        errorCode: 404,
                        errorMessage: 'Task not found'
                    })
                }

                return res.status(200).json({
                    data: payload
                })
            } catch (err) {
                return res.status(error.errorCode).json({
                  errorMessage: error.errorMessage  
                })
            }
        },
        deleteTask: async function(req, res) {
            try {
                const taskId = req.params.taskId;

                if (!taskId) {
                    throw new Error({
                        errorCode: 400,
                        errorMessage: 'Missing or invalid parameters'
                    })
                }

                await repository.deleteTask(taskId);

                return res.status(200).json({
                    data: taskId
                })
            } catch (err) {
                return res.status(error.errorCode).json({
                  errorMessage: error.errorMessage  
                })
            }
        }
    }

    return controller;
};

module.exports = toDoListController;