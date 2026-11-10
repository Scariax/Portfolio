# Febin Scaria — Personal Portfolio

Minimalist, monochromatic personal portfolio website engineered with a modern black, white, and grey design aesthetic inspired by clean workspace flatlays and modern engineering standards.

Live URL: [https://scariax.github.io/Portfolio/](https://scariax.github.io/Portfolio/)

---

## ✦ Design Philosophy

- **Minimalist Monochrome Theme**: Clean dark palette (`#090a0d`, `#14171e`, `#ffffff`) replacing standard green terminal aesthetics with refined typography and micro-interactions.
- **Typography**: 
  - **Poppins**: Clean geometric sans-serif for display headings and body narrative.
  - **JetBrains Mono**: High-legibility monospace for technical metadata, status indicators, and code snippets.
- **Visuals**: Center-aligned high-resolution portrait crop and subtle desk backdrop integration from LinkedIn branding reference.

---

## ✦ Key Sections

1. **Hero**: Quick identity, enterprise partner badge (HZD Wiesbaden), GPA metrics (1.62 / 155 ECTS), and centered portrait.
2. **About Me**: Narrative overview of dual study at Hochschule Darmstadt and practical IT Security at Hessische Zentrale für Datenverarbeitung (HZD).
3. **Work Experience**: Comprehensive breakdown of responsibilities at HZD across Infrastructure Automation (Ansible), Kubernetes, Python Scripting, and Post-Quantum Cryptography (PQC).
4. **Education**: Detailed academic achievements at Hochschule Darmstadt (Grade 1.0 in PQC & Quantum Tech), Studienkolleg at University of Kassel, and CBSE high school honors (96.6%).
5. **Projects & Pipeline**: Filterable grid featuring upcoming initiatives (*QuantumGuard: PQC-PKI Migration Framework*, *KubeHarden: Declarative Linux & K8s Auditor*) and completed academic software (*AI Travel Planner*, *2D Board Game Engine*).
6. **Technical Skills**: Grouped capabilities across Security & Cryptography, Cloud & DevOps, Languages (Python, Go, Java, C++, Dart, SQL), and Bilingual communication (English C1 IELTS 8.0, German C1).
7. **Contact**: Interactive contact card, one-click email copy, direct message dispatch, and downloadable resumes (English & German `.doc` formats).

---

## ✦ Project Structure

```text
Portfolio/
├── index.html                  # Semantic, accessible HTML5 structure
├── style.css                   # Custom responsive monochrome CSS
├── script.js                   # Lightweight vanilla JS for interactivity & scrollspy
├── README.md                   # Documentation & setup guide
└── assets/
    ├── profile.jpg             # Centered 3:4 portrait
    ├── avatar.jpg              # Centered 1:1 square avatar
    ├── linkedin-banner.jpg     # Minimalist desk backdrop
    ├── Resume_Febin_Scaria_EN.doc   # English CV
    └── Lebenslauf_Febin_Scaria_DE.doc # German CV
```

---

## ✦ Local Development & Preview

You can open `index.html` directly in any web browser, or serve it locally using Python or Node.js:

```bash
# Using Node.js npx (if installed)
npx serve .

# Or using Python (if installed)
python -m http.server 8000
```

---

## ✦ Deployment to GitHub Pages

To make this portfolio accessible at `https://scariax.github.io/Portfolio/`:

1. Commit and push the files to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: minimalist black, white, and grey portfolio website"
   git push origin main
   ```
2. In your GitHub repository settings:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Choose `main` branch and `/ (root)` directory, then click **Save**.
3. Your site will be published live within a couple of minutes!

---

© Febin Scaria &bull; Built with clean, standards-compliant web technologies.
