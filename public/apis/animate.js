const animateSections = (sections) => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = 1;
                    child.style.transform = "translateY(0)";
                }, index * 1000); // Stagger effect
            });
                entry.target.style.transitionDelay = `${index * 2000}s`; // Stagger effect
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0 });

    

    sections.forEach((section) => {
        const children = section.children;
        Array.from(children).forEach((child) => {
            child.style.opacity = 0;
            child.style.transform = "translateY(200px)";
            child.style.transition = "opacity 0.8s ease-out, transform 0.6s ease-out";
        });

        observer.observe(section);
    });
}

export { animateSections }


//animate avatar images

const slideInterval = 4000;
    var currentSlide = 1;
    var projSlide=0;
    var autoSlide;
    var direction;
    var textTimeout;
    var textSlide, nexttextSlide;
    var firstIndex = 0;
    var animateInterval = 100;
    

const animateAvatarimages = (blurDivs) => {
    const slideImgs = document.querySelectorAll('.avatar .carousel .blur-load');
    const curvedSection = document.querySelector('.avatar .curved-section');
    
    blurDivs.forEach(div => {
        const img = div.querySelector('img')
        
        function loaded() {
            //show img
            div.classList.add('loaded')
        }
    
       
        if (img.complete){
            loaded()
        }else{
            img.addEventListener('load', loaded)
        }
    
    })
    
    function showSlide(index, direction) {
    
        curvedSection.setAttribute('data-direction', direction)
    
        slideImgs.forEach((slide, i) => {
            if ((i === index)) {
                slide.classList.add('active');
                slide.classList.remove('exit')
            }else if (slide.classList.contains('active')) {
                slide.classList.remove('active')
                slide.classList.add('exit')
            }else{
                slide.classList.remove('active', 'exit')
            }
        })
    }

    const root = document.querySelector(':root');
    
    function nextSlide(){
        if (!document.hidden){ 
        currentSlide = (currentSlide + 1) % slideImgs.length;
        root.style.setProperty('--left', '100%')
        }
        showSlide(currentSlide, 'next');
        
    }
    
    function prevSlide(){
        currentSlide = (currentSlide - 1 + slideImgs.length) % slideImgs.length;
        showSlide(currentSlide, 'prev');
    }
    
     // Initial display of the first slide
     showSlide(currentSlide, 'next');
      
     // Auto-slide every few seconds
     clearInterval(autoSlide)
     
    autoSlide = setInterval(nextSlide, slideInterval);
    
}

export { animateAvatarimages }