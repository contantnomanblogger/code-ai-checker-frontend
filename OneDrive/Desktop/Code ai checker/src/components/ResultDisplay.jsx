import React, { useState } from 'react';
import { exportToPDF, copyToClipboard, generateShareLink } from '../utils/resultUtils';
import './ResultDisplay.css';

const ResultDisplay = ({ result, code }) => {
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState(null);

  const handleCopy = async () => {
    const success = await copyToClipboard(result);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    const link = generateShareLink(result);
    setShareLink(link);
    copyToClipboard(link);
  };

  const handleExportPDF = () => {
    exportToPDF(result, code);
  };

  const getConfidenceColor = (percentage) => {
    if (percentage >= 70) return 'high';
    if (percentage >= 40) return 'medium';
    return 'low';
  };

  const confidenceClass = getConfidenceColor(result.confidence);

  return (
    <div className="result-display fade-in">
      <div className="result-header">
        <h3 className="result-title">Analysis Result</h3>
        <div className="result-actions">
          <button 
            className="action-btn"
            onClick={handleCopy}
            title="Copy result"
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
          <button 
            className="action-btn"
            onClick={handleShare}
            title="Share result"
          >
            🔗 Share
          </button>
          <button 
            className="action-btn"
            onClick={handleExportPDF}
            title="Export as PDF"
          >
            📄 PDF
          </button>
        </div>
      </div>

      <div className="result-content">
        <div className={`confidence-score ${confidenceClass}`}>
          <div className="score-circle">
            <svg className="score-svg" viewBox="0 0 120 120">
              <circle
                className="score-bg"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                opacity="0.2"
              />
              <circle
                className="score-progress"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - result.confidence / 100)}`}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="score-text">
              <span className="score-value">{result.confidence}%</span>
              <span className="score-label">AI Generated</span>
            </div>
          </div>
        </div>

        <div className="result-details">
          <div className="result-type">
            <span className="type-label">Detection:</span>
            <span className={`type-value ${result.isAI ? 'ai' : 'human'}`}>
              {result.isAI ? '🤖 AI Generated' : '👤 Human Written'}
            </span>
          </div>

          <div className="result-explanation">
            <h4 className="explanation-title">Analysis Explanation</h4>
            <p className="explanation-text">{result.explanation}</p>
          </div>

          {result.indicators && result.indicators.length > 0 && (
            <div className="result-indicators">
              <h4 className="indicators-title">Key Indicators</h4>
              <ul className="indicators-list">
                {result.indicators.map((indicator, index) => (
                  <li key={index} className="indicator-item">
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.originalityScore !== undefined && (
            <div className="originality-score">
              <h4 className="originality-title">Originality Check</h4>
              <div className="originality-bar">
                <div 
                  className="originality-fill"
                  style={{ width: `${result.originalityScore}%` }}
                ></div>
              </div>
              <p className="originality-text">
                {result.originalityScore}% Original
              </p>
            </div>
          )}
        </div>
      </div>

      {shareLink && (
        <div className="share-link-box">
          <p>Share link copied to clipboard!</p>
          <input 
            type="text" 
            value={shareLink} 
            readOnly 
            className="share-link-input"
            onClick={(e) => e.target.select()}
          />
        </div>
      )}

      <div className="privacy-notice">
        🔒 Your code was analyzed securely and was not saved or stored.
      </div>
    </div>
  );
};

export default ResultDisplay;
