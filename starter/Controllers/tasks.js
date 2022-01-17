const Task=require('../models/Task');
const asyncWrapper=require('../middleware/async');
 const {createCustomError}=require('../errors/custom-error')
const getAllTasks=asyncWrapper( async(req,res)=>{

    const tasks=await Task.find({});
    res.status(200).json({tasks})
   
} );


const createTask=asyncWrapper( async(req,res)=>{
  
    const task=await Task.create(req.body)
    res.status(201).json({task});

  
})
const getTask=asyncWrapper(
    async(req,res,next)=>{
   
        const {id:taskID}=req.params;
        // finding a task object using a specific param read up
        const task=await Task.findOne({_id:taskID});
       
        // if the id is null
        if(!task){
            const error=new Error("Not Found");
            error.status=404;
        return  next(createCustomError(`No task with id : ${taskID}`,404));
         
            // pass to next to express then to custom error handleer  
         //  return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({task});   
  }
) 


const updateTask=asyncWrapper(
    async(req,res)=>{
        const {id:taskID}=req.params;
        // running validators while updating
       const task=await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true});
       if(!task){
        return  next(createCustomError(`No task with id : ${taskID}`,404));
      
        //  return res.status(404).json({msg:`No task with id : ${taskID}`})
       }
      res.status(200).json({id:taskID,data:req.body});
    //   res.send("update tasks");
   } 
)

const deleteTask= asyncWrapper(
    async(req,res)=>{
   
        const {id:taskID} =req.params;
         const task=await Task.findOneAndDelete({_id:taskID});
         if(!task){
            return  next(createCustomError(`No task with id : ${taskID}`,404));
      
             //return res.status(404).json({msg:`No task with id :${taskID}`})
         }
         res.status(200).json({task})
       
       
    }
    
)

const editTask=asyncWrapper(
    async(req,res)=>{
   
        const {id:taskID}=req.params;
        // running validators while updating
       const task=await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true,overwrite:true});
       if(!task){
   
           return res.status(404).json({msg:`No task with id : ${taskID}`})
       }
   
      res.status(200).json({id:taskID,data:req.body});
   
      
    //   res.send("update tasks");
   }
) 



module.exports={
    createTask,
    getTask,
    getAllTasks,
    deleteTask,
    updateTask,
    editTask
}