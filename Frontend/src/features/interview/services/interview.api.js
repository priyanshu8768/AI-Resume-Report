import axios from 'axios';

const backendUrl = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000').replace(/\/$/, '');

const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true, // Include cookies in requests
})

/**@description Generate a new interview report from user input */
export const generateInterviewReport = async ({ resumeFile, selfDescription, jobDescription }) => {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('selfDescription', selfDescription);
    formData.append('jobDescription', jobDescription);

    const response = await api.post('/api/interview/', formData);

    return response.data
}

/** @description Get an interview report by its ID */
export const getInterviewReportById = async  (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
}

/** @description Get all interview reports for the authenticated user */
export const getAllInterviewReports = async () => {
    const response = await api.get('/api/interview/');
    return response.data;
}

export const getResumePdf = async (interviewReportId) => {
    const response = await api.get(`/api/interview/report/${interviewReportId}/resume/pdf`);
    return response.data;
}