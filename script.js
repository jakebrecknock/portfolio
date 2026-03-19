const typedLines = [
  "Building software with clarity.",
  "Creating tools people actually use.",
  "Finding ways to optimize real systems"
];

const projects = [
  {
    type: "Personal Project",
    year: "Present",
    title: "Stack Index",
    description:
      "I am working to create a site where people can upload their coding projects (be that vibe coded or life long passion projects). People would then be able to tag these projects with pertinent categories and allow others to check my database before they take the time to duplicate of an already existing solution.",
    tags: ["Backend development, Real world solutions, Java, Personal passions"],
    impact:
      "This project strives to implement AI as a means of saving users from recreating existing ideas so that their time can be used more efficienctly"
  },
  {
    type: "Professional Project",
    year: "Summer 2025",
    title: "ACE Live Estimate Platform",
    description:
      "Created and implemented a JavaScript website for ACE Handyman Services that produces and stores live estimates for the field manager and craftsmen. While working for AHS, I noticed there was a chance to optimize their quote generation. Instead of spending time and effort drafting estimates by hand, my website allowed for instant customer facing reports to be generated. This solution is still used by Ace Handyman Services, and, more importantly, ONLY Ace Handyman Services - a true business advantage",
    tags: ["JavaScript", "Firebase", "HTML", "CSS", "Operational Software"],
    impact:
      "This project created a real business advantage by enabling live estimates and improving the speed and quality of the estimating process."
  },
  {
    type: "Professional Project",
    year: "Summer 2025",
    title: "Warehouse Checkout System",
    description:
      "Built a second JavaScript-based system that allows workers to check tools and vehicles in and out of the ACE warehouse, with all updates visible in real time across devices.",
    tags: ["JavaScript", "Realtime Data", "Workflow Design", "Firebase"],
    impact:
      "This system improved clarity, accountability, and live coordination in an operational environment."
  },
  {
    type: "Professional Experience",
    year: "2024",
    title: "Tapster Robotics Assembly",
    description:
      "Worked on a small team responsible for assembling roughly one hundred restaurant payment robots on a tight timeline, with a strong emphasis on quality control, communication, and attention to detail.",
    tags: ["Hardware", "Assembly", "Quality Control", "Teamwork"],
    impact:
      "This experience strengthened precision, execution under pressure, and collaborative problem solving."
  },
  {
    type: "Leadership / Initiative",
    year: "2025–Present",
    title: "Grinnell Student Outreach Club",
    description:
      "Co-founded a club focused on strengthening relationships between Grinnell students and the surrounding rural Iowa communities. The organization now oversees roughly 130 students and aims to create a lasting local impact.",
    tags: ["Leadership", "Community", "Initiative", "Project Management"],
    impact:
      "This reflects the kind of work I value most: practical, ambitious, people-centered, and built for real impact."
  }
];

const typedText = document.getElementById("typedText");
const cursorGlow = document.getElementById("cursorGlow");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

const projectType = document.getElementById("projectType");
const projectYear = document.getElementById("projectYear");
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");
const projectTags = document.getElementById("projectTags");
const projectImpact = document.getElementById("projectImpact");

let lineIndex = 0;
let charIndex = 0;
let deleting = false;
let pause = false;

function runTypewriter() {
  const currentLine = typedLines[lineIndex];

  if (pause) {
    setTimeout(() => {
      pause = false;
      runTypewriter();
    }, 900);
    return;
  }

  if (!deleting) {
    typedText.textContent = currentLine.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === currentLine.length) {
      pause = true;
      deleting = true;
    }
  } else {
    typedText.textContent = currentLine.slice(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex <= 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % typedLines.length;
    }
  }

  setTimeout(runTypewriter, deleting ? 35 : 55);
}

runTypewriter();

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;
  cursorGlow.style.transform = `translate3d(${glowX - 120}px, ${glowY - 120}px, 0)`;
  requestAnimationFrame(animateGlow);
}

if (window.innerWidth > 780) {
  requestAnimationFrame(animateGlow);
}

function scrollToSection(id) {
  const targetId = id === "home" ? "home" : id;
  const el = document.getElementById(targetId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  mobileMenu.classList.remove("open");
}

document.querySelectorAll("[data-scroll]").forEach((item) => {
  item.addEventListener("click", () => {
    scrollToSection(item.dataset.scroll);
  });
});

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

function setActiveProject(index) {
  const project = projects[index];
  projectType.textContent = project.type;
  projectYear.textContent = project.year;
  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;
  projectImpact.textContent = project.impact;

  projectTags.innerHTML = "";
  project.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    projectTags.appendChild(span);
  });

  document.querySelectorAll(".project-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  document
    .querySelector(`.project-tab[data-project="${index}"]`)
    ?.classList.add("active");
}

document.querySelectorAll(".project-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveProject(Number(tab.dataset.project));
  });
});

setActiveProject(0);

document.querySelectorAll(".class-card").forEach((card) => {
  const button = card.querySelector(".class-toggle");
  button.addEventListener("click", () => {
    const isOpen = card.classList.contains("open");
    card.classList.toggle("open");
    button.textContent = isOpen ? "Open" : "Close";
  });
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

const sections = ["about", "projects", "classes", "connect"];
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "about";

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;
    const top = section.getBoundingClientRect().top;
    if (top <= 160) current = id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.scroll === current);
  });
});

document.querySelectorAll(".spotlight-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  });
});