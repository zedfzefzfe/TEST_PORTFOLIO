// Element selectors
let theme_btn = document.querySelector(".theme") // theme toggle button
let logo = document.querySelectorAll(".logo") // all logo images
let about_img_1 = document.querySelector(".about-img-1") // about image 1
let about_img_2 = document.querySelector(".about-img-2") // about image 2
let side_menu = document.querySelector("nav") // side navigation
let side_menu_btn = document.querySelector(".burger") // burger button
let header = document.querySelector("header") // page header
let header_container = document.querySelector("header div") // header inner container
let nav_ele = document.querySelectorAll("nav a") // nav links
let up_btn = document.querySelector(".to-up") // scroll to top button
let fieldsets = document.querySelectorAll('#about fieldset')
let legends = document.querySelectorAll('#about legend')

// Initialize theme from localStorage
if (theme_btn) {
    if (localStorage.theme == "light") {
        document.body.classList.remove("dark")
        pic_theme()
        theme_btn.classList.remove("fi-rc-moon")
        theme_btn.classList.add("fi-rs-brightness")
    } else {
        document.body.classList.add("dark")
        pic_theme()
        theme_btn.classList.add("fi-rc-moon")
        theme_btn.classList.remove("fi-rs-brightness")
    }
}

// Update images based on theme
function pic_theme() {
    if (!document.body.classList.contains("dark")) {
        logo.forEach(logo => {
            logo.src = "images/logo/logo-alt.webp"
        })
        if (about_img_1) about_img_1.src = "images/about/about-image.svg"
        if (about_img_2) about_img_2.src = "images/about/about-image-2.svg"
    } else {
        logo.forEach(logo => {
            logo.src = "images/logo/logo.webp"
        })
        if (about_img_1) about_img_1.src = "images/about/about-image-dark.svg"
        if (about_img_2) about_img_2.src = "images/about/about-image-2-dark.svg"
    }
}

// scroll to top
if (up_btn) {
    up_btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    })
}

// toggle theme on click and save choice
if (theme_btn) {
    theme_btn.addEventListener("click", () => {
        document.body.classList.toggle("dark")
        theme_btn.classList.toggle("fi-rc-moon")
        theme_btn.classList.toggle("fi-rs-brightness")
        pic_theme()
        if (!document.body.classList.contains("dark")) {
            localStorage.theme = "light"
        } else {
            localStorage.theme = "dark"
        }
    })
}

// open/close side menu (mobile)
if (side_menu_btn) {
    side_menu_btn.addEventListener("click", side_menu_toggle)
}

function side_menu_toggle() {
    if (!side_menu) return
    if (side_menu.classList.contains("max-[992px]:hidden")) {
        side_menu.classList.toggle("max-[992px]:hidden")
        setTimeout(() => {
            side_menu.classList.toggle("max-[992px]:opacity-0")
            side_menu.classList.toggle("max-[992px]:opacity-100")
        }, 150)
    } else {
        side_menu.classList.toggle("max-[992px]:opacity-0")
        side_menu.classList.toggle("max-[992px]:opacity-100")
        setTimeout(() => {
            side_menu.classList.toggle("max-[992px]:hidden")
        }, 150)
    }
}

// header style on scroll
function HeaderEffect() {
    if (!header || !header_container) return
    if (window.pageYOffset > 10) {
        header_container.classList.remove("py-6")
        header_container.classList.add("tb:py-3", "py-4")
        header.classList.add("backdrop-blur-sm", "shadow-md", "dark:bg-header-overlay")
    } else {
        header_container.classList.add("py-6")
        header_container.classList.remove("tb:py-3", "py-4")
        header.classList.remove("backdrop-blur-sm", "shadow-md", "dark:bg-header-overlay")
    }
}

HeaderEffect()
window.addEventListener('scroll', HeaderEffect)

// Scrollspy for nav links
const trackedSections = [...document.querySelectorAll("main[id], section[id]")]
if (trackedSections.length && nav_ele.length) {
    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return
            const id = entry.target.id
            nav_ele.forEach(link => {
                const isCurrent = link.getAttribute("href") === `#${id}`
                link.classList.toggle("active", isCurrent)
            })
        })
    }, { threshold: 0.45 })

    trackedSections.forEach(section => spy.observe(section))

    nav_ele.forEach(ele => {
        ele.addEventListener("click", () => {
            if (window.innerWidth < 992) side_menu_toggle()
        })
    })
}

// Toggle accordion for about section Q&A
legends.forEach(legend => {
    legend.addEventListener('click', () => {
        const fieldset = legend.closest('fieldset')
        fieldset.classList.toggle('open')
        fieldset.classList.toggle('active')

        fieldsets.forEach(fs => {
            if (fs !== fieldset) {
                fs.classList.remove('open')
                fs.classList.remove('active')
            }
        })
    })
})

// Typing effect in hero title
const heroDynamicText = document.querySelector("#hero-dynamic-text")
if (heroDynamicText) {
    const words = ["solutions digitales", "expériences web", "applications mobiles", "plateformes SaaS"]
    let wordIndex = 0
    let charIndex = 0
    let deleting = false

    const typeLoop = () => {
        const currentWord = words[wordIndex]
        heroDynamicText.textContent = deleting
            ? currentWord.slice(0, charIndex--)
            : currentWord.slice(0, charIndex++)

        if (!deleting && charIndex === currentWord.length + 1) {
            deleting = true
            return setTimeout(typeLoop, 1300)
        }

        if (deleting && charIndex < 0) {
            deleting = false
            wordIndex = (wordIndex + 1) % words.length
        }

        setTimeout(typeLoop, deleting ? 45 : 85)
    }

    typeLoop()
}

// Counter animation for insight cards
const counters = document.querySelectorAll("[data-count]")
if (counters.length) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return
            const target = entry.target
            const endValue = Number(target.dataset.count)
            const suffix = target.dataset.suffix || ""
            let current = 0
            const step = Math.max(1, Math.ceil(endValue / 55))

            const tick = () => {
                current = Math.min(endValue, current + step)
                target.textContent = `${current}${suffix}`
                if (current < endValue) requestAnimationFrame(tick)
            }

            tick()
            observer.unobserve(target)
        })
    }, { threshold: 0.5 })

    counters.forEach(counter => counterObserver.observe(counter))
}

// Reveal animation for major cards
const revealTargets = document.querySelectorAll("#services .box, #clients .box, #portfolio .box, #insights .insight-card")
if (revealTargets.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
        })
    }, { threshold: 0.15 })

    revealTargets.forEach((target, index) => {
        target.classList.add("reveal-element")
        target.style.transitionDelay = `${Math.min(index * 60, 240)}ms`
        revealObserver.observe(target)
    })
}
