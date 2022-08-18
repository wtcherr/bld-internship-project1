serverLink = "https://wtcherr.github.io/bld-internship-project1/db.json";
let loadedCourses;
let renderedCourses;
let carouselSize = 5;
async function loadCourses() {
  link = serverLink;
  loadedCourses = await processRequest(link);
  renderCourses([...loadedCourses["courses"]], carouselSize);
  setupTabs();
}
search_btn = document.getElementById("search-btn");
search_btn.addEventListener("click", () => {
  let search_text = document.getElementsByClassName("input-field")[0].value;
  submitSearch(search_text);
});

function submitSearch(search_text) {
  let courses = [...loadedCourses["courses"]];
  let pattern = new RegExp(search_text, "gi");
  let results = [];
  for (let i = 0; i < courses.length; i++) {
    if (pattern.test(courses[i].title)) {
      results.push(courses[i]);
    }
  }
  if (results.length > 0) renderCourses(results, carouselSize);
}

const processRequest = async (link) => {
  let response = await fetch(link);
  let json = await response.json();
  return json;
};

function renderCourses(coursesJson, slideSize) {
  // takes the courses and clears the old carousel items
  // and creates new ones depending on the number of courses
  renderedCourses = [...coursesJson];
  let courseJson2D = [];
  while (coursesJson.length)
    courseJson2D.push(coursesJson.splice(0, slideSize));

  courses_carousel = document.getElementsByClassName("carousel-inner")[0];

  coursesSlides = [];
  for (let i = 0; i < courseJson2D.length; i++) {
    let active = i == 0 ? true : false;
    console.log(active);
    coursesSlides.push(createCarouselSlide(courseJson2D[i], active));
  }

  if (coursesSlides.length > 0) {
    courses_carousel.innerHTML = "";
    for (let i = 0; i < coursesSlides.length; i++) {
      courses_carousel.appendChild(coursesSlides[i]);
    }
  }
}
function createCarouselSlide(coursesJson, active) {
  carouselSlide = document
    .getElementsByClassName("carousel-item")[0]
    .cloneNode(true);

  cardsWrapper = carouselSlide.getElementsByClassName("cards-wrapper")[0];

  let course_cards = [];
  for (let i = 0; i < coursesJson.length; i++) {
    course_cards.push(createCourseCard(coursesJson[i]));
    console.log(course_cards);
  }

  if (coursesJson.length > 0) {
    cardsWrapper.innerHTML = "";
    for (let i = 0; i < course_cards.length; i++) {
      cardsWrapper.appendChild(course_cards[i]);
    }
  }
  if (!active) carouselSlide.classList.remove("active");
  return carouselSlide;
}
function createCourseCard(course) {
  course_card = document
    .getElementsByClassName("course-card")[0]
    .cloneNode(true);

  course_card.querySelector("img").setAttribute("src", course.img);
  course_card.querySelector("a").setAttribute("href", course.link);
  course_card.querySelector("h4").textContent = course.title;
  course_card.querySelector("h5").textContent = course.instructor;
  course_card.querySelector(".price").textContent = "E£" + course.price;
  updateRating(course_card.querySelector(".rating"), course.rating);
  return course_card;
}
function updateRating(ratingEle, ratingVal) {
  text = ratingEle.querySelector("h4");

  ratingEle.innerHTML = "";
  text.innerText = ratingVal;
  ratingEle.appendChild(text);

  fullStars = Math.floor(ratingVal);
  starEle = document.createElement("i");
  starEle.classList.add("fa-solid");
  for (let i = 0; i < fullStars; i++) {
    fullStar = starEle.cloneNode();
    fullStar.classList.add("fa-star");
    ratingEle.appendChild(fullStar);
  }

  halfStar = Math.ceil(ratingVal - fullStars);
  if (halfStar == 1) {
    hStar = starEle.cloneNode();
    hStar.classList.add("fa-star-half-stroke");
    ratingEle.appendChild(hStar);
  }
}
function setupTabs() {
  const tabs = document.getElementsByClassName("tabs")[0];
  const tabsElements = tabs.getElementsByTagName("li");
  for (let i = 0; i < tabsElements.length; i++) {
    tabsElements[i].addEventListener("click", () => {
      submitSearch(tabsElements[i].innerText);
    });
  }
}
//update the carousel width depending on the size of the screen
window.addEventListener("resize", updateCarouselSize);
function updateCarouselSize() {
  width = window.innerWidth;
  if (width > 950) changeCarousel(5);
  else if (width > 800) changeCarousel(4);
  else if (width > 650) changeCarousel(3);
  else if (width > 450) changeCarousel(2);
  else changeCarousel(1);
}
const changeCarousel = (x) => {
  if (x != carouselSize) {
    carouselSize = x;
    renderCourses([...renderedCourses], carouselSize);
  }
};
