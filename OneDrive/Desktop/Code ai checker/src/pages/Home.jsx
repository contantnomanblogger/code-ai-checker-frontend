import React, { useState } from 'react';
import './Home.css';
import '../components/CodeInput.css';
import ResultDisplay from '../components/ResultDisplay';

const Home = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('auto');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please paste some code to analyze.');
      return;
    }

    setError('');
    setIsAnalyzing(true);

    // Simple heuristic stub – replace with your real AI / API later
    setTimeout(() => {
      const lengthScore = Math.min(code.length / 800, 1);
      const hasComments = /\/\//.test(code) || /#/.test(code);
      const repetitive = /(copy|paste|generated|ai)/i.test(code);
      const uniformIndent = /^(\s+)/gm.test(code);

      let confidence = 48;
      if (lengthScore > 0.5) confidence += 6;
      if (lengthScore > 0.9) confidence += 4;
      if (!hasComments) confidence += 12;
      if (repetitive) confidence += 10;
      if (uniformIndent) confidence += 6;
      confidence = Math.max(3, Math.min(97, Math.round(confidence)));

      const isAI = confidence >= 58;

      // Very rough originality stub: shorter, repetitive code is less "original"
      let originalityBase = 96 - lengthScore * 20;
      if (repetitive) originalityBase -= 10;
      if (!hasComments) originalityBase -= 4;
      const originalityScore = Math.max(10, Math.min(99, Math.round(originalityBase)));

      setResult({
        isAI,
        confidence,
        explanation: isAI
          ? 'Repetitive structure, low comment usage, and uniform formatting lean towards AI-generated code.'
          : 'Natural formatting, comment usage, and varied structure lean towards human-written code.',
        indicators: [
          `Code length factor: ${(lengthScore * 100).toFixed(0)}%`,
          hasComments ? 'Comments detected in code.' : 'No or very few comments detected.',
          repetitive
            ? 'Contains words commonly associated with generated or copied code.'
            : 'No explicit AI- or copy-related wording detected.',
          uniformIndent ? 'Consistent indentation across lines.' : 'Indentation varies between blocks.',
        ],
        originalityScore,
      });

      setIsAnalyzing(false);
    }, 1000);
  };

  const handleClear = () => {
    setCode('');
    setResult(null);
    setError('');
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Detect <span className="gradient-text">AI Generated Code</span> Instantly
            </h1>
            <p className="hero-subtitle">
              Paste your code and get an instant AI vs human likelihood score with explainable indicators and optional originality insights.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary btn-large" onClick={handleAnalyze} disabled={isAnalyzing}>
                {isAnalyzing && <span className="spinner" />}
                <span>Check Code Now</span>
              </button>
              <a href="#checker" className="btn btn-secondary btn-large">
                Try Free Code Check
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="checker" className="detection-section">
        <div className="container detection-wrapper">
          <h2 className="section-title">AI-Powered Code Analysis</h2>
          <p className="section-subtitle">
            Supports Python, JavaScript, C++, Java, PHP, HTML, CSS, MATLAB and more. Your code is analyzed in-memory and never stored.
          </p>

          <div className="code-input-wrapper">
            <div className="code-input-header">
              <select
                className="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="auto">Auto-detect language</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="cpp">C / C++</option>
                <option value="java">Java</option>
                <option value="php">PHP</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="matlab">MATLAB</option>
              </select>
              <button
                type="button"
                className="clear-button"
                onClick={handleClear}
                disabled={!code}
                title="Clear code"
              >
                ×
              </button>
            </div>

            <textarea
              className="code-input"
              placeholder="// Paste your code snippet here to check if it was written by AI or a human..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div className="code-input-footer">
              <span className="char-count">{code.length.toLocaleString()} characters</span>
            </div>
          </div>

          <div className="check-button">
            <button
              className="btn btn-primary"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing && <span className="spinner" />}
              <span>{isAnalyzing ? 'Analyzing Code…' : 'Check Code'}</span>
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {result && (
            <div style={{ marginTop: '2.5rem' }}>
              <ResultDisplay result={result} code={code} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

