const sections = document.querySelectorAll("section:not(#strengths_section)");
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

/* ---- COURSE 섹션 dish hover ---- */
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

/* ---- APPETIZER → ABOUT ME ---- */
const appetizerDish = document.querySelector(".dish_appetizer");
const aboutMeSection = document.querySelector("#about_me_section");
const courseSectionEl = document.querySelector("#course_section");

appetizerDish.addEventListener("click", (e) => {
    e.preventDefault();

    courseSection.classList.add("is-fading-out");
    appetizerDish.classList.add("is-entering");

    setTimeout(() => {
        aboutMeSection.scrollIntoView({ behavior: "smooth", block: "start" });
        current_index = [...sections].indexOf(aboutMeSection);
    }, 180);

    setTimeout(() => {
        aboutMeSection.classList.add("is-visible");
        courseSection.classList.remove("is-fading-out");
        appetizerDish.classList.remove("is-entering");
    }, 700);
});

/* ---- ABOUT ME → COURSE back ---- */
const backToCourseLink = document.querySelector(".about_me_back");

backToCourseLink.addEventListener("click", (e) => {
    e.preventDefault();
    courseSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
    current_index = [...sections].indexOf(courseSectionEl);
});

/* ---- PASTA → STRENGTHS ---- */
const pastaDish = document.querySelector(".dish_pasta");
const strengthsSection = document.querySelector("#strengths_section");
const strengthsBackLink = document.querySelector(".strengths_back");

pastaDish.addEventListener("click", (e) => {
    e.preventDefault();
    strengthsSection.classList.add("is-visible");
});

strengthsBackLink.addEventListener("click", (e) => {
    e.preventDefault();
    strengthsSection.classList.remove("is-visible");
});

/* ---- STRENGTHS hover ---- */
const strengthItems = document.querySelectorAll(".strength_item");
const strengthsList = document.querySelector(".strengths_list");

strengthItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        strengthsList.classList.add("is-hovering");
        strengthItems.forEach(i => i.classList.remove("is-active"));
        item.classList.add("is-active");
    });

    item.addEventListener("mouseleave", () => {
        item.classList.remove("is-active");
        strengthsList.classList.remove("is-hovering");
    });
});

/* ---- MAIN → PROJECT LIST ---- */
const mainDish = document.querySelector(".dish_main");
const mainSection = document.querySelector("#main_section");
const mainBackLink = document.querySelector(".main_back");

mainDish.addEventListener("click", (e) => {
    e.preventDefault();
    mainSection.classList.add("is-visible");
});

mainBackLink.addEventListener("click", (e) => {
    e.preventDefault();
    mainSection.classList.remove("is-visible");
});

/* ---- PROJECT DETAIL 섹션들 ---- */
const nmkSection = document.querySelector("#nmk_section");
const odSection = document.querySelector("#od_section");
const gs25Section = document.querySelector("#gs25_section");

const nmkBackLink = document.querySelector(".nmk_back");
const odBackLink = document.querySelector(".od_back");
const gs25BackLink = document.querySelector(".gs25_back");

// 리스트 클릭
document.querySelectorAll(".main_item")[0].addEventListener("click", () => {
    nmkSection.classList.add("is-visible");
});

document.querySelectorAll(".main_item")[1].addEventListener("click", () => {
    odSection.classList.add("is-visible");
});

document.querySelectorAll(".main_item")[2].addEventListener("click", () => {
    gs25Section.classList.add("is-visible");
});

// back 버튼
nmkBackLink.addEventListener("click", (e) => {
    e.preventDefault();
    nmkSection.classList.remove("is-visible");
});

odBackLink.addEventListener("click", (e) => {
    e.preventDefault();
    odSection.classList.remove("is-visible");
});

gs25BackLink.addEventListener("click", (e) => {
    e.preventDefault();
    gs25Section.classList.remove("is-visible");
});