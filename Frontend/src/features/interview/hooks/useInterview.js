/* eslint-disable no-useless-assignment */
import {generateInterviewReport,getInterviewReportById, getAllInterviewReports ,getResumePdf} from "../services/interview.api.js";
import { useContext} from "react";
import {InterviewContext} from "../interview.context.jsx";
import html2pdf from 'html2pdf.js';

export const useInterview = () => {
    


    if(!InterviewContext){
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const {Loading,setLoading,report,setReport,reports,setReports} = useContext(InterviewContext);

    const generateReport = async ({resumeFile,selfDescription,jobDescription}) => {
        setLoading(true)
        let response= null;

        try{
            response = await generateInterviewReport({resumeFile,selfDescription,jobDescription});
            setReport(response.interviewReport);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }

       return response.interviewReport;
    }


    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try{
            response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }

      return response.interviewReport;  
    }

    const getAllReports = async () => { 
        setLoading(true)
       let response = null
        try{
            response = await getAllInterviewReports();
            setReports(response.interviewReports);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }

    return response.interviewReports; 
       
    }


    const getResume = async (interviewReportId) => {
        setLoading(true)
        let response = null 
        try{
            response = await getResumePdf(interviewReportId);
            
            const opt = {
                margin: 4,
                filename: `resume_${interviewReportId}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            await html2pdf().set(opt).from(response).save();
            
        } catch (error) {
            console.error('Failed to download resume PDF:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        Loading,
        report,
        reports,
        generateReport,
        getReportById,
        getAllReports,
        getResume
    }
}