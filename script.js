const sections = document.querySelectorAll("section");
let current_index = 0;
let is_scrolling = false;

function update_current_section() {
    let closest_index = 0;
    let closest_distance = Math.abs(sections[0].getBoundingClientRect().top);

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
        behavior: "smooth"
    });

    setTimeout(() => {
        is_scrolling = false;
    }, 900);
}

window.addEventListener("wheel", (e) => {
    if (is_scrolling) return;

    if (e.deltaY > 0) {
        go_to_section(current_index + 1);
    } else if (e.deltaY < 0) {
        go_to_section(current_index - 1);
    }
}, { passive: true });

window.addEventListener("load", update_current_section);
window.addEventListener("resize", update_current_section);