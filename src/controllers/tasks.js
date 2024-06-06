//get tasks
import  TaskSchema  from "../modals/taskSchema.js"


const getTasks = async (req,res) => {
  try {
    const tasks = await TaskSchema.where("userID",req.decoded.userID).lean().exec();
    res.status(200).json({ message: 'GET All Tasks for user success',count:tasks.length, tasks,});
} catch (error) {
    res.status(401).json({ message: 'GET tasks failed' });
}
};
//create task
const addTask = async (req,res) => {
  try {
    const { title,desc,addedDate,completionDate,isCompleted } = req.body;
    const userID=req.decoded.userID;
    const newTask = new TaskSchema( { title,desc,addedDate,completionDate,isCompleted,userID });
    await newTask.save();
    res.status(200).json({ message: 'Task add success',data:newTask});
} catch (error) {
    res.status(401).json({ message: 'Task add failed' ,error});
}
};
//modify task
const modifyTask=async(req,res)=>{
  {
    try {
        const { title,desc,addedDate,completionDate,isCompleted,id } = req.body;
        const userID=req.decoded.userID;
        var taskfromDb=await TaskSchema.findById(id);

        if(!taskfromDb||taskfromDb['userID']!==userID){
          res.status(401).json({ message: 'Task modify failed'});
        }else{
          Object.assign(taskfromDb, {title,desc,addedDate,completionDate,isCompleted,userID});
          await taskfromDb.save();
          res.status(200).json({ message: 'Task modify success',data:taskfromDb});
        }
    } catch (error) {
        res.status(404).json({ message: 'Task modify failed'});
    }
  }
  
}
//delete task
const deleteTask=async(req,res)=>{
  try {
    const {id} = req.body;
    const userID=req.decoded.userID;
    var taskfromDb=await TaskSchema.findById(id);
    if(!taskfromDb||taskfromDb['userID']!==userID){
      res.status(401).json({ message: 'Task delete failed'});
    }else{
      await taskfromDb.deleteOne({ _id: id, userID: userID  });
      res.status(200).json({ message: 'Task delete success'});
    }
} catch (error) {
    res.status(404).json({ message: 'Task delete failed'});
}
}

export { getTasks, addTask,modifyTask,deleteTask };