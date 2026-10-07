const certificates = [
  {
    id: 1,
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta (via Coursera)",
    date: "Nov 2023",
    credentialId: "META-FE-2023",
    link: "https://coursera.org/verify/META-FE-2023",
    icon: "bi-window-stack",
    color: "#0081FB",
    bg: "rgba(0,129,251,0.08)",
    tags: ["React", "HTML/CSS", "JavaScript", "UX"],
    featured: true,
  },
  {
    id: 2,
    title: "The Complete Node.js Developer Course",
    issuer: "Udemy – Andrew Mead",
    date: "Aug 2023",
    credentialId: "UC-NODE-2023",
    link: "https://ude.my/node-cert",
    icon: "bi-server",
    color: "#339933",
    bg: "rgba(51,153,51,0.08)",
    tags: ["Node.js", "Express", "MongoDB", "REST"],
    featured: false,
  },
  {
    id: 3,
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    date: "Mar 2024",
    credentialId: "AWS-CPE-2024",
    link: "https://aws.amazon.com/training",
    icon: "bi-cloud",
    color: "#FF9900",
    bg: "rgba(255,153,0,0.08)",
    tags: ["Cloud", "AWS", "EC2", "S3"],
    featured: false,
  },
  {
    id: 4,
    title: "Python for Everybody Specialization",
    issuer: "University of Michigan (Coursera)",
    date: "Jan 2024",
    credentialId: "UMICH-PY-2024",
    link: "https://coursera.org/verify/UMICH-PY-2024",
    icon: "bi-filetype-py",
    color: "#306998",
    bg: "rgba(48,105,152,0.08)",
    tags: ["Python", "Data", "APIs", "SQL"],
    featured: false,
  },
  {
    id: 5,
    title: "Google UX Design Professional Certificate",
    issuer: "Google (via Coursera)",
    date: "Jun 2023",
    credentialId: "GOOGLE-UX-2023",
    link: "https://coursera.org/verify/GOOGLE-UX-2023",
    icon: "bi-pencil-square",
    color: "#EA4335",
    bg: "rgba(234,67,53,0.08)",
    tags: ["UX Research", "Figma", "Prototyping"],
    featured: false,
  },
  {
    id: 6,
    title: "Docker & Kubernetes: The Practical Guide",
    issuer: "Udemy – Maximilian Schwarzmüller",
    date: "Sep 2024",
    credentialId: "UC-DK-2024",
    link: "https://ude.my/dk-cert",
    icon: "bi-box-seam",
    color: "#2496ED",
    bg: "rgba(36,150,237,0.08)",
    tags: ["Docker", "Kubernetes", "DevOps"],
    featured: false,
  },
];

function CertCard({ cert }) {
  return (
    <div
      className="portfolio-card p-4 h-100"
      style={{
        borderLeft: cert.featured ? `3px solid ${cert.color}` : "1px solid rgba(11,27,50,0.08)",
        position: "relative",
      }}
    >
      {cert.featured && (
        <span
          style={{
            position: "absolute",
            top: 12,
            right: 14,
            background: "rgba(255,107,53,0.12)",
            color: "var(--brand-primary)",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.2rem 0.6rem",
            borderRadius: 100,
          }}
        >
          ★ Featured
        </span>
      )}

      {/* ── Icon + Title ── */}
      <div className="d-flex align-items-start gap-3 mb-3">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: cert.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <i className={`bi ${cert.icon}`} style={{ color: cert.color, fontSize: "1.3rem" }} />
        </div>
        <div>
          <h3
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "var(--brand-secondary)",
              lineHeight: 1.3,
              marginBottom: "0.25rem",
            }}
          >
            {cert.title}
          </h3>
          <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: 0 }}>{cert.issuer}</p>
        </div>
      </div>

      {/* ── Date + ID ── */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span
          style={{
            fontSize: "0.75rem",
            color: "#6b7280",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          <i className="bi bi-calendar3" />
          {cert.date}
        </span>
        <span style={{ fontSize: "0.7rem", color: "#9ca3af", fontFamily: "monospace" }}>
          #{cert.credentialId}
        </span>
      </div>

      {/* ── Tags ── */}
      <div className="d-flex flex-wrap gap-1 mb-3">
        {cert.tags.map(t => (
          <span
            key={t}
            style={{
              background: cert.bg,
              color: cert.color,
              fontSize: "0.68rem",
              fontWeight: 600,
              padding: "0.15rem 0.55rem",
              borderRadius: 4,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* ── Verify link ── */}
      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          color: cert.color,
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          transition: "gap 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.gap = "0.55rem")}
        onMouseLeave={e => (e.currentTarget.style.gap = "0.35rem")}
      >
        Verify Credential
        <i className="bi bi-arrow-up-right" />
      </a>
    </div>
  );
}

export default function Certificates() {
  return (
    <section id="certificates" className="py-5" style={{ background: "#fff" }}>
      <div className="container py-5">
        {/* ── Header ── */}
        <div className="row mb-5">
          <div className="col-lg-7">
            <p className="section-label mb-2">Learning</p>
            <h2 className="section-title mb-2">
              Credentials &amp; <span>Certificates</span>
            </h2>
            <div className="title-line mb-3" />
            <p style={{ color: "#4b5563", fontSize: "0.95rem" }}>
              Continuous learning is non-negotiable in this field. These credentials
              represent real coursework with hands-on projects — not just badge collecting.
            </p>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="row g-4">
          {certificates.map(cert => (
            <div key={cert.id} className="col-md-6 col-xl-4">
              <CertCard cert={cert} />
            </div>
          ))}
        </div>

        {/* ── Learning note ── */}
        <div
          className="mt-5 d-flex align-items-center gap-3"
          style={{
            background: "rgba(255,107,53,0.05)",
            border: "1px solid rgba(255,107,53,0.15)",
            borderRadius: 10,
            padding: "1.25rem 1.5rem",
          }}
        >
          <i
            className="bi bi-mortarboard-fill"
            style={{ fontSize: "1.5rem", color: "var(--brand-primary)", flexShrink: 0 }}
          />
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.65 }}>
            <strong style={{ color: "var(--brand-secondary)" }}>Currently studying:</strong>{" "}
            Advanced System Design and AWS Solutions Architect — expected certification Q2 2025.
          </p>
        </div>
      </div>
    </section>
  );
}
