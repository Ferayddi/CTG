

$(document).ready( function() {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => tabAnimation(), 10);
    setTimeout(() => myAnimation(), 10);
});

function myAnimation () {
    gsap.to('.textCTG',  {
        scrollTrigger: {
            trigger:".textCTG",
            toggleActions: "play reset restart reset",
            start: "top 50%"

        },
        duration: 0.5, ease: 'circ', opacity: 1,stagger: 0.5
    } );
}

function tabAnimation() {
    gsap.fromTo('.navbar', {x: "100%"}, {duration: 1.2, x: 0, ease: "circ.out"});
}

$(".loginRedirectButton").on("click", () => {
    gsap.to('.navbar', {duration: 0.7, x: '-100%', ease: "circ.out", onComplete: () => {window.location.href = '/signIn/'}} );
})

$(".aboutRedirectButton").on("click", () => {
    gsap.to('.navbar', {duration: 0.7, x: '-100%', ease: "circ.out", onComplete: () => {window.location.href = '/about/'}} );
})