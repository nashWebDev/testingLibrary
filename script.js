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
        alert("please enter a valid email, issued to you from bgc")
    
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

//footer to appear at bottom
function getBodyHeight() {
    let body = document.body, html = document.documentElement;
    return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  }

  document.getElementById("main2").style.top = (getBodyHeight()/5)+"px";

