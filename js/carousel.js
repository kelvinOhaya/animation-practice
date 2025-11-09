export default function initCarousel() {
  // Query DOM here (called after DOMContentLoaded). Doing these lookups
  // at module-load time returned empty results because the DOM wasn't parsed yet.
  const slidesArray = Array.from(document.querySelectorAll(".slide"));
  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");

  if (!slidesArray.length) return;

  // let the DOM decide where the currentIndex is rather than the
  let currentIndex = slidesArray.findIndex((slide) =>
    slide.classList.contains("active")
  );
  if (currentIndex < 0) currentIndex = 0;

  // Helper functions to get the left and right elements
  function getLeft() {
    return (currentIndex - 1 + slidesArray.length) % slidesArray.length;
  }

  function getRight() {
    return (currentIndex + 1) % slidesArray.length;
  }

  //helper function for updating the carousel
  //applies classes to whatever the new updated trackers are
  function updateCarousel() {
    const leftIndex = getLeft();
    const rightIndex = getRight();

    //NOTE: do not use .map(), as we want to perform operations on elments, not make a new one
    //remove potential classes, then iteratively re-add them
    slidesArray.forEach((slide, i) => {
      slide.classList.remove("left", "right", "inactive", "active");
      if (i === currentIndex) slide.classList.add("active");
      else if (i === leftIndex) slide.classList.add("left");
      else if (i === rightIndex) slide.classList.add("right");
      else slide.classList.add("inactive");
    });

    console.log(`Left Element: ${leftIndex}`);
    console.log(`Current Element: ${currentIndex}`);
    console.log(`Right Element: ${rightIndex}`);
  }

  function moveLeft() {
    //move currentIndex left with modular arithmetic
    currentIndex = (currentIndex - 1 + slidesArray.length) % slidesArray.length;
    updateCarousel();
  }

  function moveRight() {
    //move currentIndex left with modular arithmetic
    console.log(`Running`);

    currentIndex = (currentIndex + 1) % slidesArray.length;
    updateCarousel();
  }

  //update the carousel on render
  updateCarousel();
  console.log("carousel running");

  //ensure event handler buttons are passed by reference

  rightBtn.addEventListener("click", moveRight);
  leftBtn.addEventListener("click", moveLeft);
}
