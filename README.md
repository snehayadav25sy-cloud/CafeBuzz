# ☕ CafeBuzz

Welcome to **CafeBuzz** – a modern, premium, and fully responsive frontend website for a high-end coffee shop. This project was crafted from the ground up focusing on a dark-mode, glassmorphism design aesthetic to provide users with a visually stunning experience.

Designed and developed by **Praneet Kumar Tiwari**.

## ✨ Features

- **Premium Dark Aesthetics:** Deep chocolate and amber tones combined with a modern UI approach inspired by top Dribbble designs.
- **Glassmorphism UI:** Soft, frosted glass effects (`backdrop-filter`) across the navbar, menu cards, and feature sections for an elegant look.
- **Dynamic Menu Filtering:** Instantly filter between Coffee, Tea, Snacks, and Desserts without any page reloads using Vanilla JavaScript.
- **Responsive Layout:** Automatically scales and reflows from Desktop down to Mobile using CSS Grid and Flexbox.
- **Scroll Animations:** Smooth fade-in effects triggered by the Intersection Observer API for sections as you scroll down the page.
- **Interactive Elements:** Real-time toast notifications for "Add to Cart" actions and intuitive hover states across elements.

## 🛠️ Built With

This project avoids heavy frameworks, relying entirely on the core web triad for maximum performance and educational foundation:
- **HTML5:** Semantic structure and accessible markup.
- **CSS3:** Custom Variables (Tokens), Grid, Flexbox, and advanced visual properties.
- **JavaScript (ES6+):** DOM manipulation, Event Listeners, and Intersection Observers.
- **Assets:** High-fidelity, locally-hosted imagery (sourced from Unsplash).

## 📁 Project Structure

```text
CafeBuzz/
├── assets/          # Directory containing all high-quality local images (hero, menu items)
├── style.css        # Centralized styling, variables, layout logic, and design tokens
├── script.js        # Core logic: Filtering, Toast notifications, Scroll animations
├── index.html       # Landing page (Hero section, Stats, Featured Specials)
├── menu.html        # Comprehensive interactive product catalog (18+ items)
├── about.html       # Brand story, Founder details, and core values
└── contact.html     # User inquiry form and integrated map UI
```

## 🚀 Getting Started

Since this is a static frontend project, no complex build steps (like Webpack or Vite) are required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/snehayadav25sy-cloud/CafeBuzz.git
   cd CafeBuzz
   ```

2. **Run the application:**
   - **Option A (Easiest):** Simply double-click `index.html` to open it in any modern browser.
   - **Option B (Local Server):** Use a local HTTP server (recommended for avoiding local CORS issues). If you have Node.js installed:
     ```bash
     npx serve . -p 3000
     ```
     Then navigate to `http://localhost:3000`.

## 📜 Acknowledgements

A special thanks to the rich community of UI/UX designers on Dribbble for the inspiration behind the deep, premium cafe aesthetic.
