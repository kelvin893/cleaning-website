    ////navbar
    function toggleMenu() {
        var navLinks = document.getElementById('nav-links');
        if (navLinks.classList.contains('active')) {
          navLinks.style.opacity = "0";
          navLinks.style.transform = "translateY(-10px)";
          setTimeout(() => navLinks.classList.remove('active'), 300);
        } else {
          navLinks.classList.add('active');
          setTimeout(() => {
            navLinks.style.opacity = "1";
            navLinks.style.transform = "translateY(0)";
          }, 10);
        }
      }
    
      // Load and display user testimonials on home page
      document.addEventListener('DOMContentLoaded', function() {
        console.log('Home page loaded - checking for testimonials...');
        loadTestimonialsForHomePage();
      });
    
      function loadTestimonialsForHomePage() {
        console.log('Loading testimonials for home page...');
        
        const testimonialsSlider = document.getElementById('testimonials');
        if (!testimonialsSlider) {
          console.error('Testimonials slider element not found!');
          return;
        }
        
        // Load from PHP backend
        fetch('get_testimonials.php')
          .then(response => response.json())
          .then(userReviews => {
            console.log('Found user reviews from server:', userReviews);
            
            // Clear the slider
            testimonialsSlider.innerHTML = '';
            
            // If no user reviews, show default testimonials
            if (userReviews.length === 0) {
              console.log('No user reviews found, showing default testimonials');
              showDefaultTestimonials();
              return;
            }
            
            console.log(`Displaying ${userReviews.length} user testimonials`);
            
            // Display user testimonials (show up to 8)
            userReviews.slice(0, 8).forEach((review, index) => {
              createTestimonialItem(review, index + 1);
            });
            
            // If we have less than 4 user reviews, add some default ones
            if (userReviews.length < 4) {
              addDefaultTestimonials(userReviews.length);
            }
          })
          .catch(error => {
            console.error('Error loading from server:', error);
            // Fallback to default testimonials
            showDefaultTestimonials();
          });
        
        function createTestimonialItem(review, index) {
          const testimonialItem = document.createElement('div');
          testimonialItem.className = `item item${index}`;
          
          const stars = '⭐'.repeat(parseInt(review.rating));
          
          testimonialItem.innerHTML = `
            <div class="testimonial-header">
              <span>${review.userName}</span>
              <img src="${review.avatar}" alt="${review.userName}">
            </div>
            <div class="testimonial-content">"${review.text}"</div>
            <div class="testimonial-stars">${stars}</div>
          `;
          
          testimonialsSlider.appendChild(testimonialItem);
        }
        
        function showDefaultTestimonials() {
          testimonialsSlider.innerHTML = `
            <div class="item item1">
              <div class="testimonial-header">
                <span>John Thompson</span>
                <img src="images/persons1.jpg" alt="John Doe">
              </div>
              <div class="testimonial-content">Absolutely outstanding service! My home has never looked this spotless. The team was punctual, professional, and paid attention to every detail. Highly recommend.</div>
              <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
            </div>
            <div class="item item2">
              <div class="testimonial-header">
                <span>Jane Smith</span>
                <img src="images/persons2.webp" alt="Jane Smith">
              </div>
              <div class="testimonial-content">I was amazed by how thorough the cleaning was! They got every corner, and my house smells so fresh. I'll definitely be booking again.</div>
              <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
            </div>
            <div class="item item3">
              <div class="testimonial-header">
                <span>Mark Wilson</span>
                <img src="images/persons3.jpg" alt="Mark Wilson">
              </div>
              <div class="testimonial-content">From booking to completion, the process was seamless. The cleaners were friendly, efficient, and left my house sparkling clean. Best cleaning service I've ever used.</div>
              <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
            </div>
            <div class="item item4">
              <div class="testimonial-header">
                <span>Anna Brown</span>
                <img src="images/persons4.webp" alt="Anna Brown">
              </div>
              <div class="testimonial-content">I hired them for a deep clean, and they exceeded my expectations. Even the toughest stains are gone. My house looks brand new.</div>
              <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
            </div>
          `;
        }
        
        function addDefaultTestimonials(startIndex) {
          const defaultTestimonials = [
            {
              name: "Jane Smith",
              avatar: "images/persons2.webp",
              content: "I was amazed by how thorough the cleaning was! They got every corner, and my house smells so fresh. I'll definitely be booking again.",
              stars: "⭐⭐⭐⭐⭐"
            },
            {
              name: "Mark Wilson", 
              avatar: "images/persons3.jpg",
              content: "From booking to completion, the process was seamless. The cleaners were friendly, efficient, and left my house sparkling clean.",
              stars: "⭐⭐⭐⭐⭐"
            }
          ];
          
          const neededDefaults = 4 - startIndex;
          defaultTestimonials.slice(0, neededDefaults).forEach((testimonial, index) => {
            createTestimonialItem({
              userName: testimonial.name,
              avatar: testimonial.avatar,
              text: testimonial.content,
              rating: 5
            }, startIndex + index + 1);
          });
        }
      }
    
      // Animation for pop-up text
      document.addEventListener("DOMContentLoaded", function() {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        const textElements = document.querySelectorAll(".pop-up-text");
        textElements.forEach(element => observer.observe(element));
      });