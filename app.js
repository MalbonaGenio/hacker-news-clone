import RouterHandler from "/router.js"
//detects a change in the # url
window.onhashchange = () => {
  setActiveLink()
}

function setActiveLink() {
  const links = document.querySelectorAll(".header-link")
  links.forEach((link) => {
    //get the atrivute we want from the element
    const linkPath = link.getAttribute("href")
    //gets the current url
    const currentPath = window.location.hash
    if (linkPath === currentPath) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
}

class App {
  constructor() {
    new RouterHandler()
  }
}

new App()
