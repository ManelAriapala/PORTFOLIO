const header = document.getElementById("header");
const toggle = document.getElementById("toggle");
const navbar = document.getElementById("navbar");

document.onclick = function(e) {
    if (e.target.id !== "header" && e.target.id !== "toggle" && e.target.id !== "navbar") {
        toggle.classList.remove("active");
        navbar.classList.remove("active");
    }

    toggle.onclick = function() {
        toggle.classList.toggle("active");
        navbar.classList.toggle("active");
    }
}

//Home section

window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleWindowResize);

const spanSlow = document.querySelectorAll(".spanSlow");
const spanFast = document.querySelectorAll(".spanFast");

let width = window.innerWidth;

function handleMouseMove(e) {
    let normalizePosition = e.pageX / (width / 2) - 1;
    let speedSlow = 100 * normalizePosition;
    let speedFast = 200 * normalizePosition;
    spanSlow.forEach((span) => {
        span.style.transform = `translate(${speedSlow}px)`;
    });
    spanFast.forEach((span) => {
        span.style.transform = `translate(${speedFast}px)`;
    });
}

function handleWindowResize() {
    width = window.innerWidth;
}

const tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);

tl.from(".load-text span", {
    duration: 1.5,
    delay: .5,
    skewX: -10,
    skewY: 10,
    stagger: {
        amount: .4
    },
    y: 50,
    x: -20,
    opacity: 0
});
tl.to(".load-text span", {
    duration: 1.5,
    delay: 2,
    skewX: 10,
    skewY: -10,
    stagger: {
        amount: 0.4
    },
    y: -50,
    x: 20
});
tl.to(".loader", {
    delay: .5,
    duration: 1.5,
    opacity: 0,
}, "-=.3");
tl.to(".loader", {
    zIndex: -1,
    duration: .1
});
tl.fromTo(".logo, .toggle, .one, .two, .three, .four, .five, .six, .seven", {
    y: "100%",
    opacity: 0
}, {
    y: "0%",
    opacity: 1,
    duration: 2,
    stagger: 0.4
});

//AJAX

$(function() {
    $("#contact-form").submit(function(e) {
        e.preventDefault();
        $(".error-message").empty();
        let postdata = $("#contact-form").serialize();

        $.ajax({
            type: "POST",
            url: "php/contact.php",
            data: postdata,
            dataType: "json",
            success: function(result) {
                if (result.isSucces) {
                    $("#contact-form").append("<p class='successMessage'>All set ❤️ Allow me to get back to you within the next 2 working days ❤️ While at it, 💃🏻 let's groove tonight 🕺🏿!</p>")
                    $("#contact-form")[0].reset();
                } else {
                    $("#name + .error-message").html(result.firstnameError);
                    $("email + .error-message").html(result.emailError);
                    $("#message + .error-message").html(result.messageError);
                }
            }
        });
    });
})