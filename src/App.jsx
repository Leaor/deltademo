import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Check,
  Download,
  House,
  Building2,
  Layers3,
  Plus,
} from "lucide-react";
import {
  site,
  services,
  projects,
  planningPoints,
  processSteps,
  generalFaqs,
} from "./content.js";

const icons = [House, Building2, Layers3];
const nav = [
  ["Services", "/services/"],
  ["Projects", "/projects/"],
  ["Our Process", "/#process"],
  ["About", "/about/"],
  ["Contact", "/contact/"],
];
export function getPage(path) {
  const clean = "/" + path.split("?")[0].split("/").filter(Boolean).join("/");
  if (clean === "/")
    return {
      type: "home",
      title: "Demolition in Toronto & the GTA",
      description:
        "Residential, commercial and selective demolition in Toronto and the Greater Toronto Area. Start with a clear scope. Plan your next project with Delta Demolition.",
    };
  if (clean === "/services")
    return {
      type: "services",
      title: "Demolition Services in Toronto & the GTA",
      description:
        "Explore residential, commercial and selective demolition scopes. Clear planning for renovations, rebuilds and commercial fit-outs across Toronto and the GTA.",
    };
  const service = services.find((s) => clean === `/services/${s.slug}`);
  if (service)
    return {
      type: "service",
      service,
      title: `${service.title} in Toronto & the GTA`,
      description:
        service.description +
        " Discuss your Toronto or GTA project with Delta Demolition.",
    };
  if (clean === "/projects")
    return {
      type: "projects",
      title: "Project Journal",
      description:
        "The Delta Demolition project journal. Genuine project stories and scope details will be added as approved material becomes available.",
    };
  if (clean === "/about")
    return {
      type: "about",
      title: "About Delta Demolition",
      description:
        "A considered approach to residential and commercial demolition in Toronto and the GTA. Learn how clear scopes and site planning prepare your next phase.",
    };
  if (clean === "/contact")
    return {
      type: "contact",
      title: "Request a Demolition Estimate",
      description:
        "Tell Delta Demolition about your residential, commercial or selective demolition project in Toronto and the GTA. Preview enquiry form; online delivery is not yet connected.",
    };
  return {
    type: "404",
    title: "Page Not Found",
    description:
      "Find demolition services and project information from Delta Demolition.",
  };
}

function Button({
  href = "/contact/",
  children = "Request an estimate",
  secondary = false,
  className = "",
  ...props
}) {
  return (
    <a
      href={href}
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
      {...props}
    >
      {children}
      <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" />
    </a>
  );
}
function Eyebrow({ children, light = false }) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span />
      {children}
    </p>
  );
}
function Logo() {
  return (
    <img
      src="/delta-logo.svg"
      width="205"
      height="84"
      alt="Delta Demolition"
      className="logo"
    />
  );
}

function Header({ path }) {
  const dialog = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = () => {
    if (dialog.current.open) dialog.current.close();
    else dialog.current.showModal();
  };
  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);
  const links = (mobile = false) =>
    nav.map(([label, href]) => (
      <a
        key={label}
        href={href}
        aria-current={
          href !== "/#process" && path.startsWith(href.replace(/\/$/, ""))
            ? "page"
            : undefined
        }
        onClick={mobile ? () => dialog.current.close() : undefined}
      >
        {label}
      </a>
    ));
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <div className="container header-inner">
          <a href="/" className="logo-link" aria-label="Delta Demolition home">
            <Logo />
          </a>
          <nav aria-label="Main navigation" className="desktop-nav">
            {links()}
          </nav>
          <Button className="header-cta">Request an estimate</Button>
          <button
            className="menu-toggle"
            onClick={toggle}
            aria-label="Open navigation"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Site navigation"
        onClose={() => setMenuOpen(false)}
        onCancel={() => setMenuOpen(false)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="mobile-menu-top">
          <Logo />
          <button aria-label="Close navigation" onClick={toggle}>
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">{links(true)}</nav>
        <Button onClick={() => dialog.current.close()}>
          Request an estimate
        </Button>
        <p>TORONTO & THE GTA</p>
      </dialog>
      <MenuState dialog={dialog} setOpen={setMenuOpen} />
    </>
  );
}
function MenuState({ dialog, setOpen }) {
  useEffect(() => {
    const node = dialog.current;
    const observer = new MutationObserver(() => setOpen(node.open));
    observer.observe(node, { attributes: true, attributeFilter: ["open"] });
    return () => observer.disconnect();
  }, [dialog, setOpen]);
  return null;
}

