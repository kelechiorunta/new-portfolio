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
        

        const hideAvatarObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    avatar.style.opacity = 0;
                    mainHeader.style.opacity = 0;
                    mainHeader.style.top = '-100%';
                    mainHeader.style.backgroundColor = 'transparent';
                    const floatingNavs = floatingNav.querySelectorAll('a');
                    console.log(entry.target.classList)
                    floatingNavs.forEach(nav => {
                        if (entry.target.classList[0].includes(`${nav.classList[0]}`)){
                            nav.style.backgroundColor = `#2EA787`;
                        }
                        else{
                            nav.style.backgroundColor = `transparent`;
                        }
                    })
                   
                    
                }else{
                    // avatar.style.opacity = '0';
                    mainHeader.style.opacity = '1';
                    mainHeader.style.top = '0';
                    // mainHeader.style.backgroundColor = '#1A1E23';
                    // observer.unobserve(entry.target)
                }
            })
        }, {rootMargin: '0px', threshold:[0]})

        const allSections = document.querySelectorAll('section');
        allSections.forEach(section => {
            hideAvatarObserver.observe(section);
        })

        const showAvatarObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    avatar.style.opacity = 1;
                    
                   
                    
                }
            })
        }, {threshold:0})
        
        const allwhiteSpaces = document.querySelectorAll('whitespace-section');
        allwhiteSpaces.forEach(section => {
            showAvatarObserver.observe(section);
        })


})