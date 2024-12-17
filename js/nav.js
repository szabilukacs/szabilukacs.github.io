// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");
const navLinks = document.querySelectorAll("#cs-expanded .cs-li-link"); // Select all navigation links

// Function to toggle the mobile navigation
CShamburgerMenu.addEventListener('click', function () {
    toggleMenu();
});

// Function to toggle classes for the menu
function toggleMenu() {
    CShamburgerMenu.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    ariaExpanded(); // Check and update aria-expanded
}

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (CSnavbarMenu.classList.contains('cs-active')) {
            toggleMenu(); // Close the menu by toggling classes
        }
    });
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
function ariaExpanded() {
    const csUL = document.querySelector('#cs-expanded');
    const csExpanded = csUL.getAttribute('aria-expanded');

    if (csExpanded === 'false') {
        csUL.setAttribute('aria-expanded', 'true');
    } else {
        csUL.setAttribute('aria-expanded', 'false');
    }
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
for (const item of dropDowns) {
    const onClick = () => {
        item.classList.toggle('cs-active')
    }
    item.addEventListener('click', onClick)
}

const bodyClassList = document.body.classList
const storageKey = 'isDarkModeEnabled'

let isEnabled = localStorage.getItem(storageKey)

const update = () => {
    bodyClassList.toggle('dark-mode', isEnabled)
}

const save = () => {
    if (isEnabled) localStorage.setItem(storageKey, true)
    else localStorage.removeItem(storageKey)
}

const toggle = () => {
    isEnabled = !isEnabled

    update()
    save()
}

update()


