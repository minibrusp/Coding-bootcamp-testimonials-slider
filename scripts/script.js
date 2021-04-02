document.addEventListener('DOMContentLoaded', () => {
   console.log('Hello');

   class Author {
      constructor(photo, fullName, jobDescription, testimonial) {
         this.photo = photo;
         this.fullName = fullName;
         this.jobDescription = jobDescription;
         this.testimonial = testimonial;
      }
      AuthorDescription() {
         return `Full Name : ${this.fullName} \nJob : ${this.jobDescription} \nTestimonial: ${this.testimonial} \nPhoto File Location: ${this.photo}`;
      }
   }

   const persons = [
      new Author('images/image-tanya.jpg', 'Tanya Sinclair', 'UX Engineer', '“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”'),
      new Author('images/image-john.jpg', 'John Tarkpor', 'Junior Front-end Developer', '“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”')
   ];

   const buttons = document.querySelectorAll('.btn');

   for(let button of buttons) {
      button.addEventListener('click', (event) => {
         let currentPerson = document.querySelector('.testimonial__author h1');
         let jobDesc = document.querySelector('.testimonial__author span');
         let testimonialQuote = document.querySelector('.testimonial__quote p');
         let photoFLocation = document.querySelector('.photo');

         for(let person of persons) {
            if(person.fullName !== currentPerson.innerHTML) {
               console.log('true');
               console.log('Current : ' + currentPerson.innerHTML);
               console.log('Person : ' + person.fullName);
               currentPerson.innerHTML = person.fullName;
               jobDesc.innerHTML = person.jobDescription;
               testimonialQuote.innerHTML = person.testimonial;
               photoFLocation.src = person.photo;
               break;
            }
         }
      });
   }

});