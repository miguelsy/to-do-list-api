const toDoListRepository = function(db) {
  const repo = {
    getTasks: async function() {
      try {
        return await db.raw(`CALL get_tasks();`)
      } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
      }
    },
    getTask: async function(taskId) {
      try {
        return await db.raw(`CALL get_task(?);`, [
          taskId
        ])
      } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
      }
    },
    createTask: async function(taskId, taskTitle, taskDescription) {
      try {
        return await db.raw(`CALL create_task(?, ?, ?);`, [
          taskId,
          taskTitle,
          taskDescription
        ])
      } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
      }
    },
    updateTask: async function(taskId, taskTitle, taskDescription) {
      try {
        return await db.raw(`CALL update_task(?, ?, ?);`, [
          taskId,
          taskTitle,
          taskDescription
        ])
      } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
      }
    },
    deleteTask: async function(taskId) {
      try {
        return await db.raw(`CALL delete_task(?);`, [
          taskId
        ])
      } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
      }
    }
  }

  return repo;
}

module.exports = toDoListRepository;