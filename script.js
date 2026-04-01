const sections = document.querySelectorAll("section");
let current_index = 0;
let is_scrolling = false;
let wheel_acc = 0;
let wheel_timer = null;

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
    }, 1100);
}

window.addEventListener("wheel", (e) => {
    if (is_scrolling) return;

    wheel_acc += e.deltaY;

    clearTimeout(wheel_timer);
    wheel_timer = setTimeout(() => {
        wheel_acc = 0;
    }, 180);

    if (Math.abs(wheel_acc) < 90) return;

    if (wheel_acc > 0) {
        go_to_section(current_index + 1);
    } else {
        go_to_section(current_index - 1);
    }

    wheel_acc = 0;
}, { passive: true });

window.addEventListener("load", update_current_section);
window.addEventListener("resize", update_current_section);
window.addEventListener("scroll", update_current_section);