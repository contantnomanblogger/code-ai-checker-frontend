import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How accurate is the detection?',
      answer: 'Our AI code detector has an accuracy rate of 95%+ based on extensive testing with millions of code samples from both human developers and AI models. However, accuracy can vary depending on code length, complexity, and the specific AI model used. For best results, analyze code snippets that are at least 50 lines long.'
    },
    {
      question: 'What programming languages are supported?',
      answer: 'We support a wide range of programming languages including Python, JavaScript, Java, C++, C#, PHP, Ruby, Go, Rust, HTML, CSS, MATLAB, R, Swift, Kotlin, and many more. The detection works best with popular languages that have been extensively used in training data.'
    },
    {
      question: 'Is my code data private?',
      answer: 'Yes, absolutely! Your privacy is our top priority. We do not store, save, or log any of the code you analyze. All analysis is performed in real-time and your code is never saved to our servers. We use secure connections and follow strict privacy protocols to ensure your code remains completely confidential.'
    },
    {
      question: 'Can I export the results?',
      answer: 'Yes! You can export your analysis results as a PDF report that includes the detection result, confidence percentage, explanation, key indicators, and the analyzed code snippet. You can also copy the results to your clipboard or generate a shareable link to send to others.'
    },
    {
      question: 'How does the AI determine if the code is generated?',
      answer: 'Our AI analyzes multiple factors including code structure, variable naming patterns, formatting consistency, complexity metrics, repetitive patterns, comment styles, and other characteristics. It compares these patterns against a trained model that has learned to distinguish between human-written and AI-generated code based on millions of examples.'
    },
    {
      question: 'Can I use this tool for commercial purposes?',
      answer: 'Yes, our free tool can be used for both personal and commercial purposes. However, we recommend reviewing our Terms of Service for any specific usage restrictions. For high-volume commercial use, please contact us for enterprise solutions.'
    },
    {
      question: 'What is the originality check feature?',
      answer: 'The originality check provides an additional metric that estimates how original the code is, complementing the AI detection. It helps identify potential plagiarism or code that may have been copied from other sources. This feature is optional and provides additional insights into code authenticity.'
    },
    {
      question: 'How long does the analysis take?',
      answer: 'Analysis typically completes in 1-3 seconds, depending on the length and complexity of your code. Our system is optimized for speed while maintaining accuracy. You\'ll see a loading animation during the analysis process.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <section className="hero-section">
        <div className="container">
          <h1 className="page-title">Frequently Asked Questions</h1>
          <p className="page-subtitle">
            Find answers to common questions about our AI code detection tool
          </p>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openIndex === index ? 'open' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2 className="cta-title">Still Have Questions?</h2>
            <p className="cta-text">
              Can't find the answer you're looking for? Please contact our friendly team.
            </p>
            <a href="/contact" className="btn btn-primary btn-large">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
