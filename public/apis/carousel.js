        const root = document.querySelector(':root');
        const slides = document.querySelectorAll('.projects .carousel-container .news');
        const indicators = document.querySelectorAll('.projects .carousel-container .indicator');
        const prevButton = document.querySelector('.carousel-btn.prev');
        const nextButton = document.querySelector('.carousel-btn.next');
        const carouselContainer = document.querySelector('.projects .carousel-container');
        const comments_heading = document.querySelector('.projects .comments h1');
        const comments_description = document.querySelector('.projects .comments p');
        let currentSlide = 2;
        const totalSlides = slides.length;
        const slideInterval = 10000; // Time in milliseconds (3 seconds)
        let autoSlide;
        var value ;
      
        function updateIndicators(index) {
          indicators.forEach((indicator, i) => {
            if (i === index) {
              indicator.classList.add('active');
            } else {
              indicator.classList.remove('active');
            }
          });
        }
      
        function showSlide(index, direction) {
            
          carouselContainer.setAttribute('data-direction', direction);
        
          slides.forEach((slide, i) => {
            
            if (i === index) {
            const commentTitle = slide.querySelector('h3');
            const commentDescription = slide.querySelector('p');
            comments_heading.textContent = commentTitle.textContent;
            comments_description.textContent = commentDescription.textContent;
            comments_heading.style.color = 'white';
            comments_heading.style.margin = 'calc((6/1440) * 100vw) auto';
            comments_heading.style.width = 'calc((161/1440) * 100vw)';
            comments_heading.style.height = 'calc((32/1440) * 100vw)';
            comments_heading.style.textAlign = 'center';
            comments_description.style.color = 'white';
            comments_description.style.margin = 'auto';
            comments_description.style.width = '100%';
            comments_description.style.textAlign = 'center';
              slide.classList.add('active');
              slide.classList.remove('exit');
            } else if (slide.classList.contains('active')) {
              slide.classList.remove('active');
              slide.classList.add('exit');
            } else {
              slide.classList.remove('active', 'exit');
            }
           
          });
      
          // Update indicators to reflect current slide
          updateIndicators(index);
        }
      
        function nextSlide() {
          currentSlide = (currentSlide + 1) % totalSlides; // Go to the next slide
          root.style.setProperty('--left', '100%')
          value = '-100%';
          showSlide(currentSlide, 'next');

        }
      
        function prevSlide() {
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Go to the previous slide
          root.style.setProperty('--left', '-100%')
          value = '100%'
          showSlide(currentSlide, 'prev');
        }
      
        // Initial display of the first slide
        showSlide(currentSlide, 'next');
      
        // Auto-slide every few seconds
        clearInterval(autoSlide)
        autoSlide = setInterval(nextSlide, slideInterval);
      
        // Event listeners for the buttons
        nextButton.addEventListener('click', () => {
          clearInterval(autoSlide);
          nextSlide();
          autoSlide = setInterval(nextSlide, slideInterval);
        });
      
        prevButton.addEventListener('click', () => {
          clearInterval(autoSlide);
          prevSlide();
          autoSlide = setInterval(prevSlide, slideInterval);
        });
      
        // Add click event to indicators for manual selection
        indicators.forEach((indicator, index) => {
          indicator.addEventListener('click', () => {
            clearInterval(autoSlide);
            currentSlide = index;
            showSlide(currentSlide, 'next');
            autoSlide = setInterval(nextSlide, slideInterval);
          });
        });