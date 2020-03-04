'use strict';

//JavaScript for Hamburger Menu

$(document).ready(function () {

    $('.first-button').on('click', function () {
  
      $('.animated-icon1').toggleClass('open');
    });
    $('.second-button').on('click', function () {
  
      $('.animated-icon2').toggleClass('open');
    });
    $('.third-button').on('click', function () {
  
      $('.animated-icon3').toggleClass('open');
    });
  });



//JavaScript for Carousel
var slideIndex = 0; 
// call showslide method 
// showSlides(); 

// jQuery( document ).ready( function( $ ) {
   
// 	$('.owl-carousel').owlCarousel({
// 	  margin: 10,
// 	  loop: true,
// 	  autoWidth: true,
// 	  items: 4
// 	})
		 
//  });

// function showSlides() 
// { 
// 	var i; 

// 	// get the array of divs' with classname image-sliderfade 
// 	let slides = document.getElementsByClassName("image-sliderfade"); 
	
// 	// get the array of divs' with classname dot 
// 	let dots = document.getElementsByClassName("dot"); 

	// let carousel = $('.image-sliderfade');
	// carousel.slides({
	// 	items:4,
	// 	loop:true,
	// 	margin:10,
	// 	autoplay:true,
	// 	autoplayTimeout:1000,
	// 	autoplayHoverPause:true
	// });

// 	for (i = 0; i < slides.length; i++) { 
// 		// initially set the display to 
//         // none for every image.
//         console.log(slides); 
// 		slides[i].style.display = "none"; 
// 	} 

// 	// increase by 1, Global variable 
// 	slideIndex++; 

// 	// check for boundary 
// 	if (slideIndex > slides.length) 
// 	{ 
// 		slideIndex = 1; 
// 	} 

// 	for (i = 0; i < dots.length; i++) { 
// 		dots[i].className = dots[i].className. 
// 							replace(" active", ""); 
// 	} 

// 	slides[slideIndex - 1].style.display = "block"; 
// 	dots[slideIndex - 1].className += " active"; 

	
// 	// Change image every 2 seconds 
// 	setTimeout(showSlides, 2000); 
// } 

// showSlides();