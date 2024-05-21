import { cartContainer } from "../script.js";

let toggleDarkMode = () => {
    let darkMode = JSON.parse(localStorage.getItem("darkMode"));

    // Items which must change when DM is toggled ON/ OFF
    const icon = document.getElementById("icon");
    const body = document.querySelector("body");
    const container = document.querySelector(".container");
    const menuItems2 = document.querySelectorAll('.menu-item');
    const logo = document.getElementsByClassName("logo")[0];
    const nav = document.querySelector("nav");
    const footer = document.querySelector("footer");
    const footerImage = document.getElementsByClassName("hand")[0];
    const line = document.querySelector(".rectangle");
    const gitIcons = document.querySelector(".git-icons");
    let navigation = document.querySelectorAll(".navigation");

    // Checks if dark theme is active
    if(!darkMode){
        //Removes dark theme elements
        body.classList.remove("dark-theme");
        icon.src = "assets/img/moon.png";
        container.style.backgroundImage = "url('assets/images/bg-light.svg')";
        logo.src = "assets/images/logo-light.svg";
        nav.style.backgroundColor = 'white';
        footer.style.backgroundImage = "url('assets/images/footer-light.svg')";
        //remove the card's style for dark mode
        menuItems2.forEach(item => {
            item.classList.remove('dark-card');
        })
        cartContainer.classList.remove("dark-theme");
        line.classList.remove("dark-theme");
        footerImage.src = "assets/images/photos/about-light.png";
        gitIcons.classList.remove("dark-theme");
        navigation.forEach((element, index) => {
            element.classList.remove('dark-theme');
        });
    }
    else {
        // Adds dark theme elements
        body.classList.add("dark-theme");
        icon.src = "assets/img/sun.png";
        container.style.backgroundImage = "url('assets/images/bg-dark.svg')"; 
        logo.src = "assets/images/logo-dark.svg";
        nav.style.backgroundColor = 'black';
        //add the card's style for the dark mode
        menuItems2.forEach(item => {
            item.classList.add('dark-card');
        });
        cartContainer.classList.add("dark-theme");
        footer.style.backgroundImage = "url('assets/images/footer-dark.svg')";
        footerImage.src = "assets/images/photos/about-dark.jpg";
        line.classList.add("dark-theme");
        gitIcons.classList.add("dark-theme");
        navigation.forEach((element, index) => {
            element.classList.add('dark-theme');
        });
    }
}

export { toggleDarkMode };