search_btn = document.getElementById("search-btn");
search_btn.addEventListener("click", (event) => {
  submitSearch();
});
function loadCourses() {
  link = "http://localhost:3000/courses";
  processRequest(link);
}
function submitSearch() {
  search_text = document.getElementsByClassName("input-field")[0].value;
  let link = "http://localhost:3000/courses?title_like=" + search_text;
  processRequest(link);
}
function processRequest(link) {
  fetch(link)
    .then((response) => response.json())
    .then((json) => renderCourses(json));
}
function renderCourses(coursesJson) {
  courses_carousel = document.getElementsByClassName("courses-carousel")[0];
  let course_cards = [];
  for (let i = 0; i < coursesJson.length; i++) {
    course_cards.push(createCourseCard(coursesJson[i]));
  }
  if (coursesJson.length > 0) {
    courses_carousel.innerHTML = "";
    for (let i = 0; i < course_cards.length; i++) {
      courses_carousel.appendChild(course_cards[i]);
    }
  }
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
  return course_card;
}
