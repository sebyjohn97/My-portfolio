
// Preloader

window.addEventListener('load', function(){
    document.querySelector('.preloader').classList.add('opacity-0');
    setTimeout(function(){
        document.querySelector('.preloader').style.display = 'none';
    }, 1000);
});

// iTyped 

window.ityped.init(document.querySelector('.iTyped'), {
    strings: ["I'm a Web Developer", 'I Love Html5', 'I Love CSS3', 'I Love Jquery', 'I Love Laravel'],
    loop: true
});

// Portfolio Item Filter

const filterContainer = document.querySelector('.portfolio-filter'),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    portfolioItems = document.querySelectorAll('.portfolio-item'),
    totalPortfolioItem = portfolioItems.length;
    
    for (let i = 0; i < totalFilterBtn; i++) {
        filterBtns[i].addEventListener("click", function(){
            filterContainer.querySelector('.active').classList.remove('active');
            this.classList.add("active");

            const filterValue = this.getAttribute('data-filter');
            for (let k = 0; k < totalPortfolioItem; k++) {
                if (filterValue === portfolioItems[k].getAttribute('data-category')) {
                    portfolioItems[k].classList.remove('hide');
                    portfolioItems[k].classList.add('show');
                } else{
                    portfolioItems[k].classList.remove('show');
                    portfolioItems[k].classList.add('hide');
                }
                if (filterValue === 'all') {
                    portfolioItems[k].classList.remove('hide');
                    portfolioItems[k].classList.add('show');
                }
            }
        });
    }

// Portfolio Lighbox

const lightbox = document.querySelector('.lightbox'),
    lightboxImg = lightbox.querySelector('.lightbox-img'),
    lightboxText = lightbox.querySelector('.caption-text'),
    lightboxClose = lightbox.querySelector('.lightbox-close'),
    lightboxCounter = lightbox.querySelector('.caption-counter');

let itemIndex = 0;

for (let i = 0; i < totalPortfolioItem; i++) {
    portfolioItems[i].addEventListener('click', function(){
        itemIndex = i;
        changeItem();
        toggleLightbox();
    });
}

function toggleLightbox() {
    lightbox.classList.toggle('open');
}

function changeItem() {
    let imgSrc = portfolioItems[itemIndex].querySelector('.portfolio-img img').getAttribute('src');
    lightboxImg.src = imgSrc;
    lightboxText.innerHTML = portfolioItems[itemIndex].querySelector('h4').innerHTML;
    lightboxCounter.innerHTML = (itemIndex + 1) + " of " + totalPortfolioItem;
}

function prevItem() {
    if (itemIndex === 0) {
        itemIndex = totalPortfolioItem - 1;
    } else {
        itemIndex--;
    }
    changeItem();
}

function nextItem() {
    if (itemIndex === totalPortfolioItem - 1) {
        itemIndex = 0;
    } else {
        itemIndex++;
    }
    changeItem();
}

// close lightbox

lightbox.addEventListener('click', function(event){
    if(event.target === lightboxClose || event.target === lightbox){
        toggleLightbox();
    }
});

// Aside Navbar

const nav = document.querySelector('.nav'),
    navList = nav.querySelectorAll('li'),
    totalNavList = navList.length,
    allSection = document.querySelectorAll('.section'),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function(){
        // remove back section class
        removeBackSectionClass();

        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector('a').classList.contains('active')) {
                // add back section class
                addBackSectionClass(j);
            }
            navList[j].querySelector('a').classList.remove('active');
        }

        this.classList.add('active');

        showSection(this);

        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }

    });
}

function addBackSectionClass(num) 
{
    allSection[num].classList.add('back-section');
}

function removeBackSectionClass() 
{
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('back-section');
    }
}

function updateNav(element) 
{
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector('a').classList.remove('active');
        const target = element.getAttribute('href').split('#')[1];
        if (target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) {
            navList[i].querySelector('a').classList.add('active');
        }
    }
}

document.querySelector('.hire-me').addEventListener('click', function(){
    const sectionIndex = this.getAttribute('data-section-index');
    addBackSectionClass(sectionIndex);
    showSection(this);
    updateNav(this);
    removeBackSectionClass();
});

function showSection(element) 
{
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('active');
    }

    const target = element.getAttribute('href').split('#')[1];

    document.querySelector('#'+target).classList.add('active');
}

