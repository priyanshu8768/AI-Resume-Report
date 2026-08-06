import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.NUMBER,
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description."
        },
        technicalQuestion: {
            type: Type.ARRAY,
            description: "A list of 3-5 technical questions that can be asked in the interview.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The technical question that can be asked." },
                    intention: { type: Type.STRING, description: "The intention of the interviewer behind asking this question." },
                    answer: { type: Type.STRING, description: "How to answer this question, points to cover, approach, etc." }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestion: {
            type: Type.ARRAY,
            description: "A list of 3-5 behavioral questions that can be asked in the interview.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioral question." },
                    intention: { type: Type.STRING, description: "The intention behind this question." },
                    answer: { type: Type.STRING, description: "How to answer this question." }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGap: {
            type: Type.ARRAY,
            description: "List of skill gaps in the candidate's profile compared to the job description.",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "The skill which the candidate is lacking." },
                    severity: { type: Type.STRING, description: "The severity of this skill gap (low, medium, high)." }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "The day number in the preparation plan, starting from 1." },
                    focus: { type: Type.STRING, description: "The main focus of this day." },
                    tasks: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "List of tasks to be done on this day."
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title:{
            type: Type.STRING,
            description:"The title of the job for which the interview report is generated."
        }
    },
    required: ["matchScore", "technicalQuestion", "behavioralQuestion", "skillGap", "preparationPlan", "title"]
};

const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {
    const prompt = `You are an expert technical interviewer and recruiter. Please generate a detailed and comprehensive interview report based on the candidate's details and the job description below.
    
    Candidate details:
    - Resume: ${resume}
    - Self description: ${selfDescription}
    
    Target Role:
    - Job description: ${jobDescription}
    
    Ensure you provide:
    1. A match score (0-100).
    2. A list of relevant technical questions based on the required skills.
    3. A list of behavioral questions.
    4. An analysis of any skill gaps.
    5. A structured preparation plan for the candidate.`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema
        }
    });

    return JSON.parse(response.text);
};





const generateResumePdf = async ({resume, selfDescription , jobDescription}) => {

    const resumePdfSchema = {
        type: Type.OBJECT,
        properties: {
            html: {
                type: Type.STRING,
                description: "The HTML content of the resume which can be converted to PDF using a library like Puppeteer."
            }
        },
    };    
    
    const prompt = `Generate a resume for a candidate with the following details:
    - Resume: ${resume}
    - Self description: ${selfDescription}
    - Job description: ${jobDescription}
    the response should be a JSON object with a single field 'html' containing the HTML content of the resume. The HTML should be well-structured and formatted, suitable for conversion to a PDF using a library like Puppeteer.`
    

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: resumePdfSchema
        }
    });

    const resumeHtml = JSON.parse(response.text)

    return resumeHtml.html;

};

export { generateInterviewReport, generateResumePdf };