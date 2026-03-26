import Todo from '../model/todo-model.js'

export const createTodo = async (req,res) =>{
   const todo = new Todo({
      text: req.body.text,
      completed: req.body.completed,
      user: req.user._id
   })
   // store data in the db
   try {
      const newTodo = await todo.save()
      res.status(200).json({message: "todo created successfully",newTodo})
   } catch (error) {
      res.status(400).json({message: "error occuring during creating todo"})
      console.log(error)
   }
}

export const getTodos = async (req,res)=>{
    try {
       const todos = await Todo.find({user: req.user._id});
       res.status(200).json({message: "todo fetched successfully",todos})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "error occuring in todo fetching"});
    }
}

export const updateTodo = async (req,res)=>{
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
        })
        res.status(200).json({message: "todo updated successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "error occuring in todo updation"});
    }
}

export const deleteTodo = async (req,res)=>{
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "todo deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "error occuring in todo deletion"});
    }
}