const navTogglerBtn = document.querySelector('.nav-toggler'),
    aside = document.querySelector('.aside');

navTogglerBtn.addEventListener('click', asideSectionTogglerBtn);

function asideSectionTogglerBtn() 
{
    aside.classList.toggle('open');
    navTogglerBtn.classList.toggle('open');
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle('open');
    }
}
// let form = document.getElementById("validationform")
// form.addEventListener('submit', submitForm);

// let invalidname = document.getElementById("invalid-name");
// let invalidemail = document.getElementById("invalid-email");
// let invalidsubject = document.getElementById("invalid-subject");
// let invalidmessage = document.getElementById("invalid-message");

// invalidname.style.display = "none";
// invalidsubject.style.display = "none";
// invalidemail.style.display = "none";
// invalidmessage.style.display = "none";

// let nameregex = /^[A-Za-z ]+$/;
// let emailregex = /^\w+@\w+\.\w+$/;
// let msgregex = /.+/; 

// function submitForm(event) {
//     event.preventDefault();

   
//     let subject = form.subject.value;
//     let message = form.message.value;

//     let valid = true;

   

    

//     if (!msgregex.test(subject)) {
//         invalidsubject.style.display = "block";
//         valid = false;
//     } else {
//         invalidsubject.style.display = "none";
//     }

//     if (!msgregex.test(message)) {
//         invalidmessage.style.display = "block";
//         valid = false;
//     } else {
//         invalidmessage.style.display = "none";
//     }

//     if (!valid) return; // Don't proceed if any field is invalid

//     emailjs.sendForm('service_ut1wajg', 'template_htq4wza', form)
//         .then(() => {
//             alert("Message sent successfully!");
//             form.reset();
//         }, (error) => {
//             alert("Failed to send message: " + JSON.stringify(error));
//         });
// }

// // Initialize EmailJS
// (function(){
//     emailjs.init("w9aIDEEjSBWBBY9zx");
// })()
// let n=document.getElementById("name");
// n.addEventListener("keyup",namefunc)

// function namefunc(){
//      let name = form.name.value.trim();
//       if (!nameregex.test(name)||name == " ") {
//         invalidname.style.display = "block";
    
//     } else {
//         invalidname.style.display = "none";
//     }
// }

// let o=document.getElementById("email");
// o.addEventListener("keyup",emailfunc)
// function emailfunc(){
//     let email = form.email.value;
// if (!emailregex.test(email)) {
//         invalidemail.style.display = "block";
//         valid = false;
//     } else {
//         invalidemail.style.display = "none";
//     }
// }



// code by gorishankar brototype
// document.getElementById("validationform").addEventListener("submit", function (e) {
//   e.preventDefault();
//   let valid = true;

//   // Clear all previous error messages
//   document.querySelectorAll(".error-message").forEach(el => el.remove());

//   // Utility function to show error
//   function showError(inputId, message) {
//     const input = document.getElementById(inputId);
//     const error = document.createElement("div");
//     error.className = "error-message";
//     error.textContent = message;
//     input.closest(".form-item").appendChild(error); // ✅ FIXED
//     valid = false;
//   }

//   // Validate Name
//   const name = document.getElementById("name").value.trim();
//   if (name === "") {
//     showError("name", "Name is required.");
//   }

//   // Validate Email
//   const email = document.getElementById("email").value.trim();
//   const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
//   if (!emailRegex.test(email)) {
//     showError("email", "Enter a valid email address.");
//   }

//   // Validate Subject
//   const subject = document.getElementById("subject").value.trim();
//   if (subject === "") {
//     showError("subject", "Subject is required.");
//   }

//   // Validate Message
//   const message = document.getElementById("message").value.trim();
//   if (message === "") {
//     showError("message", "Message is required.");
//   }