function Hero() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src="/images/hero.webp"
          srcSet="/images/hero-960.webp 960w, /images/hero.webp 1920w"
          sizes="100vw"
          alt="Backhoe clearing brick rubble at a demolition site"
          fetchPriority="high"
          width="1920"
          height="1080"
        />
        <div className="hero-shade" />
        <div className="container hero-inner">
          <Eyebrow light>DEMOLITION. WITH DIRECTION.</Eyebrow>
          <h1>
            CLEAR THE SITE.
            <br />
            MOVE THE
            <br className="hero-break" /> PROJECT FORWARD.
          </h1>
          <p className="hero-description">
            Residential, commercial and selective demolition.
            <br className="desktop-break" /> A clear next step for your Toronto
            & GTA project.
          </p>
          <Button>Request an estimate</Button>
          <a href="/services/" className="hero-text-link">
            Explore our services <ArrowRight size={17} />
          </a>
        </div>
        <div className="container hero-bottom">
          <span>
            <MapPin size={15} /> TORONTO & THE GREATER TORONTO AREA
          </span>
          <span className="hero-bottom-right">
            READY FOR WHAT’S NEXT <ArrowRight size={17} />
          </span>
        </div>
        <span className="photo-label">Representative site photography</span>
      </section>
      <div className="intro-strip">
        <div className="container">
          <span>
            <House />
            Residential & commercial
          </span>
          <span>
            <Layers3 />
            Clear scopes. Considered planning.
          </span>
          <span>
            <MapPin />
            Toronto & GTA coverage
          </span>
        </div>
      </div>
    </>
  );
}

