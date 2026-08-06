import {PDFParse}  from "pdf-parse";
import { generateInterviewReport , generateResumePdf} from "../services/ai.service.js";
import { interviewReportModel } from "../models/interviewReport.model.js";
import { resume } from "../services/temp.js";


/**@description Generate interview report based on user input and resume */

const generateInterviewReportController = async (req,res) =>{
    const resumeFile = req.file

    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const {selfDescription , jobDescription} = req.body;

    const interviewReportByAI = await generateInterviewReport({
        resume : resumeContent.text ,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAI
    })

    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    })

}



/** @description Get interview report by ID
 * @access private
 */
const getInterviewReportController = async (req,res) =>{
    const {interviewId} = req.params;
    const interviewReport = await interviewReportModel.findOne({
        _id: interviewId,
        user: req.user.id
    })
    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }
    res.status(200).json({
        message:"Interview report fetched successfully",
        interviewReport
    })
}

/** @description Get all interview reports for the authenticated user
 * @access private
 */
const getAllInterviewReportsController = async (req,res) =>{
    const interviewReports = await interviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select('-resume -selfDescription -jobDescription -__v -technicalQuestion -behavioralQuestion -skillGap -preparationPlan')
    
    res.status(200).json({
        message:"Interview reports fetched successfully",
        interviewReports
    });
}


/**@description controller to generate resume as PDF */
const generateResumePdfController = async (req,res) =>{
    const {interviewReportId} = req.params;

    const interviewReport = await interviewReportModel.findById(interviewReportId);
    if (!interviewReport) {
        return res.status(404).json({
            message:"Interview report not found"
        });
    }

    const {resume, selfDescription, jobDescription} = interviewReport;



    const pdfBuffer = await generateResumePdf({
        resume,
        selfDescription,
        jobDescription  
    })



    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
        
    });

    // send raw PDF bytes so the client (browser/Postman) can render/download it
    
    res.status(200).send(pdfBuffer);
}

export  {generateInterviewReportController, getInterviewReportController, getAllInterviewReportsController, generateResumePdfController};