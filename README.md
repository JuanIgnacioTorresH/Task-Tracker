# Task-Tracker

### How to Use

Download repository and with a cli use in current repository
npm link
Next, you can use task-cli with the following commands
To add a new task
>task-cli add
To delete a task (you need the id from list)
>task-cli delete [id]
To update a task (you need the id from list)
>task-cli update [id] [new description]
To mark a task as in-process (you need id from list)
>task-cli mark-in-process [id]
To mark a task as done (you need id from list)
>task-cli mark-done [id]
To list all tasks
>task-cli list
To list todo tasks
>task-cli list todo
To list tasks in process
>task-cli list in-process
To list done tasks
>task-cli list done