function ServicesGrid({ full = false }) {
  return (
    <section
      className={`section services-section ${full ? "services-full" : ""}`}
      id="services"
    >
      <div className="container">
        <div className="section-header">
          <div>
            <Eyebrow>OUR SERVICES</Eyebrow>
            <h2>
              THE RIGHT APPROACH.
              <br />
              FOR YOUR NEXT CHAPTER.
            </h2>
          </div>
          <div className="section-header-aside">
            <p>
              From a single room to an entire structure,
              <br className="desktop-break" /> demolition starts with a clear
              plan.
            </p>
            {!full && (
              <a className="text-link" href="/services/">
                Explore all services <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>
        <div className="service-grid">
          {services.map((service, i) => {
            const Icon = icons[i];
            return (
              <article className="service-card" key={service.slug}>
                <a
                  className="service-image-link"
                  href={`/services/${service.slug}/`}
                  aria-label={`Explore ${service.title}`}
                >
                  <img
                    src={service.image}
                    srcSet={`${service.image.replace(".webp", "-550.webp")} 550w, ${service.image} 1100w`}
                    sizes="(max-width: 700px) calc(100vw - 40px), 30vw"
                    alt={service.imageAlt}
                    width="640"
                    height="440"
                    loading="lazy"
                  />
                  <span className="image-corner">0{i + 1}</span>
                  <span className="image-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </a>
                <div className="service-card-content">
                  <Icon className="service-icon" size={27} strokeWidth={1.5} />
                  <h3>
                    <a href={`/services/${service.slug}/`}>{service.title}</a>
                  </h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.offerings.slice(0, full ? 4 : 3).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a className="text-link" href={`/services/${service.slug}/`}>
                    Explore service <ArrowUpRight size={17} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <p className="section-footnote">
          Every project is different. Final service scope is confirmed following
          assessment.
        </p>
      </div>
    </section>
  );
}

function ProjectJournal({ full = false }) {
  return (
    <section
      className={`section project-section ${full ? "project-full" : ""}`}
    >
      <div className="container">
        <div className="section-header">
          <div>
            <Eyebrow>THE PROJECT JOURNAL</Eyebrow>
            <h2>
              REAL SITES.
              <br />
              REAL TRANSFORMATIONS.
            </h2>
          </div>
          <p className="section-header-aside">
            A closer look at the work that makes
            <br className="desktop-break" /> the next phase possible.
          </p>
        </div>
        {projects.length ? (
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.slug}>
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width="960"
                  height="640"
                  loading="lazy"
                />
                <p className="eyebrow">
                  {project.location} / {project.category}
                </p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.scope?.length > 0 && (
                  <ul>
                    {project.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="journal-placeholder">
            <div className="journal-art" aria-hidden="true">
              <div className="blueprint-grid" />
              <span className="blueprint-label">DELTA / PROJECT JOURNAL</span>
              <svg viewBox="0 0 580 340" fill="none">
                <g stroke="currentColor" strokeWidth="1.3">
                  <path d="m60 243 164-94 233 44-164 96zM60 243v-91l164-94 233 44v91M224 58v91M293 289v-91L60 152M293 198l164-96M134 196v-66l92-52 148 28v65M134 196l92-53 148 28M226 78v65M189 212v-37l90 17v39M321 183v-51l58-34M67 270l226 44 182-106M84 285l-17-15 22-7M455 208l20 0-9 19" />
                  <path
                    strokeDasharray="4 6"
                    d="M37 247l256 49 183-104M224 45v112M283 183v132"
                  />
                </g>
              </svg>
              <span className="blueprint-bottom">
                SPACE FOR WHAT COMES NEXT.
              </span>
            </div>
            <div className="journal-copy">
              <span className="small-label">OUR WORK, IN FOCUS</span>
              <h3>
                PROJECT STORIES
                <br />
                COMING SOON.
              </h3>
              <p>
                We’re preparing a closer look at Delta projects, from the
                initial scope to the final handover.
              </p>
              <p>Have a site in mind? Let’s talk about what comes next.</p>
              <Button>Discuss your project</Button>
              {!full && (
                <a href="/projects/" className="text-link journal-link">
                  Visit the project journal <ArrowUpRight size={17} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Planning({ about = false }) {
  return (
    <section className="section planning-section">
      <div className="container planning-grid">
        <div className="planning-visual">
          <img
            src="/images/planning.webp"
            srcSet="/images/planning-550.webp 550w, /images/planning.webp 1100w"
            sizes="(max-width: 700px) calc(100vw - 40px), 45vw"
            alt="Dust-control equipment beside a building undergoing demolition"
            width="850"
            height="1100"
            loading="lazy"
          />
          <div className="planning-image-overlay">
            <span>BEFORE THE FIRST REMOVAL.</span>
            <p>
              THE DETAILS
              <br />
              MAKE THE DIFFERENCE.
            </p>
          </div>
          <span className="planning-photo-note">
            Representative site photography
          </span>
        </div>
        <div className="planning-content">
          <Eyebrow>
            {about ? "THE DELTA APPROACH" : "BUILT AROUND YOUR PROJECT"}
          </Eyebrow>
          <h2>
            GOOD DEMOLITION
            <br />
            STARTS WITH
            <br />
            GOOD PLANNING.
          </h2>
          <p className="large-copy">
            For homeowners, builders and property managers, the next phase
            starts with the right preparation.
          </p>
          <div className="planning-list">
            {planningPoints.map((item, i) => (
              <div className="planning-point" key={item.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          {!about && (
            <a href="/about/" className="text-link">
              More about our approach <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="container">
        <div className="section-header">
          <div>
            <Eyebrow light>HOW IT WORKS</Eyebrow>
            <h2>A CLEAR PATH FORWARD.</h2>
          </div>
          <p className="section-header-aside">
            From the first conversation
            <br />
            to a site ready for its next purpose.
          </p>
        </div>
        <div className="process-grid">
          {processSteps.map((step) => (
            <article key={step.number}>
              <div className="process-number">
                <span>{step.number}</span>
                <ArrowRight size={23} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coverage() {
  return (
    <section className="section coverage-section">
      <div className="container coverage-grid">
        <div>
          <Eyebrow>LOCAL FOCUS</Eyebrow>
          <h2>
            TORONTO.
            <br />
            AND THE GTA.
          </h2>
          <p>
            Urban lots. Suburban properties. Commercial spaces.
            <br />
            Tell us where you’re building what comes next.
          </p>
          <a className="text-link" href="/contact/">
            Check your project location <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="coverage-right">
          <div className="coverage-title">
            <MapPin size={23} />
            <span>OUR SERVICE AREA</span>
          </div>
          <div className="area-list">
            {site.serviceAreas.map((area) => (
              <span key={area}>
                {area}
                <ArrowUpRight size={14} />
              </span>
            ))}
          </div>
          <p>Outside these areas? Include your location in your enquiry.</p>
        </div>
      </div>
    </section>
  );
}

function FAQs({ items = generalFaqs }) {
  return (
    <section className="section faq-section">
      <div className="container faq-grid">
        <div>
          <Eyebrow>GOOD QUESTIONS. CLEAR ANSWERS.</Eyebrow>
          <h2>
            BEFORE
            <br />
            YOU BEGIN.
          </h2>
          <p>
            A little clarity goes a long way.
            <br />
            Here are a few helpful starting points.
          </p>
          <a href="/contact/" className="text-link">
            Talk through your project <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="faq-list">
          {items.map((faq, i) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteBanner() {
  return (
    <section className="quote-banner">
      <div className="container">
        <div>
          <Eyebrow light>LET’S GET STARTED</Eyebrow>
          <h2>
            YOUR NEXT PHASE
            <br />
            STARTS HERE.
          </h2>
          <p>Tell us about your site. Let’s define the way forward.</p>
        </div>
        <Button className="button-white">Request an estimate</Button>
        <div className="quote-triangle" aria-hidden="true" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <a href="/" aria-label="Delta Demolition home">
              <Logo />
            </a>
            <p>
              Clear the site.
              <br />
              Move the project forward.
            </p>
            <span>
              <MapPin size={15} />
              Toronto & the Greater Toronto Area
            </span>
          </div>
          <div>
            <h2>EXPLORE</h2>
            <a href="/services/">Services</a>
            <a href="/projects/">Projects</a>
            <a href="/#process">Our process</a>
            <a href="/about/">About Delta</a>
          </div>
          <div>
            <h2>OUR SERVICES</h2>
            {services.map((s) => (
              <a key={s.slug} href={`/services/${s.slug}/`}>
                {s.title}
              </a>
            ))}
          </div>
          <div className="footer-contact">
            <h2>HAVE A PROJECT IN MIND?</h2>
            <p>Let’s talk about your next step.</p>
            <a href="/contact/" className="text-link">
              Request an estimate <ArrowUpRight size={17} />
            </a>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            {site.phone && (
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>
                {site.phone}
              </a>
            )}
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Delta Demolition.</p>
          <span>TORONTO & GTA</span>
          <a href="/contact/#privacy">Enquiry privacy</a>
        </div>
      </footer>
      <div className="mobile-estimate">
        <Button>Request an estimate</Button>
      </div>
    </>
  );
}

function PageIntro({ label, title, children }) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>{label}</span>
        </div>
        <Eyebrow>{label}</Eyebrow>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
    </section>
  );
}

function ServicePage({ service }) {
  return (
    <>
      <section className="service-hero">
        <div className="container service-hero-grid">
          <div>
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/services/">Services</a>
              <span>/</span>
              <span>{service.category}</span>
            </div>
            <Eyebrow>TORONTO & THE GTA</Eyebrow>
            <h1>{service.title.toUpperCase()}.</h1>
            <p>{service.description}</p>
            <Button />
          </div>
          <div className="service-hero-image">
            <img
              src={service.image}
              srcSet={`${service.image.replace(".webp", "-550.webp")} 550w, ${service.image} 1100w`}
              sizes="(max-width: 700px) calc(100vw - 40px), 45vw"
              alt={service.imageAlt}
              width="960"
              height="800"
              fetchPriority="high"
            />
            <span>Representative site photography</span>
          </div>
        </div>
      </section>
      <section className="section service-scope">
        <div className="container scope-grid">
          <div>
            <Eyebrow>{service.kicker}</Eyebrow>
            <h2>
              START WITH
              <br />A CLEAR SCOPE.
            </h2>
            {service.scope.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside>
            <h3>What we can discuss</h3>
            <ul>
              {service.offerings.map((item) => (
                <li key={item}>
                  <Check size={19} />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              Final inclusions, exclusions and responsibilities are agreed
              following assessment.
            </p>
            <a className="text-link" href="/contact/">
              Tell us what you need <ArrowUpRight size={18} />
            </a>
          </aside>
        </div>
      </section>
      <Process />
      <FAQs items={service.faqs} />
      <section className="related-services section">
        <div className="container">
          <Eyebrow>EXPLORE MORE</Eyebrow>
          <h2>ANOTHER KIND OF PROJECT?</h2>
          <div>
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <a key={s.slug} href={`/services/${s.slug}/`}>
                  <span>{s.title}</span>
                  <ArrowUpRight />
                </a>
              ))}
          </div>
        </div>
      </section>
      <QuoteBanner />
    </>
  );
}

function EnquiryForm() {
  const [status, setStatus] = useState("idle");
  const [brief, setBrief] = useState(null);
  const [error, setError] = useState("");
  const result = useRef(null);
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT || site.formEndpoint;
  const connected = Boolean(endpoint);
  useEffect(() => {
    if (status === "demo" || status === "sent" || status === "error")
      result.current?.focus();
  }, [status]);
  const submit = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (data.website) return;
    const payload = {
      projectType: data.projectType,
      location: data.location.trim(),
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      description: data.description.trim(),
      consent: data.consent === "yes",
    };
    if (!payload.name || !payload.location || !payload.description) {
      setError("Please enter your name, location and project description.");
      setStatus("error");
      return;
    }
    setBrief(payload);
    if (!connected) {
      setStatus("demo");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) throw new Error("Unable to send");
      setStatus("sent");
    } catch {
      setError(
        "Your enquiry could not be sent. Your details are still here. Please try again.",
      );
      setStatus("error");
    }
  };
  const download = () => {
    const content = `DELTA DEMOLITION — PROJECT BRIEF\n\nNot submitted. Prepared from the website demo.\n\nProject: ${brief.projectType}\nLocation: ${brief.location}\nName: ${brief.name}\nEmail: ${brief.email}\nPhone: ${brief.phone || "Not supplied"}\n\nProject description:\n${brief.description}\n`;
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "delta-project-brief.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="enquiry-panel" id="enquiry">
      <div className="form-heading">
        <h2>TELL US ABOUT YOUR PROJECT.</h2>
        <p>Start with the essentials. Fields marked * are required.</p>
      </div>
      {!connected && (
        <div className="demo-notice">
          <span>PREVIEW FORM</span>
          <p>
            This form is a demo. Your details won’t be sent. You can prepare and
            download a project brief.
          </p>
        </div>
      )}
      <form onSubmit={submit} className="enquiry-form">
        <div className="form-row">
          <label>
            Project type *
            <select name="projectType" required defaultValue="">
              <option value="" disabled>
                Select a project type
              </option>
              {services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Other / not sure yet">Other / not sure yet</option>
            </select>
          </label>
          <label>
            Project location *
            <input
              name="location"
              autoComplete="address-level2"
              required
              maxLength="200"
              placeholder="City or nearest intersection"
            />
          </label>
        </div>
        <label>
          Your name *
          <input
            name="name"
            autoComplete="name"
            required
            maxLength="120"
            placeholder="Full name"
          />
        </label>
        <div className="form-row">
          <label>
            Email address *
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength="200"
              placeholder="you@example.com"
            />
          </label>
          <label>
            Phone number <span className="optional">(optional)</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              maxLength="40"
              placeholder="Your phone number"
            />
          </label>
        </div>
        <label>
          Tell us about the work *
          <textarea
            name="description"
            required
            minLength="15"
            maxLength="4000"
            rows="5"
            placeholder="What needs to come out? Share the approximate scope, access details and your preferred timing."
          />
        </label>
        <div className="honeypot" aria-hidden="true">
          <label>
            Leave this empty
            <input name="website" tabIndex="-1" autoComplete="off" />
          </label>
        </div>
        <label className="checkbox-label">
          <input type="checkbox" name="consent" value="yes" required />
          <span>
            {connected
              ? "I agree that Delta Demolition may use these details to respond to my enquiry."
              : "I understand this is a demo and my enquiry will not be sent."}{" "}
            *
          </span>
        </label>
        <button
          className="button form-submit"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending"
            ? "Sending enquiry…"
            : connected
              ? "Send estimate enquiry"
              : "Prepare project brief"}
          <ArrowUpRight size={19} />
        </button>
        <p className="form-fineprint">
          An enquiry is a starting point, not a confirmed booking or estimate.
        </p>
      </form>
      {(status === "demo" || status === "sent" || status === "error") && (
        <div
          className={`form-result ${status === "error" ? "form-error" : ""}`}
          tabIndex="-1"
          role="status"
          ref={result}
        >
          {status === "error" ? (
            <>
              <h3>Something needs your attention.</h3>
              <p>{error}</p>
            </>
          ) : status === "sent" ? (
            <>
              <Check size={25} />
              <h3>Your enquiry has been submitted.</h3>
              <p>Thank you for sharing your project details.</p>
            </>
          ) : (
            <>
              <Check size={25} />
              <h3>Your project brief is ready.</h3>
              <p>This is a demo. Nothing has been sent to Delta Demolition.</p>
              <dl>
                <div>
                  <dt>Project</dt>
                  <dd>{brief.projectType}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{brief.location}</dd>
                </div>
              </dl>
              <button className="text-link" type="button" onClick={download}>
                Download your brief <Download size={18} />
              </button>
            </>
          )}
        </div>
      )}
      <div className="privacy-note" id="privacy">
        <h3>About your information</h3>
        <p>
          {connected
            ? "The information you submit is sent to the configured enquiry service for Delta Demolition to respond. Only share details needed to discuss the work."
            : "In this demo, your entries stay in this page and are not stored on a server. Downloading a brief saves a text file to your own device. Leaving or reloading the page clears your entries."}
        </p>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <>
      <PageIntro
        label="REQUEST AN ESTIMATE"
        title={
          <>
            LET’S TALK ABOUT
            <br />
            WHAT COMES NEXT.
          </>
        }
      >
        A clear scope starts with a conversation. Tell us where you’re working
        and what you have in mind.
      </PageIntro>
      <section className="section contact-section">
        <div className="container contact-grid">
          <aside className="contact-aside">
            <Eyebrow>YOUR PROJECT. OUR STARTING POINT.</Eyebrow>
            <h2>
              MAKE THE
              <br />
              FIRST MOVE.
            </h2>
            <p>
              Whether you’re planning a renovation, a rebuild or a new use for a
              commercial space, start here.
            </p>
            <div className="contact-detail">
              <MapPin size={24} />
              <div>
                <h3>Toronto & the GTA</h3>
                <p>
                  Include your project location so the site and service area can
                  be reviewed.
                </p>
              </div>
            </div>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            {site.phone && (
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>
                {site.phone}
              </a>
            )}
            <div className="helpful-details">
              <h3>Helpful details to include</h3>
              <ul>
                <li>What you want removed and retained</li>
                <li>The approximate size of the space</li>
                <li>Site access or building restrictions</li>
                <li>Your preferred project timing</li>
              </ul>
            </div>
            <span className="contact-line" />
          </aside>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}

export default function App({ path = "/" }) {
  const page = getPage(path);
  useEffect(() => {
    document.title = `${page.title} | Delta Demolition`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", page.description);
  }, [page.title, page.description]);
  return (
    <>
      <Header path={path} />
      <main id="main" tabIndex="-1">
        {page.type === "home" && (
          <>
            <Hero />
            <ServicesGrid />
            <ProjectJournal />
            <Planning />
            <Process />
            <Coverage />
            <FAQs />
            <QuoteBanner />
          </>
        )}
        {page.type === "services" && (
          <>
            <PageIntro
              label="OUR SERVICES"
              title={
                <>
                  REMOVE WHAT’S THERE.
                  <br />
                  MAKE ROOM FOR WHAT’S NEXT.
                </>
              }
            >
              Residential, commercial and selective demolition for Toronto and
              the GTA. Find the right starting point for your project.
            </PageIntro>
            <ServicesGrid full />
            <Planning />
            <FAQs />
            <QuoteBanner />
          </>
        )}
        {page.type === "service" && <ServicePage service={page.service} />}
        {page.type === "projects" && (
          <>
            <PageIntro
              label="PROJECTS"
              title={
                <>
                  EVERY SITE HAS
                  <br />A NEXT CHAPTER.
                </>
              }
            >
              A space for genuine Delta project stories — the scope, the site
              and the work that prepares what comes next.
            </PageIntro>
            <ProjectJournal full />
            <QuoteBanner />
          </>
        )}
        {page.type === "about" && (
          <>
            <PageIntro
              label="ABOUT DELTA"
              title={
                <>
                  A CLEAR START.
                  <br />A STRONG NEXT STEP.
                </>
              }
            >
              Demolition is the first step in a bigger plan. Delta Demolition
              serves residential and commercial projects in Toronto and the GTA.
            </PageIntro>
            <Planning about />
            <Process />
            <Coverage />
            <QuoteBanner />
          </>
        )}
        {page.type === "contact" && <ContactPage />}
        {page.type === "404" && (
          <section className="section not-found container">
            <Eyebrow>404 / PAGE NOT FOUND</Eyebrow>
            <h1>
              LET’S GET YOU
              <br />
              BACK ON SITE.
            </h1>
            <p>The page you’re looking for isn’t here.</p>
            <Button href="/">Back to home</Button>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
