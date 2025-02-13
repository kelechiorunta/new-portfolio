import { animateText } from "./apis/typer.js"
import { animateAvatarimages, animateSections } from "./apis/animate.js";
import { sendMessage } from "./apis/sendMessage.js";
import { createToaster } from "./apis/toaster.js";

// import "./style.scss";  // Webpack will process this


document.addEventListener('DOMContentLoaded', () => {
    const landingTitle = document.querySelector('.home-section .title');
    const avatar = document.querySelector('.avatar');
    const floatingNav = document.querySelector('.home-section .floating-nav');
    const mainHeader = document.querySelector('.main-header');
    const toggleBtn = mainHeader.querySelector('.toggle-container');
    const homeSection = document.querySelector('.home-section');
    const downloadCVBtn = homeSection.querySelector('.cont .download')

    const aboutSection = document.querySelector('.about-section');
    const parasection = aboutSection.querySelector('.about-container .about-description-container');
    const para1 = parasection.querySelector('.description .para1');
    const para2 = parasection.querySelector('.description .para2');
    const para3 = parasection.querySelector('.description .para3');

    const hamburgerBtn = mainHeader.querySelector('.hamburger-icon');
    const hamburgerNav = hamburgerBtn.querySelector(".overlay");
    const closehamburgerBtn = hamburgerNav.querySelector('.closebtn');
    console.log(closehamburgerBtn)

    // downloadCVBtn.addEventListener('click', async() => {
    //     try{
    //         const response = await fetch('/downloadResult', {
    //             credentials: 'same-origin',
    //             method:'GET',
    //             headers: {
    //                 'Content-Type' : 'application/json'
    //             }
    //         }
    //         )
    //         const result = await response.json();
    //         createToaster(result?.message, 'success');
    //     }
    //     catch(err){
    //         createToaster(err, 'failure');
    //     }
    // })

    let istoggled = false;
    let timeOut;
    // ToggleBtn Animations
    toggleBtn.addEventListener('click', function(){
        const toggle = this.querySelector('.toggle');
        toggle.classList.toggle('active');
        if (!istoggled) {
            homeSection.classList.add('backgroundAnimate'); //= 'url(/backgroundPic)';
            // homeSection.style.backgroundImage = 'url(/backgroundPic)';
            // timeOut = setTimeout(()=>{homeSection.style.backgroundImage = 'url(./imgs/developer_background.png)'},2000)//'url(./imgs/developer_background.png)';
            // homeSection.style.filter = 'brightness(0.7)';
            istoggled = true
        } else {
            // clearTimeout(timeOut);
            homeSection.classList.remove('backgroundAnimate');
            homeSection.style.backgroundImage = 'url(/imgs/developer.png)'//'url(./imgs/developer.png)';
            istoggled = false
        }
        
    })

    /* Open when someone clicks on the span element */
    function openNav() {
        hamburgerNav.style.left = "0%";
    }
    
    /* Close when someone clicks on the "x" symbol inside the overlay */
    function closeNav() {
        const hamburgerBtn = mainHeader.querySelector('.hamburger-icon');
        const hamburgerNav = hamburgerBtn.querySelector(".overlay");
        hamburgerNav.style.left = "-100%";
    }

    //Event delegation to the child closebtn
    hamburgerBtn.addEventListener('click', (event) => {
        if (event.target.classList.contains('closebtn')){
            closeNav();
        }else if (event.target.tagName === "A"){
            closeNav();
        }else{
            openNav();
        }
    })

    // Animate the landing-section contents with a delay of 5 secs
    animateText("Hi, I'm Kelechi", landingTitle, 100, 2000)
        .then(() => animateText("Full-Stack Developer", landingTitle, 100, 2000))
        // .then(() => toggleBtn.click())
        .then(() => animateText("Fun Programmer", landingTitle, 100, 2000))
        .then(() => animateText("Fun Learner", landingTitle, 100, 2000))
        .then(() => {
            landingTitle.textContent = "Hi, I'm Kelechi";
            avatar.style.transform = `translateY(calc(((590/1440) * 100vw) - calc((0/1440) * 100vw)))`;
            avatar.style.opacity='1'
            floatingNav.style.opacity='1'
            landingTitle.classList.add('animate');
            // toggleBtn.click();
        });

    // animateText("Hi, my name is Kelechi, and I specialize in web development that utilizes  HTML, CSS and Javascript.", para1, 100, 2000)
    // .then(() => {
    //     para1.textContent = "Hi, my name is Kelechi, and I specialize in web development that utilizes  HTML, CSS and Javascript.";
    // }).then(() => {
    //     animateText("I am a highly motivated individual, who is committed to  implementing  clear and concise code that works. I am also committed to learning and understanding the processes or workflows in building optimized and functional websites.", para2, 100, 2000)
    // })
    

        //Animate avatar images
        const blurDivs = avatar.querySelectorAll('.blur-load')
        animateAvatarimages(blurDivs)


        // GENERAL INTERSECTION ANIMATION FOR EACH SECTIONS OF THE HOME PAGE

        const sections = document.querySelectorAll("section"); // Add the "section" class to relevant sections
        animateSections(sections);
        
        

        const floatingNavObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
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
                }
            })
        }, {threshold:[0]})

        const allOtherSections = document.querySelectorAll('section:not(:first-child)');
        allOtherSections.forEach(section => {
            floatingNavObserver.observe(section);
        })

        const HeaderAndAvatarObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                        avatar.style.opacity = 0;
                        mainHeader.style.opacity = 0;
                        mainHeader.style.top = '-100%';
                        // mainHeader.style.backgroundColor = 'transparent';
                }else{
                        avatar.style.opacity = 1;
                        mainHeader.style.opacity = '1';
                        mainHeader.style.top = '0';    
                }
            })
        }, {threshold:[0, 0.5, 0.75]})
        
        const otherSections = document.querySelectorAll('section:not(:first-of-type)');
        console.log(otherSections)
        otherSections.forEach(section => {
            HeaderAndAvatarObserver.observe(section);
        })

        mainHeader.style.opacity = '1';
        mainHeader.style.top = '0';


        //Sending contact request from the contact section using the sendMessage API
        const sendMessageBtn = document.forms[0].querySelector('.sendBtn');
        sendMessageBtn.addEventListener('click', sendMessage )


})