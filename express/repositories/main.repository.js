const toDoListRepository = function(db) {
  const repo = {
    getTasks: async function() {
      try {
        return await db.raw(`CALL get_tasks();`)
      } catch (err) {
        throw new Error({
          errorCode: 500,
          errorMessage: err.message
        });
      }
    },
    getTask: async function(taskId) {
      try {
        return await db.raw(`CALL get_task(?);`, [
          taskId
        ])
      } catch (err) {
        throw new Error({
          errorCode: 500,
          errorMessage: err.message
        });
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
        throw new Error({
          errorCode: 500,
          errorMessage: err.message
        });
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
        throw new Error({
          errorCode: 500,
          errorMessage: err.message
        });
      }
    },
    deleteTask: async function(taskId) {
      try {
        return await db.raw(`CALL delete_task(?);`, [
          taskId
        ])
      } catch (err) {
        throw new Error({
          errorCode: 500,
          errorMessage: err.message
        });
      }
    }
  }

  return repo;
}

module.exports = toDoListRepository;