// typing / text morph
const highlight = document.querySelector(".highlight");
const words = ["Anubhav Kumar", "Full Stack Dev", "ML Enthusiast", "Problem Solver"];
let part = 0, partIndex = 0, isDeleting = false;

function type() {
  let currentWord = words[part];
  let partial = currentWord.substring(0, partIndex);
  highlight.textContent = partial;

  if (!isDeleting && partIndex < currentWord.length) {
    partIndex++;
  } else if (isDeleting && partIndex > 0) {
    partIndex--;
  }

  if (partIndex === currentWord.length) isDeleting = true;
  if (isDeleting && partIndex === 0) {
    isDeleting = false;
    part = (part + 1) % words.length;
  }
  setTimeout(type, isDeleting ? 50 : 150);
}
type();

// fade stagger
const revealElements = document.querySelectorAll(".skill-card, .education-card, .project-card");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("fade-in");
      }, index * 150);
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.2});
revealElements.forEach(el => revealObserver.observe(el));

// mouse parallax
document.addEventListener("mousemove", e => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;
  document.querySelector("#hero").style.transform = `translate(${x*10}px, ${y*10}px)`;
});

// smooth scroll nav highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const top = window.scrollY;
    if(top >= sec.offsetTop - 100) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if(link.getAttribute("href").includes(current)){
      link.classList.add("active");
    }
  });
});

// floating bubbles
const bubblesContainer = document.createElement("div");
bubblesContainer.classList.add("bubbles");
document.body.appendChild(bubblesContainer);
for(let i=0; i<20; i++) {
  const b = document.createElement("div");
  b.className = "bubble";
  b.style.left = `${Math.random()*100}vw`;
  b.style.animationDuration = `${4 + Math.random()*6}s`;
  bubblesContainer.appendChild(b);
}
