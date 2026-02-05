import { jsPDF } from 'jspdf';

const formatResultText = (result) => {
  if (!result) return '';

  const lines = [];
  lines.push('Code AI Checker – Analysis Result');
  lines.push('----------------------------------');
  lines.push(`Detection: ${result.isAI ? 'AI Generated' : 'Human Written'}`);
  lines.push(`Confidence: ${result.confidence}% AI generated`);

  if (typeof result.originalityScore === 'number') {
    lines.push(`Originality: ${result.originalityScore}%`);
  }

  if (result.explanation) {
    lines.push('');
    lines.push('Explanation:');
    lines.push(result.explanation);
  }

  if (Array.isArray(result.indicators) && result.indicators.length > 0) {
    lines.push('');
    lines.push('Key Indicators:');
    result.indicators.forEach((item, idx) => {
      lines.push(`- ${item}`);
    });
  }

  return lines.join('\n');
};

export const copyToClipboard = async (data) => {
  try {
    const text = typeof data === 'string' ? data : formatResultText(data);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch {
    return false;
  }
};

export const generateShareLink = (result) => {
  try {
    const payload = {
      detection: result.isAI ? 'AI' : 'Human',
      confidence: result.confidence,
      originality: result.originalityScore,
      createdAt: new Date().toISOString(),
    };

    const encoded = encodeURIComponent(btoa(JSON.stringify(payload)));
    const base =
      typeof window !== 'undefined' && window.location
        ? window.location.origin
        : 'https://codeaichecker.com';

    // NOTE: This is a front-end only stub. Implement real share URLs on your backend later.
    return `${base}/share?result=${encoded}`;
  } catch {
    return '';
  }
};

export const exportToPDF = (result, code) => {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const margin = 40;
  let y = margin;

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Code AI Checker – Analysis Report', margin, y);

  y += 26;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, margin, y);

  y += 30;
  doc.setTextColor(0);
  doc.setFontSize(12);

  const detection = result.isAI ? 'AI Generated' : 'Human Written';
  doc.text(`Detection: ${detection}`, margin, y);

  y += 18;
  doc.text(`Confidence: ${result.confidence}% AI generated`, margin, y);

  if (typeof result.originalityScore === 'number') {
    y += 18;
    doc.text(`Originality: ${result.originalityScore}%`, margin, y);
  }

  if (result.explanation) {
    y += 26;
    doc.setFont('Helvetica', 'bold');
    doc.text('Explanation', margin, y);
    y += 18;
    doc.setFont('Helvetica', 'normal');
    const explanationLines = doc.splitTextToSize(result.explanation, 515);
    doc.text(explanationLines, margin, y);
    y += explanationLines.length * 14 + 10;
  }

  if (Array.isArray(result.indicators) && result.indicators.length > 0) {
    doc.setFont('Helvetica', 'bold');
    doc.text('Key Indicators', margin, y);
    y += 18;
    doc.setFont('Helvetica', 'normal');
    result.indicators.forEach((indicator) => {
      const line = `• ${indicator}`;
      const split = doc.splitTextToSize(line, 515);
      doc.text(split, margin, y);
      y += split.length * 14;
    });
  }

  // New page for code
  if (code) {
    doc.addPage();
    y = margin;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Analyzed Code Snippet', margin, y);

    y += 22;
    doc.setFont('Courier', 'normal');
    doc.setFontSize(9);

    const codeLines = doc.splitTextToSize(code, 515);
    codeLines.forEach((line) => {
      if (y > 780) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 12;
    });
  }

  doc.save('code-ai-checker-report.pdf');
};

