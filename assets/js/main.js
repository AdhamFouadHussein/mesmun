function setSuffix(objects) {
  objects.forEach(obj => {
    obj.dataset.suffix = obj.innerHTML.replace(/[0-9.,]/g, '');
  });
}

function GetElementById(elementId) {
  return document.getElementById("stat-number-" + elementId.toString())
}

function getEndValue(obj) {
  return parseFloat(obj.innerHTML.replace(/[\$,+,%]/g, ''));
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = obj.dataset.prefix + Math.floor(progress * (end - start) + start).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + obj.dataset.suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function setSuffixAndPrefix(objects) {
  objects.forEach(obj => {
    let matches = obj.innerHTML.match(/([^\d]*)([\d.,]+)([^\d]*)/);
    obj.dataset.prefix = matches[1];
    obj.dataset.suffix = matches[3];
    obj.innerHTML = matches[2];
  });
}

const ids = [1, 2, 3, 4]; // add other ids here
const objects = ids.map(id => GetElementById(id));
setSuffixAndPrefix(objects);

objects.forEach(obj => {
  animateValue(obj, 0, getEndValue(obj), 2000);
});
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function nav() {
  //navigate to the pricing.html page
  window.location.href = "tickets.html";
}

function book(ticketType) {
  if (!localStorage.getItem('email')) {
    window.location.href = 'register.html?ticketType=' + ticketType;
  } else {
    sendEmailLater(localStorage.getItem('email'), ticketType);
  }
}

function sendEmailLater(email, ticketType) {
  var message = {
    email: email,
    time: new Date().toISOString(),
    ticketType: ticketType
  };

  $.ajax({
    url: "https://formspree.io/f/mvoeknpw",
    method: "POST",
    data: message,
    dataType: "json"
  }).done(function () {
    alert('Please check your inbox and spam folder for your confirmation email.');
  }).fail(function () {
    alert('There was an error in booking your ticket.');
  });
}