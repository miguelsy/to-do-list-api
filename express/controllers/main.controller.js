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
                return res.status(err.code || 500).json({
                    errorMessage: err.message  
                })
            }
        },
        getTask: async function(req, res) {
            try {
                const taskId = req.params.taskId;
                
                if (!taskId) {
                    const error = new Error('Missing or invalid parameters');
                    error.code = 400;
                    throw error;
                }

                const data = await repository.getTask(taskId);

                if (!data[0][0][0]) {
                    const error = new Error('Task not found');
                    error.code = 404;
                    throw error;
                }

                return res.status(200).json({
                    data: data[0][0][0]
                })
            } catch (err) {
                return res.status(err.code || 500).json({
                    errorMessage: err.message  
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
                    const error = new Error('Missing or invalid parameters');
                    error.code = 400;
                    throw error;
                }
                
                await repository.createTask(taskId, taskTitle, taskDescription);

                return res.status(200).json({
                    data: payload
                })
            } catch (err) {
                return res.status(err.code || 500).json({
                  errorMessage: err.message  
                })
            }
        },
        updateTaskOrder: async function(req, res) {
            try {
                const payload = req.body;

                const taskId = req.params.taskId;
                const oldTaskPosition = payload.oldTaskPosition;
                const newTaskPosition = payload.newTaskPosition;

                const maxTaskPositionData = await repository.getMaxTaskPosition(); 
                const maxTaskPosition = maxTaskPositionData[0][0][0]['maxTaskPosition'];

                if (!taskId || !oldTaskPosition || !newTaskPosition || (newTaskPosition < 0) || (newTaskPosition > maxTaskPosition)) {
                    const error = new Error('Missing or invalid parameters');
                    error.code = 400;
                    throw error;
                }

                if (newTaskPosition > oldTaskPosition) {
                    await repository.decrementTaskPositions(oldTaskPosition, newTaskPosition);
                } else if (newTaskPosition < oldTaskPosition) {
                    await repository.incrementTaskPositions(oldTaskPosition, newTaskPosition);
                }

                await repository.updateTaskPosition(taskId, newTaskPosition);

                return res.status(200).json({
                    data: {
                        taskId: taskId,
                        oldTaskPosition: oldTaskPosition,
                        newTaskPosition: newTaskPosition
                    }
                })
            } catch (err) {
                return res.status(err.code || 500).json({
                  errorMessage: err.message  
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
                    const error = new Error('Missing or invalid parameters');
                    error.code = 400;
                    throw error;
                }

                const taskToUpdateData = await repository.getTask(taskId);
                const taskToUpdate = taskToUpdateData[0][0][0];

                if (!taskToUpdate) {
                    const error = new Error('Task not found');
                    error.code = 404;
                    throw error;
                }

                await repository.updateTask(taskId, taskTitle, taskDescription);

                return res.status(200).json({
                    data: {
                        taskId: taskId,
                        taskTitle: taskTitle,
                        taskDescription: taskDescription
                    }
                })
            } catch (err) {
                return res.status(err.code || 500).json({
                  errorMessage: err.message  
                })
            }
        },
        deleteTask: async function(req, res) {
            try {
                const taskId = req.params.taskId;

                if (!taskId) {
                    const error = new Error('Missing or invalid parameters');
                    error.code = 400;
                    throw error;
                }

                await repository.deleteTask(taskId);

                return res.status(200).json({
                    data: { taskId: taskId }
                })
            } catch (err) {
                return res.status(err.code || 500).json({
                  errorMessage: err.message  
                })
            }
        }
    }

    return controller;
};

module.exports = toDoListController;