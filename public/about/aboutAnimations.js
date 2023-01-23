$(document).ready( function() {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(tabAnimation,100);
    setAboutTitleAnimation();
    setContainersAnimations();
});

function tabAnimation() {
    gsap.fromTo('.navbar', {x: "100%"}, {duration: 1.2, x: 0, ease: "circ.out"});
}

$(".appRedirectButton").on("click", () => {
    gsap.to('.navbar', {duration: 0.7, x: '-100%', ease: "circ.out", onComplete: () => {window.location.href = '/index/'}} );
});

$(".loginRedirectButton").on("click", () => {
    gsap.to('.navbar', {duration: 0.7, x: '-100%', ease: "circ.out", onComplete: () => {window.location.href = '/signIn/'}} );
});

function setAboutTitleAnimation()  {
    const timeline = gsap.timeline();
    timeline.fromTo(".about-title", {rotation:-2}, {rotation:2, duration: 1.5, ease: 'bounce'})
    .to (".about-title", {rotation:-2, duration: 1.5, ease: 'bounce'})

    timeline.repeat(-1);
}


function setContainersAnimations() {
    let widthUnit = (window.screen.width)/100;
    const desiredWidth = widthUnit * 50;

    const timeline1 = gsap.timeline({scrollTrigger: {
        trigger: '.aboutContainer1',
        start: "top 60%",
        markers: true
    },});


    timeline1.to( '.aboutContainer1',
    {
        borderRadius: 8,
        rotation: 0,
        duration: 0.5, 
        ease: 'power1',
        
    })
    .to( '.aboutContainer1',
    {
        height: "50vh", 
        duration: 0.5 ,
        ease: 'power1'
    }
    )
    .to( '.aboutContainer1',
    {
        width: desiredWidth,
        duration: 1,
        ease: 'power1'
    }
    ).to('.container1-title', {
        opacity: 1,
        duration: 1,
        ease: 'power1'
    });
}





