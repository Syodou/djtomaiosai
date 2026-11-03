import { useState } from 'react'

const UPCOMING_ITEMS = [
  {
    tag: 'Drop 01 · Audio Packs',
    title: 'AI Stems & Sample Packs',
    description: 'Loops, baterías, vocales procesadas con IA y bajos listos para mezclar en vivo o en estudio.',
  },
  {
    tag: 'Drop 02 · Synth & FX',
    title: 'Presets & DJ Tools',
    description: 'Bancos de sonidos exclusivos, efectos de transición y racks de masterización de alto impacto.',
  },
  {
    tag: 'Drop 03 · Apparel',
    title: 'Limited Merch & Vinyls',
    description: 'Indumentaria oficial edición limitada y coleccionables físicos de DJ Tomaios AI.',
  },
]

export default function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <div className="page-wrapper">
        <header className="site-header">
          <a href="/" className="brand">
            <span className="brand-disc" aria-hidden="true" />
            <span>DJ TOMAIOS AI</span>
          </a>
          <div className="domain-pill">
            <span className="status-dot" aria-hidden="true" />
            <span>djtomaiosai.shop</span>
          </div>
        </header>

        <main className="hero">
          <div className="eq-bars" aria-hidden="true">
            <span className="eq-bar" />
            <span className="eq-bar" />
            <span className="eq-bar" />
            <span className="eq-bar" />
            <span className="eq-bar" />
            <span className="eq-bar" />
          </div>

          <h1 className="hero-title">
            El sonido del futuro llega a{' '}
            <span className="gradient-text">DJ Tomaios AI Shop</span>
          </h1>

          <p className="hero-subtitle">
            Estamos preparando la tienda oficial con librerías de sonidos generadas y curadas con IA,
            herramientas para DJs/productores y merch exclusivo.
          </p>

          <section className="notify-card" aria-label="Registro de lanzamiento">
            {submitted ? (
              <p className="notify-success" role="status">
                ¡Listo! Te avisaremos apenas abra la tienda oficial.
              </p>
            ) : (
              <form className="notify-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="notify-input"
                  placeholder="Tu correo para acceso anticipado..."
                  aria-label="Correo electrónico para acceso anticipado"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="notify-button">
                  Notificarme
                </button>
              </form>
            )}
          </section>

          <section className="preview-grid" aria-label="Adelanto del catálogo">
            {UPCOMING_ITEMS.map((item) => (
              <article key={item.title} className="preview-item">
                <span className="preview-badge">{item.tag}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </article>
            ))}
          </section>
        </main>

        <footer className="site-footer">
          <span>© {new Date().getFullYear()} DJ Tomaios AI. Todos los derechos reservados.</span>
          <nav className="footer-links" aria-label="Redes sociales">
            <a href="#instagram" onClick={(e) => e.preventDefault()}>Instagram</a>
            <a href="#soundcloud" onClick={(e) => e.preventDefault()}>SoundCloud</a>
            <a href="#youtube" onClick={(e) => e.preventDefault()}>YouTube</a>
          </nav>
        </footer>
      </div>
    </>
  )
}

