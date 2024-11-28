#!/usr/bin/env node
const fs = require('fs')
const now = new Date

let tasks

if (fs.existsSync('./tasks.json')) {
    tasks = JSON.parse(fs.readFileSync('./tasks.json', 'utf-8', function(err){
        if(err){
            console.log('Error')
        }
    }))
} else {
    fs.writeFileSync("./tasks.json", '[]', function(err){
        if (err){
            console.log('Error saving data')
        }
    })
}


if (process.argv[2] === 'add'){
    let object = {
        id: checkHighestId(tasks) + 1,
        description: process.argv[3],
        status: "todo",
        createdAt: now,
        updatedAt: now
    }

    tasks.push(object)
    fs.writeFileSync("./tasks.json", JSON.stringify(tasks), function(err){
        if (err){
            console.log('Error saving data')
        }
    })
}

if (process.argv[2] === 'update'){
    let id = Number(process.argv[3])

    tasks = tasks.map(task => {
        if (task.id === id){
            task.description = process.argv[4]
        }
        return task
    })

    fs.writeFile("tasks.json", JSON.stringify(tasks), function(err){
        if (err) throw err;
    })

    console.log('Updated Succesfully')
}

if (process.argv[2] === 'delete'){
    let id = Number(process.argv[3])
    tasks = tasks.filter((task) => task.id != id)
    
    fs.writeFile("tasks.json", JSON.stringify(tasks), function(err){
        if (err) throw err;
    })
    console.log('Deleted Succesfully')
}

if (process.argv[2] === 'mark-in-process'){
    let id = Number(process.argv[3])

    tasks = tasks.map(task => {
        if (task.id === id){
            task.status = 'in-process'
        }
        return task
    })

    fs.writeFile("tasks.json", JSON.stringify(tasks), function(err){
        if (err) throw err;
    })

    console.log('Updated Succesfully')
}

if (process.argv[2] === 'mark-done'){
    let id = Number(process.argv[3])
    tasks = tasks.map(task => {
        if (task.id === id){
            task.status = 'done'
        }
        return task
    })

    fs.writeFile("tasks.json", JSON.stringify(tasks), function(err){
        if (err) throw err;
    })

    console.log('Updated Succesfully')
}



if (process.argv[2] === 'list'){
    if (process.argv[3] === undefined){
        console.log(tasks)
    } else if (process.argv[3] === 'todo'){
        let list = []
        for(let task of tasks){
            if (task.status === 'todo'){
                list.push(task)
            }
        }

        console.log(list)
    } else if (process.argv[3] === 'done'){
        let list = []
        for(let task of tasks){
            if (task.status === 'done'){
                list.push(task)
            }
        }

        console.log(list)
    } else if (process.argv[3] === 'in-process'){
        let list = []
        for(let task of tasks){
            if (task.status === 'in-process'){
                list.push(task)
            }
        }

        console.log(list)      
    } else {
        console.log("Not a valid status. Use 'done','todo' or 'in-process'")
    }
}

function checkHighestId(object){
    let tracker = 0

    for (task of tasks) {
      if (task.id > tracker) {
        tracker = task.id
      }
    }
  
    return tracker
}