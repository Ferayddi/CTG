$(document).ready( function() {
    gsap.registerPlugin(ScrollTrigger);
    setAboutTitleAnimation();
    setContainersAnimations();
});
/*

function tabAnimation() {
    gsap.fromTo('.navbar', {x: "100%"}, {duration: 1.2, x: 0, ease: "circ.out"});
}*/

/*
$(".appRedirectButton").on("click", () => {
    gsap.to('.navbar', {duration: 0.7, x: '-100%', ease: "circ.out", onComplete: () => {window.location.href = '/index/'}} );
});

$(".loginRedirectButton").on("click", () => {
    gsap.to('.navbar', {duration: 0.7, x: '-100%', ease: "circ.out", onComplete: () => {window.location.href = '/signIn/'}} );
});
*/

function setAboutTitleAnimation()  {
    const timeline = gsap.timeline();
    timeline.fromTo(".about-title", {rotation:-2}, {rotation:2, duration: 1.5, ease: 'bounce'})
    .to (".about-title", {rotation:-2, duration: 1.5, ease: 'bounce'})

    timeline.repeat(-1);
}


function setContainersAnimations() {
    //let widthUnit = (window.screen.width)/100;
    //const desiredWidth = widthUnit * 80;

    var numberOfContainers = 3; 


    
    for (var i = 1; i <= numberOfContainers; i++) {
        var classOfContainer = `.aboutContainer${i}`;
        var classOfContent = `.c${i}`;
        var timelineArray = [];


        timelineArray[i] = gsap.timeline({scrollTrigger: {
            trigger: classOfContainer,
            start: "top 40%",
            end: "top 2%",
            toggleActions: "play reverse play reverse"
        },});


    timelineArray[i].to( classOfContainer,
    {
        borderRadius: 8,
        rotation: 0,
        duration: 0.5, 
        ease: 'power1',
        
    })
    .to( classOfContainer,
    {
        minHeight: "500px", 
        duration: 0.5 ,
        ease: 'power1'
    }
    )
    .to(classOfContainer,
    {
        width: "90%",
        duration: 1,
        ease: 'power1'
    }
    ).to(classOfContent, {
        opacity: 0.85,
        duration: 1,
        ease: 'power1',
        stagger: 0.5
    });
}


}





