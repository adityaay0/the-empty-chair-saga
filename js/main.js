/* ==========================================
   THE MITRA MANDAL CHRONICLES
   MAIN SCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeQuotes();
    initializeScrollAnimations();
    initializeCounters();
    initializeFooterYear();

});

/* ==========================================
   QUOTE ROTATOR
========================================== */

function initializeQuotes() {

    const quoteElement = document.getElementById("rotating-quote");

    if (!quoteElement) return;

    const quotes = [

        "Ordinary people matter.",
        "The moment every seat is occupied, nobody can challenge us.",
        "History survives when nobody wins completely.",
        "The future belongs to people who ask better questions.",
        "Never become the hero of your own story.",
        "Power belongs to no one.",
        "Every generation inherits unfinished work."

    ];

    let currentIndex = 0;

    setInterval(() => {

        currentIndex++;

        if (currentIndex >= quotes.length) {
            currentIndex = 0;
        }

        quoteElement.style.opacity = 0;

        setTimeout(() => {

            quoteElement.textContent = quotes[currentIndex];

            quoteElement.style.opacity = 1;

        }, 500);

    }, 5000);

}

/* ==========================================
   SCROLL REVEAL
========================================== */

function initializeScrollAnimations() {

    const elements = document.querySelectorAll(
        ".card, .character-card, .timeline-item"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(element => {

        element.classList.add("hidden");

        observer.observe(element);

    });

}

/* ==========================================
   COUNTER ANIMATION
========================================== */

function initializeCounters() {

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        if (!target) return;

        let current = 0;

        const increment = target / 100;

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            counter.textContent =
                Math.floor(current).toLocaleString();

        }, 20);

    });

}

/* ==========================================
   FOOTER YEAR
========================================== */

function initializeFooterYear() {

    const yearElement = document.getElementById("year");

    if (!yearElement) return;

    yearElement.textContent =
        new Date().getFullYear();

}

/* ==========================================
   SMOOTH SCROLL LINKS
========================================== */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target =
            document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});

/* ==========================================
   FOUNDERS HOVER SOUND PLACEHOLDER
========================================== */

function founderInteraction(name){

    console.log(
        `Viewing founder: ${name}`
    );

}

/* ==========================================
   TIMELINE HIGHLIGHT
========================================== */

window.addEventListener("scroll", () => {

    const timelineItems =
        document.querySelectorAll(".timeline-item");

    timelineItems.forEach(item => {

        const rect = item.getBoundingClientRect();

        if (
            rect.top < window.innerHeight * 0.7 &&
            rect.bottom > 0
        ) {

            item.classList.add("active");

        }

    });

});

/* ==========================================
   FUTURE JSON LOADER
========================================== */

async function loadCharacters() {

    try {

        const response =
            await fetch("data/characters.json");

        const data =
            await response.json();

        console.log(data);

    } catch(error) {

        console.error(
            "Unable to load characters",
            error
        );

    }

}
