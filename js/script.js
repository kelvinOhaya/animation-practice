const navButton = document.getElementById("navButton");
const navbar = document.getElementsByClassName("navbar")[0];
const linkContainer = document.getElementsByClassName("link-container");
let navbarIsAlreadyOpen = navbar.classList.contains("open");
let animationIsRunning = false;

function playNavbarAnimation(animationName) {
  // Remove any ongoing animation styles to prevent race conditions
  // Ex: Someone clicks navButton really fast
  if (animationIsRunning === true) return;
  animationIsRunning = true;
  navButton.disabled = true;

  navbar.classList.remove("nav-open-anim", "nav-close-anim");
  void navbar.offsetWidth;
  navbar.classList.add(animationName);

  //listens for when the animation ends
  const handleAnimationEnd = () => {
    navbar.removeEventListener("animationend", handleAnimationEnd);
    animationIsRunning = false;
    navbar.classList.toggle("open");
    navbar.classList.remove(animationName); //remove temp animation class
  };

  //call the animationend event listener
  navbar.addEventListener("animationend", handleAnimationEnd);
  navbarIsAlreadyOpen = !navbarIsAlreadyOpen; //update the state variable
  console.log(navbarIsAlreadyOpen);
  navButton.disabled = false;
}

navButton.addEventListener("click", () =>
  playNavbarAnimation(navbarIsAlreadyOpen ? "nav-close-anim" : "nav-open-anim")
);
