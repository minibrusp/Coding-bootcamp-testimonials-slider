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
      new Person('images/image-john.jpg', 'John Tarkpor', 'Junior Front-end Developer', '“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”')
   ];

   const buttons = document.querySelectorAll('.btn');

   for(let button of buttons) {
      button.addEventListener('click', (event) => {
         let currentPerson = document.querySelector('.testimonial__author h1');
         let jobDesc = document.querySelector('.testimonial__author span');
         let testimonialQuote = document.querySelector('.testimonial__quote p');
         let photoFLocation = document.querySelector('.photo');
         let testimonials = document.querySelector('.testimonial__items');

         if(testimonials.classList.contains('transition--left')===true || testimonials.classList.contains('transition--right')===true) {
            // console.log('button transition running');
            console.error('button transition running \nplease wait patiently.');
            
         }
         else if(photoFLocation.classList.contains('animation--photoClickAnimation')===true) {
            console.error('Photo Animation Running \nplease wait patiently.');
         }
         else {
            leftOrRight(event,testimonials);
            
            for(let person of persons) {
               if(person.fullName !== currentPerson.innerHTML) {
                  currentPerson.innerHTML = person.fullName;
                  jobDesc.innerHTML = person.jobDescription;
                  testimonialQuote.innerHTML = person.testimonial;
                  photoFLocation.src = person.photo;
                  setTimeout(()=> {
                     leftOrRight(event,testimonials);

                  },1000);

                  photoFLocation.classList.toggle('animation--photoClickAnimation');

                  setTimeout(()=> {
                     photoFLocation.classList.toggle('animation--photoClickAnimation');

                  },6000);
                  break;
               }
            }
         }
         
      });
   }

   function leftOrRight(e, testimonials) {
      if(e.target.classList.contains('next')===true) {
         testimonials.classList.toggle('transition--left');
      }
      else if(e.target.classList.contains('prev')==true) {
         testimonials.classList.toggle('transition--right');
      }
   }

});