//   // If valid, show success message
//   if (valid) {
//     alert("Form submitted successfully!");
//     document.getElementById("validationform").reset();
//   }
// });   
// end of code by gourishankar


    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email2");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("nameerror");
    const emailError = document.getElementById("emailerror");
    const subjectError = document.getElementById("subjecterror");
    const messageError = document.getElementById("messageerror");


    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const subjectRegex =
    // const messageRegex = 

    function validateName() {
      const name = nameInput.value.trim();
      if (name === "") {
        nameError.innerText = "Name cannot be empty";
        nameInput.classList.add("error");
        nameInput.classList.remove("valid");
        return false;
      } else if (!nameRegex.test(name)) {
        nameError.innerText = "Name must contain only letters and spaces";
        nameInput.classList.add("error");
        nameInput.classList.remove("valid");
        return false;
      } else {
        nameError.innerText = "";
        nameInput.classList.remove("error");
        nameInput.classList.add("valid");
        return true;
      }
    }

    function validateSubject() {
      const subject = subjectInput.value.trim();
      if (subject === "") {
        subjectError.innerText = "Subject cannot be empty";
        subjectInput.classList.add("error");
        subjectInput.classList.remove("valid");
        return false;
      // } else if (!nameRegex.test(name)) {
      //   nameError.innerText = "Name must contain only letters and spaces";
      //   nameInput.classList.add("error");
      //   nameInput.classList.remove("valid");
      //   return false;
      } else {
        subjectError.innerText = "";
        subjectInput.classList.remove("error");
        subjectInput.classList.add("valid");
        return true;
      }
    }

    function validateMessage() {
      const message = messageInput.value.trim();
       
      if (message === "") {
        messageError.innerText = "Message cannot be empty";
        messageInput.classList.add("error");
        messageInput.classList.remove("valid");
        return false;
      // } else if (!nameRegex.test(name)) {
      //   nameError.innerText = "Name must contain only letters and spaces";
      //   nameInput.classList.add("error");
      //   nameInput.classList.remove("valid");
      //   return false;
      } else {
        messageError.innerText = "";
        messageInput.classList.remove("error");
        messageInput.classList.add("valid");
        return true;
      }
    }



    function validateEmail() {
        
      const email = emailInput.value.trim();
      if (!emailRegex.test(email)) {
        emailError.innerText = "Enter a valid email";
        emailInput.classList.add("error");
        emailInput.classList.remove("valid");
        return false;
      } else {
        emailError.innerText = "";
        emailInput.classList.remove("error");
        emailInput.classList.add("valid");
        return true;
      }
    }

    

    nameInput.addEventListener("input", validateName);
    nameInput.addEventListener("blur", validateName);

    emailInput.addEventListener("input", validateEmail);
    emailInput.addEventListener("blur", validateEmail);

    subjectInput.addEventListener("input", validateSubject);
    subjectInput.addEventListener("blur", validateSubject);

    messageInput.addEventListener("input", validateMessage);
    messageInput.addEventListener("blur", validateMessage);

    // document.getElementById("validationform").addEventListener("submit", function (e) {
    //   e.preventDefault();

    //   const isNameValid = validateName();
    //   const isEmailValid = validateEmail();
    //   const isSubjectValid = validateSubject();
    //   const isMessageValid = validateMessage();



//       emailjs.sendForm('service_ut1wajg', 'template_htq4wza', form)
//         .then(() => {
//             alert("Message sent successfully!");
//             form.reset();
//         }, (error) => {
//             alert("Failed to send message: " + JSON.stringify(error));
//         });
// }

 //Initialize EmailJS
 
(function(){
    emailjs.init("w9aIDEEjSBWBBY9zx");
})()
document.getElementById("validationform").addEventListener("submit", function(e) {
      e.preventDefault(); // Prevent page reload

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

// if (isNameValid && isEmailValid && isSubjectValid && isMessageValid
//       ) {
//       emailjs.sendForm("service_ut1wajg", "template_htq4wza", this)
//         .then(function(response) {
//           alert("✅ Message sent successfully!");
//         }, function(error) {
//           alert("❌ Failed to send message. Please try again.");
//           console.error("Error:", error);
//         });
//     });

if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
    emailjs.sendForm("service_ut1wajg", "template_htq4wza", this)
      .then(function(response) {
        alert("✅ Message sent successfully!");
        document.getElementById("validationform").reset(); // clear the form
        // remove valid classes
        document.querySelectorAll("input, textarea").forEach(el => el.classList.remove("valid"));
      }, function(error) {
        alert("❌ Failed to send message. Please try again.");
        console.error("Error:", error);
      });
  } else {
    alert("Please fix the errors before submitting.");
  }
});








//



    //   if (isNameValid && isEmailValid && isSubjectValid && isMessageValid
    //   ) {
    //     alert("Form submitted successfully!");
    //   } else {
    //     alert("Please fix the errors before submitting.");
    //   }
    // });
