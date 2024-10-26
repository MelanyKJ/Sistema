import { json } from 'express';
import Task  from '../models/task.model.js'

//LISTAR
export const getTasks = async (req, res) =>{
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user')
     
    res.json(tasks);
};

export const createTasks = async (req, res) =>{
    const {title, description, date} = req.body

    console.log(req.user);

    const newTask = new Task({
        title,
        description,
        date,
        //PARA SABER QUE USUARIO LO ESTA CREANDO
        user:req.user.id
    })
    const savedTask= await newTask.save();
    res.json(savedTask);
};

//LISTAR UNO
export const getTask = async (req, res) =>{
    const task = await Task.findById(req.params.id).populate('user');
    if(!task) return res.status(404).json({message:  'Task no encontrada'})

    res.json(task)

};

//ELIMINAR
export const deleteTasks = async (req, res) =>{
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message:  'Task eliminada'})
return res.sendStatus(204);
};

export const updateTask = async (req, res) =>{
    const task = await Task.findByIdAndUpdate(req.params.id, req.body,{
        //YA QUE SIN ESTO NO ME DEVOLVERIA EL DATO NUEVO SINO EL ANTIGUNO
        new: true
    })
    if(!task) return res.status(404).json({message:  'Task no encontrada'})
        res.json(task)
};

