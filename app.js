serverLink = "https://wtcherr.github.io/bld-internship-project1/db.json";

search_btn = document.getElementById("search-btn");
search_btn.addEventListener("click", (event) => {
  coursesPromise.then((res) => submitSearch(res.courses));
});

function loadCourses() {
  link = serverLink;
  coursesPromise = processRequest(link);
  coursesPromise.then((res) => renderCourses(res.courses));
}

function submitSearch(courses) {
  search_text = document.getElementsByClassName("input-field")[0].value;
  let pattern = new RegExp(search_text, "gi");
  results = [];
  for (let i = 0; i < courses.length; i++) {
    if (pattern.test(courses[i].title)) {
      results.push(courses[i]);
    }
  }
  if (results.length > 0) renderCourses(results);
}

const processRequest = async (link) => {
  let response = await fetch(link);
  let json = await response.json();
  return json;
};

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
