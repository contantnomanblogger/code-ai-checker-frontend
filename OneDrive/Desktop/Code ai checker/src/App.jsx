import { useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function App() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const checkCode = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API}/api/detect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) setError(data?.error || "Error");
      else setResult(data);
    } catch {
      setError("Backend connect nahi ho raha. Backend (localhost:4000) run hai?");
    } finally {
      setLoading(false);
    }
  };

  const ui = useMemo(() => {
    const label = result?.label || "";
    const confidence = Number(result?.confidencePercent ?? 0);

    const isAI =
      label.toLowerCase().includes("ai") ||
      label.toLowerCase().includes("generated");

    return {
      isAI,
      confidence,
      title: isAI ? "AI Generated" : "Human Written",
      emoji: isAI ? "🤖" : "🧑",
      badgeBg: isAI ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)",
      badgeBorder: isAI ? "rgba(239,68,68,0.35)" : "rgba(34,197,94,0.35)",
      barBg: isAI ? "rgba(239,68,68,0.65)" : "rgba(34,197,94,0.65)",
      barTrack: "rgba(255,255,255,0.10)",
    };
  }, [result]);

  return (
    <div style={styles.page}>
      <Analytics />
      <div style={styles.container}>
        <h1 style={styles.title}>Code AI Checker</h1>

        <div style={styles.card}>
          <label style={styles.label}>Paste your code</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            rows={12}
            style={styles.textarea}
          />

          <div style={styles.actions}>
            <button
              onClick={checkCode}
              disabled={!code.trim() || loading}
              style={{
                ...styles.button,
                opacity: !code.trim() || loading ? 0.6 : 1,
                cursor: !code.trim() || loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Checking..." : "Check Code"}
            </button>

            <button
              onClick={() => {
                setCode("");
                setResult(null);
                setError("");
              }}
              disabled={loading}
              style={{
                ...styles.ghost,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              Clear
            </button>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <div style={styles.errorTitle}>❌ Error</div>
              <div>{error}</div>
            </div>
          )}

          {result && (
            <div style={styles.resultWrap}>
              <div
                style={{
                  ...styles.resultHeader,
                  background: ui.badgeBg,
                  borderColor: ui.badgeBorder,
                }}
              >
                <div style={styles.resultLeft}>
                  <div style={styles.resultEmoji}>{ui.emoji}</div>
                  <div>
                    <div style={styles.resultTitle}>{ui.title}</div>
                    <div style={styles.resultSub}>
                      Engine: <b>{result.engine}</b>
                    </div>
                  </div>
                </div>

                <div style={styles.confBox}>
                  <div style={styles.confLabel}>Confidence</div>
                  <div style={styles.confValue}>{ui.confidence}%</div>
                </div>
              </div>

              <div style={styles.progressTrack}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${Math.max(0, Math.min(100, ui.confidence))}%`,
                    background: ui.barBg,
                  }}
                />
              </div>

              <div style={styles.explain}>
                <div style={styles.sectionTitle}>Explanation</div>
                <div style={styles.explainText}>{result.explanation}</div>
              </div>

              {result.metrics && (
                <div style={styles.metrics}>
                  <div style={styles.sectionTitle}>Metrics</div>

                  <div style={styles.metricsGrid}>
                    {"totalLines" in result.metrics && (
                      <Metric label="Total lines" value={result.metrics.totalLines} />
                    )}
                    {"avgLineLength" in result.metrics && (
                      <Metric label="Avg line length" value={result.metrics.avgLineLength} />
                    )}
                    {"commentRatio" in result.metrics && (
                      <Metric label="Comment ratio" value={result.metrics.commentRatio} />
                    )}
                    {"longLineRatio" in result.metrics && (
                      <Metric label="Long line ratio" value={result.metrics.longLineRatio} />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={styles.footer}>
          Tip: Try different code styles (comments-heavy vs minimal) to see confidence change.
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div style={styles.metricBox}>
      <div style={styles.metricLabel}>{label}</div>
      <div style={styles.metricValue}>{String(value)}</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(1200px 700px at 50% -10%, rgba(99,102,241,0.35), transparent 55%), #070B18",
    padding: 20,
    color: "rgba(255,255,255,0.92)",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
  },
  container: { maxWidth: 980, margin: "0 auto" },
  title: {
    textAlign: "center",
    fontSize: 40,
    letterSpacing: 0.3,
    margin: "26px 0 18px",
  },
  card: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 16,
    padding: 18,
    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
  },
  label: { display: "block", fontSize: 13, opacity: 0.8, marginBottom: 8 },
  textarea: {
    width: "100%",
    resize: "vertical",
    minHeight: 220,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    lineHeight: 1.45,
    color: "rgba(255,255,255,0.92)",
    background: "rgba(0,0,0,0.25)",
    border: "1px solid rgba(255,255,255,0.14)",
    outline: "none",
  },
  actions: { display: "flex", gap: 10, marginTop: 12, alignItems: "center" },
  button: {
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(99,102,241,0.22)",
    color: "rgba(255,255,255,0.95)",
    padding: "10px 14px",
    borderRadius: 12,
    fontWeight: 600,
  },
  ghost: {
    border: "1px solid rgba(255,255,255,0.14)",
    background: "transparent",
    color: "rgba(255,255,255,0.85)",
    padding: "10px 14px",
    borderRadius: 12,
  },
  errorBox: {
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(239,68,68,0.35)",
    background: "rgba(239,68,68,0.12)",
  },
  errorTitle: { fontWeight: 700, marginBottom: 6 },
  resultWrap: { marginTop: 16 },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    border: "1px solid",
    alignItems: "center",
  },
  resultLeft: { display: "flex", gap: 12, alignItems: "center" },
  resultEmoji: { fontSize: 28 },
  resultTitle: { fontSize: 20, fontWeight: 800, lineHeight: 1.1 },
  resultSub: { opacity: 0.8, fontSize: 13, marginTop: 3 },
  confBox: { textAlign: "right" },
  confLabel: { opacity: 0.75, fontSize: 12 },
  confValue: { fontSize: 20, fontWeight: 800, marginTop: 2 },
  progressTrack: {
    marginTop: 10,
    height: 10,
    borderRadius: 999,
    background: "rgba(255,255,255,0.10)",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  progressFill: { height: "100%", borderRadius: 999 },
  explain: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
  },
  sectionTitle: { fontWeight: 800, marginBottom: 8 },
  explainText: { opacity: 0.92, lineHeight: 1.5 },
  metrics: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 10,
    marginTop: 8,
  },
  metricBox: {
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.20)",
    borderRadius: 12,
    padding: 12,
  },
  metricLabel: { opacity: 0.75, fontSize: 12 },
  metricValue: { fontWeight: 800, fontSize: 16, marginTop: 4 },
  footer: { textAlign: "center", opacity: 0.65, marginTop: 16, fontSize: 13 },
};
