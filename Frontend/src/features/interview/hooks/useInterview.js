/* eslint-disable no-useless-assignment */
import {generateInterviewReport,getInterviewReportById, getAllInterviewReports ,getResumePdf} from "../services/interview.api.js";
import { useContext} from "react";
import {InterviewContext} from "../interview.context.jsx";

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
            const blob = response instanceof Blob ? response : new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `resume_${interviewReportId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => window.URL.revokeObjectURL(url), 1000);
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