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

  // For page-level links (e.g. interests.html), mark on load
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href")
    if (!linkHref.startsWith("#") && !linkHref.includes("#")) {
      // Pure page link (no hash): active if it matches the current page
      if (linkHref === currentPage || (currentPage === "" && linkHref === "index.html")) {
        link.classList.add("active")
      }
    }
  })

  // For anchor links on the same page, track which section is in view on scroll
  const anchorLinks = Array.from(navLinks).filter((link) => {
    const href = link.getAttribute("href")
    return href.startsWith("#")
  })

  if (anchorLinks.length > 0) {
    const sectionIds = anchorLinks.map((link) => link.getAttribute("href").slice(1))
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    function updateActiveSection() {
      // Find which section is currently most visible in the viewport
      const scrollY = window.scrollY
      const headerHeight = document.querySelector("header")?.offsetHeight || 100

      let currentId = sectionIds[0]
      sections.forEach((section) => {
        if (scrollY >= section.offsetTop - headerHeight - 10) {
          currentId = section.id
        }
      })

      anchorLinks.forEach((link) => {
        const href = link.getAttribute("href").slice(1)
        link.classList.toggle("active", href === currentId)
      })
    }

    window.addEventListener("scroll", updateActiveSection)
    updateActiveSection()
  }

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
