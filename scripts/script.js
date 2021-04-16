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
      new Person('images/image-john.jpg', 'John Tarkpor', 'Junior Front-end Developer', '“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”'),
      new Person('images/image-spiderman2.jpg', 'SpiderMan', 'Web Developer', '“With great power comes great responsibility.”'),
      new Person('images/image-spiderman.jpg', 'SpiderMan', 'Web Developer', '“And did you know on this site that you can also use left and right arrow keys on desktop?”')
   ];

   

   const buttons = document.querySelectorAll('.btn');
   let indexOfPerson = 0;
   const maxLengthOfPerson = persons.length - 1;


   for(let button of buttons) {
      eventListeners(button);
   }




   function eventListeners(button) {

      button.addEventListener('click', btnEvent);
      window.addEventListener('keydown', btnEvent);
   }

   function btnEvent(event) {
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

      if(checkEvent(event) === 'click') {
         btnOnClick(event, arrayCurrentPerson, testimonials);
         return;
      }
      if(checkEvent(event) === 'keydown') {
         btnOnKeyDown(event, arrayCurrentPerson, testimonials);
         return;
      }
   }

   function btnOnClick(event, arrayCurrentPerson, testimonials) {
      
      let checked = hasTransitionNAnimation(testimonials,arrayCurrentPerson.photoFLocation);
      if(checked !== true) {
         let direction = leftOrRight(event, testimonials);
         event.target.classList.add('btn--opacity');
         changeCurrentPerson(event, arrayCurrentPerson,testimonials, direction);
      }
   }

   function btnOnKeyDown(event, arrayCurrentPerson, testimonials) {
      
      let checked = hasTransitionNAnimation(testimonials,arrayCurrentPerson.photoFLocation);
      if(checked !== true) {
         let direction = leftOrRightKey(event, testimonials);
         btnAnimationKey(event);
         changeCurrentPerson(event, arrayCurrentPerson,testimonials, direction);
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

   function checkEvent(event) {
      return event.type;
   }


function leftOrRightKey(e, testimonials) {

   if (e.keyCode == '39') {
      testimonials.classList.toggle('transition--left');
      return 'next';
   }
   if (e.keyCode == '37') {
      testimonials.classList.toggle('transition--right');
      return 'prev';
   }
}

   function leftOrRight(e, testimonials) {
      if(e.target.classList.contains('next')===true) {
         testimonials.classList.toggle('transition--left');
         return 'next';
      }
      if(e.target.classList.contains('prev')===true) {
         testimonials.classList.toggle('transition--right');
         return 'prev';
      }
   }

   function btnAnimationKey(e) {
      let btnNextKey = document.querySelector('.btn__container button.next');
      let btnPrevKey = document.querySelector('.btn__container button.prev');
      if (e.keyCode == '39') {
         btnNextKey.classList.toggle('btn--opacity');
      }
      if (e.keyCode == '37') {
         btnPrevKey.classList.toggle('btn--opacity');
         return;
      }
   }

   function changeCurrentPerson(event, arrayCurrentPerson, testimonials, direction) {
      
      if(direction === 'next') {
         indexOfPerson++;
         indexOfPersonMinMax()
      }
      if(direction === 'prev') {
         indexOfPerson--;
         indexOfPersonMinMax()
      }

      changeVisiblePerson(arrayCurrentPerson);
      removeAnimationLeftOrRight(event, testimonials);
      arrayCurrentPerson.photoFLocation.classList.toggle('animation--photoClickAnimation');
      removeAnimationPhotoClickAndButtonOpacity(arrayCurrentPerson.photoFLocation, event);
   }

   function indexOfPersonMinMax() {
      if(indexOfPerson > maxLengthOfPerson) {
         indexOfPerson = 0;
         return;
      }

      if(indexOfPerson < 0 ) {
         indexOfPerson = maxLengthOfPerson;
         return;
      }
   }

   function changeVisiblePerson(arrayCurrentPerson) {
      arrayCurrentPerson.currentPerson.innerHTML = persons[indexOfPerson].fullName;
      arrayCurrentPerson.jobDesc.innerHTML = persons[indexOfPerson].jobDescription;
      arrayCurrentPerson.testimonialQuote.innerHTML = persons[indexOfPerson].testimonial;
      arrayCurrentPerson.photoFLocation.src = persons[indexOfPerson].photo;
   }

   function removeAnimationLeftOrRight(event, testimonials) {
      setTimeout(() => {
         if(checkEvent(event) === 'click') {
            leftOrRight(event, testimonials);
         }
         if(checkEvent(event) === 'keydown') {
            leftOrRightKey(event, testimonials);
         }
      }, 1000);
   }

   function removeAnimationPhotoClickAndButtonOpacity(photoFLocation,event) {
      setTimeout(() => {
         photoFLocation.classList.toggle('animation--photoClickAnimation');
         if(checkEvent(event) === 'click') {
            event.target.classList.toggle('btn--opacity');
         }
         if(checkEvent(event) === 'keydown') {
            btnAnimationKey(event);
         }
      },6000);
   }


});