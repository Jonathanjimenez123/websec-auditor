import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Globe,
  LayoutDashboard,
  LoaderCircle,
  LockKeyhole,
  Search,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import "./App.css";

const API_URL = "https://websec-auditor-75vb.onrender.com";

function App() {
  const [url, setUrl] = useState("https://example.com/");
  const [loading, setLoading] = useState(false);
  const [scanId, setScanId] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function startScan(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setScanId(null);

    try {
      const response = await fetch(`${API_URL}/scans/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        throw new Error(`La API respondió con HTTP ${response.status}`);
      }

      const data = await response.json();
      setScanId(data.id);

      const resultResponse = await fetch(
        `${API_URL}/scans/${data.id}`
      );

      if (!resultResponse.ok) {
        throw new Error(
          "La auditoría fue creada, pero no pudimos consultar su resultado."
        );
      }

      const scanResult = await resultResponse.json();
      setResult(scanResult);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "No fue posible conectar con la API. Comprueba tu conexión y la configuración CORS."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#dashboard" aria-label="WebSec Auditor, inicio">
          <span className="brand-icon">
            <ShieldCheck size={24} strokeWidth={1.8} />
          </span>

          <span className="brand-copy">
            <span className="brand-name">
              WebSec <strong>Auditor</strong>
            </span>
            <small>SECURITY INTELLIGENCE</small>
          </span>
        </a>

        <div className="nav-label">ESPACIO DE TRABAJO</div>

        <nav className="navigation" aria-label="Navegación principal">
          <a className="nav-item active" href="#dashboard">
            <LayoutDashboard size={18} />
            <span>Panel principal</span>
          </a>

          <a className="nav-item" href="#scanner">
            <Search size={18} />
            <span>Escáner web</span>
          </a>

          <a className="nav-item" href="#results">
            <Activity size={18} />
            <span>Resultados</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="connection-card">
            <span className="connection-indicator" />
            <div className="connection-copy">
              <strong>API remota</strong>
              <span>Servicio en Render</span>
            </div>
          </div>

          <div className="sidebar-note">
            <ShieldCheck size={15} />
            <span>Auditoría web responsable</span>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Plataforma</span>
            <span className="breadcrumb-divider">/</span>
            <strong>Panel principal</strong>
          </div>

          <div className="topbar-meta">
            <span className="system-status">
              <span className="connection-indicator" />
              Sistema de auditoría
            </span>
            <span className="version">v0.1.0</span>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome">
            <div className="welcome-copy">
              <div className="eyebrow">
                <span className="eyebrow-line" />
                INTELIGENCIA DE SEGURIDAD WEB
              </div>

              <h1>
                Seguridad web.
                <br />
                <span>Claridad en cada análisis.</span>
              </h1>

              <p>
                Analiza sitios web y consulta los resultados de las auditorías
                HTTP desde un espacio de trabajo centralizado.
              </p>
            </div>

            <div className="welcome-art" aria-hidden="true">
              <div className="art-ring art-ring-one" />
              <div className="art-ring art-ring-two" />
              <div className="art-shield">
                <ShieldCheck size={54} strokeWidth={1.2} />
              </div>
              <span className="art-point art-point-one" />
              <span className="art-point art-point-two" />
              <span className="art-point art-point-three" />
            </div>
          </section>

          <section className="metrics" aria-label="Resumen de la plataforma">
            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon metric-icon-violet">
                  <Activity size={19} />
                </span>
                <span className="metric-caption">PLATAFORMA</span>
              </div>

              <div className="metric-value">
                <span className="metric-dot" />
                En línea
              </div>

              <p className="metric-foot">Interfaz web disponible</p>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon">
                  <ShieldCheck size={19} />
                </span>
                <span className="metric-caption">MOTOR DE ANÁLISIS</span>
              </div>

              <div className="metric-value">API REST</div>

              <p className="metric-foot">Backend desplegado en Render</p>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon">
                  <Clock3 size={19} />
                </span>
                <span className="metric-caption">ACTIVIDAD RECIENTE</span>
              </div>

              <div className="metric-value metric-value-small">
                {scanId ? `Auditoría #${scanId}` : "Sin actividad"}
              </div>

              <p className="metric-foot">Actividad de esta sesión</p>
            </article>
          </section>

          <div className="tools-grid">
            <section className="workspace panel" id="scanner">
              <div className="panel-heading">
                <div className="panel-title-icon">
                  <Search size={20} />
                </div>

                <div className="panel-heading-copy">
                  <span className="panel-kicker">ANÁLISIS</span>
                  <h2>Escáner web</h2>
                  <p>Introduce la dirección del sitio que quieres analizar.</p>
                </div>
              </div>

              <div className="protocol-label">
                <LockKeyhole size={14} />
                HTTP / HTTPS
              </div>

              <form onSubmit={startScan} className="scan-form">
                <label htmlFor="target-url">URL objetivo</label>

                <div className="url-input">
                  <Globe size={18} />
                  <input
                    id="target-url"
                    name="target-url"
                    type="url"
                    required
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="https://ejemplo.com"
                    autoComplete="url"
                  />
                </div>

                <p className="form-hint">
                  Analiza únicamente sitios para los que tengas autorización.
                </p>

                <button
                  className="scan-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="spin" size={17} />
                      Analizando sitio...
                    </>
                  ) : (
                    <>
                      <Search size={17} />
                      Iniciar auditoría
                      <ArrowUpRight className="button-arrow" size={17} />
                    </>
                  )}
                </button>
              </form>

              <div className="scanner-footer">
                <ShieldCheck size={15} />
                <span>Consulta enviada al motor de auditoría remoto.</span>
              </div>
            </section>

            <section className="results-panel panel" id="results">
              <div className="panel-heading">
                <div className="panel-title-icon">
                  <Terminal size={20} />
                </div>

                <div className="panel-heading-copy">
                  <span className="panel-kicker">INFORME</span>
                  <h2>Resultado de auditoría</h2>
                  <p>Respuesta recibida desde el backend.</p>
                </div>
              </div>

              {!result && !error && !loading && (
                <div className="empty-state">
                  <div className="empty-icon">
                    <Terminal size={25} strokeWidth={1.6} />
                  </div>
                  <strong>Esperando resultados</strong>
                  <p>
                    Inicia una auditoría para consultar aquí la información
                    devuelta por el motor.
                  </p>
                </div>
              )}

              {loading && (
                <div className="loading-state" role="status">
                  <LoaderCircle className="spin" size={22} />
                  <div>
                    <strong>Consultando el motor</strong>
                    <p>Esperando la respuesta de la API...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="message error-message" role="alert">
                  <CircleAlert size={20} />
                  <div>
                    <strong>No se pudo completar la consulta</strong>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="result-content">
                  <div className="message success-message">
                    <CheckCircle2 size={20} />
                    <div>
                      <strong>Respuesta recibida</strong>
                      <p>Auditoría #{scanId} consultada correctamente.</p>
                    </div>
                  </div>

                  <div className="result-grid">
                    <div className="result-item">
                      <small>ID DE AUDITORÍA</small>
                      <strong>#{result.id ?? scanId}</strong>
                    </div>

                    <div className="result-item">
                      <small>ESTADO HTTP</small>
                      <strong>
                        {result.status_code ?? "No disponible"}
                      </strong>
                    </div>

                    <div className="result-item result-url">
                      <small>URL ANALIZADA</small>
                      <strong>{result.url ?? url}</strong>
                    </div>
                  </div>

                  <div className="analysis-box">
                    <h3>Análisis del backend</h3>
                    <pre>
                      {typeof result.analysis === "string"
                        ? result.analysis
                        : result.analysis
                          ? JSON.stringify(result.analysis, null, 2)
                          : "El backend no ha devuelto un análisis. Comprueba si la auditoría necesita más tiempo."}
                    </pre>
                  </div>
                </div>
              )}
            </section>
          </div>

          <footer className="app-footer">
            <div className="footer-brand">
              <ShieldCheck size={16} />
              <strong>WebSec Auditor</strong>
              <span>Proyecto independiente de ciberseguridad</span>
            </div>

            <span className="footer-responsibility">
              Utiliza la herramienta de forma responsable.
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
