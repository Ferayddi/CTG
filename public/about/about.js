
$(document).ready( function() {
    checkLoggedIn();
});
function setLoggedNav(checked) {
    if (checked) {
        $("#loginNavItem").empty();
        $("#loginNavItem").append("<h5>Logged in </h5>");
    } 
}
function checkLoggedIn() {
    userIsLogged(setLoggedNav);
}



