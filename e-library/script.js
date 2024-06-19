var login = document.getElementById("log")
    
    var validEmail = false;

    var emailArray=[
        "test@example.com",
        "user123@gmail.com",
        "john.doe@example.org",
        "jane_doe@hotmail.com",
        "info@website.com"
    ];

login.addEventListener("submit",function(event){
    event.preventDefault();

    var name = document.getElementById("username");
    var email = document.getElementById("email");

    

    if(emailArray.includes(email.value)){
        validEmail = true;
        console.log("logged in")
        var obj = {"name":name.value};


        localStorage.setItem("name",JSON.stringify(obj))       
        window.location.href = "bookViewing.htm"
    }else{
        alert("scammer")
    
    }

})

function addGlow(element) {
    // Add 'glow' class to the focused input
    element.classList.add('glow');
    document.getElementById("borderbox").classList.add("glow")
    
    // Remove 'glow' class after 500ms (0.5 seconds)
    setTimeout(function() {
        element.classList.remove('glow');
        document.getElementById("borderbox").classList.remove("glow")
    }, 900);
}

