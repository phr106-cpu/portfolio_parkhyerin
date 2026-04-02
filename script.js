const sections = document.querySelectorAll("section");
let current_index = 0;
let is_scrolling = false;

function update_current_section() {
    let closest_index = 0;
    let closest_distance = Infinity;

    sections.forEach((section, index) => {
        const distance = Math.abs(section.getBoundingClientRect().top);
        if (distance < closest_distance) {
            closest_distance = distance;
            closest_index = index;
        }
    });

    current_index = closest_index;
}

function go_to_section(index) {
    if (index < 0 || index >= sections.length) return;

    is_scrolling = true;
    current_index = index;

    sections[current_index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {
        is_scrolling = false;
        update_current_section();
    }, 900);
}

window.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (is_scrolling) return;

    if (e.deltaY > 0) {
        go_to_section(current_index + 1);
    } else if (e.deltaY < 0) {
        go_to_section(current_index - 1);
    }

}, { passive: false });

window.addEventListener("load", update_current_section);
window.addEventListener("resize", update_current_section);

const courseSection = document.querySelector("#course_section");
const courseDishes = document.querySelectorAll(".course_dish");

courseDishes.forEach((dish) => {
    const textPath = dish.querySelector("textPath");
    const path = dish.querySelector("path");

    const defaultText = textPath.textContent;
    const defaultPath = path.getAttribute("d");

    dish.addEventListener("mouseenter", () => {
        courseSection.classList.add("is-hovering");

        courseDishes.forEach((item) => {
            item.classList.remove("is-active");

            const itemTextPath = item.querySelector("textPath");
            const itemPath = item.querySelector("path");

            if (itemTextPath.dataset.defaultText) {
                itemTextPath.textContent = itemTextPath.dataset.defaultText;
            }

            if (itemPath.dataset.defaultD) {
                itemPath.setAttribute("d", itemPath.dataset.defaultD);
            }
        });

        textPath.dataset.defaultText = defaultText;
        path.dataset.defaultD = defaultPath;

        dish.classList.add("is-active");
        textPath.textContent = "CLICK THE DISH";

        path.setAttribute("d", "M 110 208 A 98 98 0 0 0 110 12");
    });

    dish.addEventListener("mouseleave", () => {
        dish.classList.remove("is-active");
        textPath.textContent = defaultText;
        path.setAttribute("d", defaultPath);
        courseSection.classList.remove("is-hovering");
    });
});

const appetizerLink = document.querySelector('.dish_appetizer');
const aboutSection = document.querySelector('#about_me_section');

appetizerLink.addEventListener('click', (e) => {
    e.preventDefault();

    aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    current_index = [...sections].indexOf(aboutSection);
});

const backToCourseLink = document.querySelector('.about_me_back');
const courseSectionEl = document.querySelector('#course_section');

backToCourseLink.addEventListener('click', (e) => {
    e.preventDefault();

    courseSectionEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    current_index = [...sections].indexOf(courseSectionEl);
});

const appetizerDish = document.querySelector(".dish_appetizer");
const aboutMeSection = document.querySelector("#about_me_section");
const aboutMeInner = document.querySelector("#about_me_section .about_me_inner");

appetizerDish.addEventListener("click", (e) => {
    e.preventDefault();

    courseSection.classList.add("is-fading-out");
    appetizerDish.classList.add("is-entering");

    setTimeout(() => {
        aboutMeSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        current_index = [...sections].indexOf(aboutMeSection);
    }, 180);

    setTimeout(() => {
        aboutMeSection.classList.add("is-visible");
        courseSection.classList.remove("is-fading-out");
        appetizerDish.classList.remove("is-entering");
    }, 700);
});

const pastaDish = document.querySelector(".dish_pasta");
const strengthsSection = document.querySelector("#strengths_section");

pastaDish.addEventListener("click", (e) => {
    e.preventDefault();

    strengthsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    current_index = [...sections].indexOf(strengthsSection);
});