import {useState,useEffect,useRef} from 'react'
import "../style/home.scss"
import {useInterview} from "../hooks/useInterview.js";
import {useAuth} from '../../auth/hooks/useAuth.js';
import {useNavigate} from "react-router";




const Home = () => {

  const {loading, generateReport, getAllReports, reports} = useInterview();
  const { user, handleLogout } = useAuth();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const resumeInputRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        await getAllReports();
      } catch (error) {
        console.error("Error fetching reports:", error);
      }

    };
    fetchReports();
  }, [getAllReports]);



  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
    }
  };

  

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current?.files?.[0];
    if (!resumeFile) {
      setErrorMessage("Please upload a PDF resume before generating the report.");
      return;
    }

    try {
      const data = await generateReport({resumeFile, selfDescription, jobDescription});
      navigate(`/interview/report/${data._id}`);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to generate report. Please try again.");
    }
  }

  return (
    <main className='home'>
      <div className="home-logout">
      {user && (
            <button className="button secondary-button logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
      </div>
      <div className="home-hero">
        <div className="home-hero__top-row">
          <h1 className="home-title">Create a Custom Interview<br /><span className="accent">Report with AI</span></h1>
        </div>
        <p className="home-subtitle">Paste a job description, upload your resume, and let AI craft a personalized interview prep report — in about 30 seconds.</p>
        <div className="home-meta">
          <span className="meta-item">⚡ ~30s to generate</span>
          <span className="meta-dot">·</span>
          <span className="meta-item">🎯 Role-specific questions</span>
          <span className="meta-dot">·</span>
          <span className="meta-item">📊 Skill gap analysis</span>
        </div>
      </div>

      <div className="interview-input-group">
        <div className="input-card left">
          <div className="card-header">
            <span className="card-icon">📋</span>
            <label htmlFor="jobDescription">Job Description</label>
          </div>
          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="Paste the job description here — role, responsibilities, requirements..."
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="divider"></div>

        <div className="right">
          <div className="input-card">
            <div className="card-header">
              <span className="card-icon">📄</span>
              <span>Resume</span>
            </div>
            <label className="file-dropzone" htmlFor="resume">
              <span className="dropzone-icon">☁</span>
              <span className="dropzone-main">Click to upload your resume</span>
              <span className="dropzone-sub">PDF format only · Max 5MB</span>
              <span className="dropzone-btn">Browse File</span>
            </label>
            <input
              ref={resumeInputRef}
              hidden
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
              onChange={handleResumeChange}
            />
            {resumeFileName && (
              <div className="file-selected-name">Selected file: {resumeFileName}</div>
            )}
          </div>

          <div className="input-card">
            <div className="card-header">
              <span className="card-icon">✍️</span>
              <label htmlFor="selfDescription">Self Description</label>
            </div>
            <textarea
              onChange={(e) => setSelfDescription(e.target.value)}
              name="selfDescription"
              id="selfDescription"
              placeholder="Describe your background, skills, and what makes you a great fit..."
            ></textarea>
          </div>

          <div className="generate-wrapper">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button
              onClick={handleGenerateReport}
              className="button primary-button generate-btn"
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner"></span>Generating...</>
              ) : (
                <><span>⚡</span> Generate Interview Report</>
              )}
            </button>
            <span className="generate-note">AI takes ~30s to generate your report</span>
          </div>
        </div>
      </div>
      {/**Recent reports list  */}
      {reports.length>0 && (
        <div className="recent-reports">
          <h2 className="recent-reports__title">My Recent Reports</h2>
          <ul className="recent-reports__list">
            {reports.map((report) => (
              <li key={report._id} className="report-items">
                <h3>{report.title || "Unnamed Report" }</h3>
                <p className="report-meta">Generated on: {new Date(report.createdAt).toLocaleDateString()}</p>
                <p className="report-meta-score">Match Score: {report.matchScore}</p>
                <button
                  onClick={() => navigate(`/interview/report/${report._id}`)}className="button primary-button view-report-btn"
                >
                  View Report
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}

export default Home