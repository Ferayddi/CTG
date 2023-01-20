

/*
$('#logInButton').on("click", function() {
    var username= $("#username").val();
    var password =$("#password").val();
    console.log(`The username is ${username} and the password is ${password}`);
    $.ajax('/signIn/password', {
        method: "POST",
        async: false,
        username: username,
        password: password,
        
        success: ( data, textStatus, jqXHR ) => {
            console.log("success");

        },
        error: ( jqXHR ,  textStatus,  errorThrown) => {
            console.log("error");
        }

    })

} );*/