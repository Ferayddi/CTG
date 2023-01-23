$(document).ready( function() {
    setTimeout(myAnimation,1);
});

function myAnimation() {
    gsap.fromTo('.navbar', {x: "100%"}, {duration: 1.2, x: 0, ease: "circ.out"});
}

$(".appRedirectButton").on("click", () => {
    gsap.to('.navbar', {duration: 0.7, x: '-100%', ease: "circ.out", onComplete: () => {window.location.href = '/index/'}} );
})

$(".aboutRedirectButton").on("click", () => {
    gsap.to('.navbar', {duration: 0.7, x: '-100%', ease: "circ.out", onComplete: () => {window.location.href = '/about/'}} );
});