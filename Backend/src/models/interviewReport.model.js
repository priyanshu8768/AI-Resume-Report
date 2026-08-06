import mongoose , {Schema} from 'mongoose';



const technicalQuestionSchema = new Schema({
    question: {
        type:String,
        required:[true, "tech qstn required"]
    },
    intention: {
        type:String,
        required:[true, 'intention is required']
    },
    answer:{
        type:String,
        required: [true,"answer is required"]
    }
},{
    _id : false
})
const behaviouralQuestionSchema = new Schema({
    question: {
        type:String,
        required:[true, "behavioural qstn required"]
    },
    intention: {
        type:String,
        required:[true, 'intention is required']
    },
    answer:{
        type:String,
        required: [true,"answer is required"]
    }
},{
    _id : false
})


const skillGapSchema = new Schema({
    skill:{
        type:String,
        required:[true,'skill is required']
    },
    severity:{
        type:String,
        enum: ['low', 'medium', 'high'],
        required:[true, 'severity is required']
    }
},{
    _id:false
})

const preparationPlanSchema = new Schema({
    day:{
        type:Number,
        required:[true,""]
    },
    focus:{
        type:String,
        required:[true, ""]
    },
    tasks:[{
        type:String,
        required:[true, ""]
    }]
})


const interviewReportSchema = new Schema ({
    jobDescription : {
        type: String,
        required:[true, "Job description is required"]
    },
    resume:{
        type: String,
    },
    selfDescription:{
        type: String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestion:[technicalQuestionSchema],
    behavioralQuestion:[behaviouralQuestionSchema],
    skillGap:[skillGapSchema],
    preparationPlan:[preparationPlanSchema] ,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title:{
        type:String,
        required:[true, "Title is required"]
    } 
},{
    timestamps:true
})



const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema);

export {interviewReportModel};