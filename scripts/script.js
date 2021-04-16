document.addEventListener('DOMContentLoaded', () => {
   console.log('Hello');

   class Person {
      constructor(photo, fullName, jobDescription, testimonial) {
         this.photo = photo;
         this.fullName = fullName;
         this.jobDescription = jobDescription;
         this.testimonial = testimonial;
      }
      PersonDescription() {
         return `Full Name : ${this.fullName} \nJob : ${this.jobDescription} \nTestimonial: ${this.testimonial} \nPhoto File Location: ${this.photo}`;
      }
   }

   const persons = [
      new Person('images/image-tanya.jpg', 'Tanya Sinclair', 'UX Engineer', '“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”'),
      new Person('images/image-john.jpg', 'John Tarkpor', 'Junior Front-end Developer', '“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”',
      new Person('images/image-spiderman.jpg', 'SpiderMan', 'Web Developer', '“With great power comes great responsibility.'))
   ];

   

   const buttons = document.querySelectorAll('.btn');


   for(let button of buttons) {
      eventListeners(button);
   }




   function eventListeners(button) {
      button.addEventListener('click', btnOnClick);
   }

   function btnOnClick(event) {
      let currentPerson = document.querySelector('.testimonial__author h2');
      let jobDesc = document.querySelector('.testimonial__author span');
      let testimonialQuote = document.querySelector('.testimonial__quote p');
      let photoFLocation = document.querySelector('.photo');
      let testimonials = document.querySelector('.testimonial__items');
      let arrayCurrentPerson = {
         currentPerson,
         jobDesc,
         testimonialQuote,
         photoFLocation
      }
      
      let checked = hasTransitionNAnimation(testimonials,photoFLocation);
      if(checked !== true) {
         leftOrRight(event, testimonials);
         checkEveryCurrentPerson(event, arrayCurrentPerson,testimonials);
      }
   }

   function hasTransitionNAnimation(testimonials, photoFLocation) {
      let checker = false;
      if(testimonials.classList.contains('transition--left')===true|| testimonials.classList.contains('transition--right')===true) {
         console.error('button transition still running \nplease wait patiently.');
         checker = true;
      }
      if(photoFLocation.classList.contains('animation--photoClickAnimation')===true) {
         console.error('photo animation still running \nplease wait patiently.')
         checker = true;
      }
      return checker;
   }

   function leftOrRight(e, testimonials) {
      if(e.target.classList.contains('next')===true) {
         testimonials.classList.toggle('transition--left');
      }
      if(e.target.classList.contains('prev')==true) {
         testimonials.classList.toggle('transition--right');
      }
   }

   function checkEveryCurrentPerson(event, arrayCurrentPerson, testimonials) {
      for(let person of persons) {
         let checked = checkCurrentPerson(person, arrayCurrentPerson.currentPerson);
         if(checked === true) {
            changeVisiblePerson(person, arrayCurrentPerson);
            removeAnimationLeftOrRight(event, testimonials);
            arrayCurrentPerson.photoFLocation.classList.toggle('animation--photoClickAnimation');
            removeAnimationPhotoClick(arrayCurrentPerson.photoFLocation);
            break;
         }
      }
   }

   function checkCurrentPerson(person, currentPerson) {
      if(person.fullName !== currentPerson.innerHTML) {
         return true;
      }
   }

   function changeVisiblePerson(person, arrayCurrentPerson) {
      arrayCurrentPerson.currentPerson.innerHTML = person.fullName;
      arrayCurrentPerson.jobDesc.innjerHTML = person.jobDescription;
      arrayCurrentPerson.testimonialQuote.innerHTML = person.testimonial;
      arrayCurrentPerson.photoFLocation.src = person.photo;
   }

   function removeAnimationLeftOrRight(event, testimonials) {
      setTimeout(() => {
         leftOrRight(event, testimonials);
      }, 1000);
   }

   function removeAnimationPhotoClick(photoFLocation) {
      setTimeout(() => {
         photoFLocation.classList.toggle('animation--photoClickAnimation');
      },6000);
   }

});