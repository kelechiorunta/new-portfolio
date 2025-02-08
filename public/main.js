import { animateText } from "./apis/typer.js"
import { animateAvatarimages, animateSections } from "./apis/animate.js";

document.addEventListener('DOMContentLoaded', () => {
    const landingTitle = document.querySelector('.home-section .title');
    const avatar = document.querySelector('.avatar');
    const floatingNav = document.querySelector('.home-section .floating-nav');
    const mainHeader = document.querySelector('.main-header');
    const toggleBtn = mainHeader.querySelector('.toggle-container');
    const homeSection = document.querySelector('.home-section');


    // Animate the landing-section contents with a delay of 5 secs
    animateText("Hi, I'm Kelechi", landingTitle, 100, 2000)
        .then(() => animateText("Full-Stack Developer", landingTitle, 100, 2000))
        .then(() => animateText("Fun Programmer", landingTitle, 100, 2000))
        .then(() => animateText("Fun Learner", landingTitle, 100, 2000))
        .then(() => {
            landingTitle.textContent = "Hi, I'm Kelechi";
            avatar.style.transform = `translateY(calc(((590/1440) * 100vw) - calc((0/1440) * 100vw)))`;
            avatar.style.opacity='1'
            floatingNav.style.opacity='1'
            landingTitle.classList.add('animate');
        });
        let istoggled = false;
        // ToggleBtn Animations
        toggleBtn.addEventListener('click', function(){
            const toggle = this.querySelector('.toggle');
            toggle.classList.toggle('active');
            if (!istoggled) {
                homeSection.style.backgroundImage = 'url(./imgs/developer_background.png)';
                // homeSection.style.filter = 'brightness(0.7)';
                istoggled = true
            } else {
                homeSection.style.backgroundImage = 'url(./imgs/developer.png)';
                istoggled = false
            }
            
        })

        //Animate avatar images
        const blurDivs = avatar.querySelectorAll('.blur-load')
        animateAvatarimages(blurDivs)


        // GENERAL INTERSECTION ANIMATION FOR EACH SECTIONS OF THE HOME PAGE

        const sections = document.querySelectorAll("section"); // Add the "section" class to relevant sections
        animateSections(sections);
        


})