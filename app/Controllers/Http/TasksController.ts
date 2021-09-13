import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TodoList from "App/Models/TodoList";

export default class TasksController {
    async taskList() {
        return TodoList.all();
    }

    async singleTask({params}:HttpContextContract) {
        let singleTask = await TodoList.query().where("id", params.id).first()
        // console.log(singleTask?.task_title)
        return { 
            singleTask: singleTask
        };
    }

    async createTask({request}:HttpContextContract){
        const body = request.body();
        const task = await TodoList.create(body);
        return task;
    }

    async updateTask({params, request}:HttpContextContract) {
        const body = request.body();
        const task = await TodoList.findOrFail(params.id)
        task.task_title = body.task_title
        task.is_done = body.is_done
        return task.save()
    }

    async deleteTask({params}:HttpContextContract) {
        const task = await TodoList.findOrFail(params.id);
        return task.delete()
    }
}
