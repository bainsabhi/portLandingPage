document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Reveal elements on scroll
  const revealElements = document.querySelectorAll("section")

  // Add active class to current nav item
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll("nav ul li a")

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href")

    if (currentPage === "" && linkHref.startsWith("#")) {
      // We're on index.html
      if (linkHref === "#about") {
        link.classList.add("active")
      }
    } else if (linkHref.includes(currentPage)) {
      link.classList.add("active")
    }
  })

  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < triggerBottom) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      } else {
        element.style.opacity = "0"
        element.style.transform = "translateY(20px)"
      }
    })
  }

  // Initial check
  revealElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  })

  window.addEventListener("scroll", checkReveal)
  checkReveal()
})
