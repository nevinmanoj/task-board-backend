import mongoose from "mongoose";

const taskschema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  userID:{
    type: String,
    required: true,
  },
  addedDate:{
    type: Date,
    required:true
  },
  completionDate:{
    type:Date,
    required:false
  },
  isCompleted:{
    type:Boolean,
    required:true
  }

});

const TaskSchema = mongoose.model("TaskSchema", taskschema);

export default TaskSchema;