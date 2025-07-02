(function () {
	"use strict";
	  /**
   * Mobile nav toggle
   */
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

// Add hover effect to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Add animation to service buttons
        document.querySelectorAll('.btn-service').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.querySelector('i').style.transform = 'translateX(5px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.querySelector('i').style.transform = 'translateX(0)';
            });
        });

document.addEventListener('DOMContentLoaded', function() {
            // Add functionality to quantity controls in modals
            document.querySelectorAll('.input-group .btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const input = this.parentNode.querySelector('input');
                    let value = parseInt(input.value) || 0;
                    
                    if (this.textContent === '+') {
                        input.value = value + 1;
                    } else if (value > 1) {
                        input.value = value - 1;
                    }
                });
            });
        });

  // Add hover animation to tiles
        document.querySelectorAll('.product-tile-home').forEach(tile => {
            tile.addEventListener('mouseenter', () => {
                tile.style.transform = 'translateY(-10px)';
            });
            
            tile.addEventListener('mouseleave', () => {
                tile.style.transform = 'translateY(0)';
            });
        });
})()
