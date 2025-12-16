import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

const sendWhatsApp = (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const message = e.target.message.value;

  const text = `Halo, saya ${name}\nEmail: ${email}\nPesan: ${message}`;
  const phone = "6289607142946";

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
  e.target.reset();
};

const toggleSidebar = () => {
  setSidebarOpen((prev) => !prev);
};

const skillsData = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 75 },
  { name: "MySQL", level: 70 },
  { name: "Java", level: 75 },
  { name: "Filament", level: 65 },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [animateSkills, setAnimateSkills] = useState(false);
  const [skillValues, setSkillValues] = useState(skillsData.map(() => 0));
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateSkills(true);
        } else {
          setAnimateSkills(false);
        }
      },
      { threshold: 0.4 }
    );

    if (skillsRef.current) observer.observe(skillsRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!animateSkills) return;

    skillsData.forEach((skill, index) => {
      let step = 0;

      const interval = setInterval(() => {
        const random = Math.floor(Math.random() * 100);

        setSkillValues((prev) => {
          const updated = [...prev];
          updated[index] = step < 15 ? random : skill.level;
          return updated;
        });

        step++;
        if (step >= 15) clearInterval(interval);
      }, 60);
    });
  }, [animateSkills]);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [sidebarOpen]);

  return (
    <div className={`wrapper ${sidebarOpen ? "open" : "closed"}`}>
      {/* === TOGGLE BUTTON === */}
      <button
        className="toggle-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✖" : "☰"}
      </button>

      {/* === SIDEBAR === */}
      <aside className="sidebar">
        <div className="sidebar-inner">
          <div className="logo">Farrel Wiratama Ramadhan</div>
          <nav className="menu">
            <a href="#hero" onClick={toggleSidebar}>
              Home
            </a>
            <a href="#about" onClick={toggleSidebar}>
              About
            </a>
            <a href="#projects" onClick={toggleSidebar}>
              Projects
            </a>
            <a href="#skills" onClick={toggleSidebar}>
              Skills
            </a>
            <a href="#contact-section" onClick={toggleSidebar}>
              Contact
            </a>
          </nav>

          <div className="social">
            <a href="https://goo.gl/maps/zqCVWKsXVMdtpDgc7" target="_blank">
              <i class="fa-solid fa-location-dot"></i>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=farrelwr116@email.com"
              target="_blank"
            >
              <i class="fa-solid fa-envelope"></i>{" "}
            </a>
            <a href="http://localhost:5173/#" target="_blank">
              <i class="fa-solid fa-link"></i>
            </a>
            <a href="https://github.com/Parrelll" target="_blank">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </aside>

      <div className="overlay" onClick={() => setSidebarOpen(false)}></div>

      {/* === MAIN CONTENT === */}
      <main className="content">
        {/* HERO */}
        <section id="hero" className="hero">
          <div className="hero-text">
            <h1 className={`name ${sidebarOpen ? "stack" : "inline"}`}>
              <span>Farrel Wiratama</span>
              <span> Ramadhan</span>
            </h1>
            <p className="role">Fullstack Developer</p>
            <p className="desc">
              Saya membuat website modern yang cepat, elegan, dan responsif.
            </p>

            <div className="buttons">
              <a className="btn-primary" href="#projects">
                Lihat Proyek
              </a>
              <a
                className="btn-secondary"
                href="https://wa.me/6289607142946"
                target="_blank"
              >
                Hubungi Saya
              </a>
            </div>
          </div>

          <div className="hero-img-wrapper" data-aos="fade-down">
            <img src="/IMG/me.jpg" alt="Profile" className="hero-img" />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section-card" data-aos="fade-down">
          <h2>Tentang Saya</h2>
          <p>
            Saya adalah seorang developer yang memiliki ketertarikan besar dalam
            membangun antarmuka web yang modern, bersih, dan mudah digunakan.
            Saya terbiasa menggunakan HTML, CSS, JavaScript, dan React dalam
            mengembangkan website, dengan fokus utama pada clean code, estetika
            desain, serta pengalaman pengguna yang optimal. Saya lahir di
            Purwokerto pada tanggal 5 Oktober 2007 dan saat ini menempuh
            pendidikan di SMK Negeri 1 Purwokerto, dengan jurusan yang mendukung
            pengembangan keterampilan di bidang teknologi dan pemrograman.
            Melalui pendidikan dan pengalaman praktik yang saya jalani, saya
            terus berusaha mengembangkan kemampuan teknis maupun kreativitas
            dalam membuat solusi digital yang fungsional dan menarik. Saya
            memiliki semangat belajar yang tinggi, terbuka terhadap teknologi
            baru, dan selalu berusaha meningkatkan kualitas karya yang saya buat
            agar dapat memberikan nilai lebih bagi pengguna maupun klien.
          </p>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section-card" data-aos="fade-down">
          <h2>Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <img src="/IMG/porto.png" />
              <h3>Portfolio Website</h3>
              <p>Website portofolio elegan dengan tata letak profesional.</p>
            </div>

            <div className="project-card">
              <img src="/IMG/laundry.png" />
              <h3>Aplikasi Laundry</h3>
              <p>
                Aplikasi laundry berbasis desktop dengan menggunakan bahasa
                Java.
              </p>
            </div>

            <div className="project-card">
              <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4" />
              <h3>Task Manager</h3>
              <p>Aplikasi untuk mencatat dan mengatur tugas harian.</p>
            </div>

            <div className="project-card">
              <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4" />
              <h3>Task Manager</h3>
              <p>Aplikasi untuk mencatat dan mengatur tugas harian.</p>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section-card" ref={skillsRef}>
          <h2>Skills</h2>

          <div className="skills-list">
            {skillsData.map((skill, index) => (
              <div className="skill-item" key={skill.name}>
                <div className="skill-header">
                  <span>{skill.name}</span>
                  <span>{skillValues[index]}%</span>
                </div>

                <div className="skill-bar">
                  <div
                    className="skill-fill"
                    style={{
                      width: animateSkills ? `${skill.level}%` : "0%",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section class="contact-section">
          <h2 class="contact-title">Contact Us</h2>

          <div class="contact-wrapper">
            {/* LEFT CARD */}
            <div class="contact-info">
              <h3>Get In Touch</h3>
              <li class="contact-item">
                <i class="fa-solid fa-location-dot"></i>
                <span>Purwokerto, Central Java</span>
              </li>

              <ul>
                <li class="contact-item">
                  <i class="fa-solid fa-envelope"></i>
                  <span>farrelwr116@gmail.com</span>
                </li>

                <li class="contact-item">
                  <i class="fa-solid fa-phone"></i>
                  <span>(+62) 8960 - 7142 - 946</span>
                </li>

                <li class="contact-item">
                  <i class="fa-brands fa-whatsapp"></i>
                  <span>(+62) 8960 - 7142 - 946</span>
                </li>

                <li class="contact-item">
                  <i class="fa-brands fa-instagram"></i>
                  <span>@_pprrlll</span>
                </li>
              </ul>
            </div>

            {/* RIGHT CARD */}
            <form className="contact-form" onSubmit={sendWhatsApp}>
              <input name="name" placeholder="Your Name" required />
              <input name="email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" required />
              <button type="submit">Send Message</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
