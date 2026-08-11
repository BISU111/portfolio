/* =====================================================
   LOADER
===================================================== */

const loader = document.getElementById("loader");
const progress = document.getElementById("loaderProgress");
const percent = document.getElementById("loaderPercent");

let loading = 0;

const loaderTimer = setInterval(() => {

  loading += Math.floor(Math.random() * 8) + 2;

  if (loading >= 100) {
    loading = 100;
    clearInterval(loaderTimer);

    setTimeout(() => {
      loader.classList.add("hide");
    }, 500);
  }

  progress.style.width = `${loading}%`;
  percent.textContent = loading;

}, 55);


/* =====================================================
   CURSOR
===================================================== */

const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", e => {

  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;

});

function cursorAnimation() {

  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  ring.style.left = `${ringX}px`;
  ring.style.top = `${ringY}px`;

  requestAnimationFrame(cursorAnimation);
}

cursorAnimation();


document.querySelectorAll("a, button, .tool, .project").forEach(el => {

  el.addEventListener("mouseenter", () => {
    ring.style.width = "65px";
    ring.style.height = "65px";
  });

  el.addEventListener("mouseleave", () => {
    ring.style.width = "34px";
    ring.style.height = "34px";
  });

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

menuButton.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});

mobileNav.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });

});


/* =====================================================
   TYPING
===================================================== */

const typing = document.getElementById("typing");

const words = [
  "AI APPLICATIONS",
  "INTELLIGENT SYSTEMS",
  "SOFTWARE PRODUCTS",
  "AI AUTOMATION",
  "LLM WORKFLOWS",
  "CLOUD SYSTEMS"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeText() {

  const word = words[wordIndex];

  if (!deleting) {

    charIndex++;

    typing.textContent =
      word.substring(0, charIndex);

    if (charIndex === word.length) {

      deleting = true;

      setTimeout(typeText, 1200);

      return;
    }

  } else {

    charIndex--;

    typing.textContent =
      word.substring(0, charIndex);

    if (charIndex === 0) {

      deleting = false;

      wordIndex++;

      if (wordIndex >= words.length) {
        wordIndex = 0;
      }
    }
  }

  setTimeout(
    typeText,
    deleting ? 35 : 70
  );
}

typeText();


/* =====================================================
   AI ORB
===================================================== */

const orb = document.getElementById("aiOrb");
const visual = document.querySelector(".hero-visual");

visual.addEventListener("mousemove", e => {

  const rect = visual.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (centerY - y) / 25;
  const rotateY = (x - centerX) / 25;

  orb.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
  `;

  document.getElementById("coordX").textContent =
    Math.round(x).toString().padStart(3, "0");

  document.getElementById("coordY").textContent =
    Math.round(y).toString().padStart(3, "0");

});

visual.addEventListener("mouseleave", () => {
  orb.style.transform = "";
});


/* =====================================================
   PARTICLE NETWORK
===================================================== */

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});


class Particle {

  constructor() {

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = (Math.random() - .5) * .35;
    this.vy = (Math.random() - .5) * .35;

    this.radius = Math.random() * 1.4 + .4;
  }

  update() {

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) {
      this.vx *= -1;
    }

    if (this.y < 0 || this.y > canvas.height) {
      this.vy *= -1;
    }

  }

  draw() {

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "rgba(0,245,255,.55)";
    ctx.fill();

  }
}


function createParticles() {

  particles = [];

  const amount =
    window.innerWidth < 700 ? 45 : 100;

  for (let i = 0; i < amount; i++) {
    particles.push(new Particle());
  }

}


function connectParticles() {

  for (let i = 0; i < particles.length; i++) {

    for (let j = i + 1; j < particles.length; j++) {

      const dx =
        particles[i].x - particles[j].x;

      const dy =
        particles[i].y - particles[j].y;

      const distance =
        Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {

        const opacity =
          (1 - distance / 120) * .15;

        ctx.beginPath();

        ctx.moveTo(
          particles[i].x,
          particles[i].y
        );

        ctx.lineTo(
          particles[j].x,
          particles[j].y
        );

        ctx.strokeStyle =
          `rgba(0,245,255,${opacity})`;

        ctx.lineWidth = .5;

        ctx.stroke();
      }
    }
  }
}


function animateNetwork() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach(particle => {

    particle.update();
    particle.draw();

  });

  connectParticles();

  requestAnimationFrame(animateNetwork);
}

createParticles();
animateNetwork();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
  document.querySelectorAll(".reveal");

const observer =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("active");

        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold: .12
  });


revealElements.forEach(el => {
  observer.observe(el);
});


/* =====================================================
   COUNTERS
===================================================== */

const counters =
  document.querySelectorAll("[data-count]");

let countersStarted = false;

const counterObserver =
  new IntersectionObserver(entries => {

    if (!entries[0].isIntersecting) {
      return;
    }

    if (countersStarted) {
      return;
    }

    countersStarted = true;

    counters.forEach(counter => {

      const target =
        Number(counter.dataset.count);

      let current = 0;

      const timer =
        setInterval(() => {

          current += Math.ceil(target / 40);

          if (current >= target) {

            current = target;

            clearInterval(timer);
          }

          counter.textContent = current;

        }, 35);

    });

  });


const stats = document.querySelector(".stats");

if (stats) {
  counterObserver.observe(stats);
}


/* =====================================================
   MAGNETIC BUTTONS
===================================================== */

document.querySelectorAll(".magnetic").forEach(button => {

  button.addEventListener("mousemove", e => {

    const rect =
      button.getBoundingClientRect();

    const x =
      e.clientX -
      rect.left -
      rect.width / 2;

    const y =
      e.clientY -
      rect.top -
      rect.height / 2;

    button.style.transform =
      `translate(${x * .15}px, ${y * .15}px)`;

  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });

});


/* =====================================================
   TOOL CARD 3D
===================================================== */

document.querySelectorAll(".tool").forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect =
      card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const rotateX =
      (y - rect.height / 2) / 30;

    const rotateY =
      (rect.width / 2 - x) / 30;

    card.style.transform =
      `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
      `;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });

});


/* =====================================================
   SMOOTH NAVIGATION
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", e => {

    const targetId =
      link.getAttribute("href");

    const target =
      document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth"
    });

  });

});


/* =====================================================
   YEAR
===================================================== */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =====================================================
   CONSOLE
===================================================== */

console.log(
  "%c AI PORTFOLIO ONLINE ",
  "background:#00f5ff;color:#000;padding:10px;font-weight:bold;"
);

console.log(
  "%c HUMAN × AI × SOFTWARE × CLOUD ",
  "color:#b7ff3c;font-weight:bold;"
);