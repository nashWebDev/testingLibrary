var emailArray=[
    "test@example.com",
    "user123@gmail.com",
    "john.doe@example.org",
    "jane_doe@hotmail.com",
    "info@website.com"
];

var logform =document.getElementById("log")
var log2 = document.getElementById("log2")

    logform.addEventListener("submit",function(event){
        event.preventDefault()

        let studId = document.getElementById("studentId").value;
        let email = document.getElementById("email").value;
        let user = document.getElementById("name").value;

        var bookingSystemLoginVal ={"user":user,"studentID":studId,"email":email}

        localStorage.setItem('loginFormvalsForBookingSystem' , JSON.stringify(bookingSystemLoginVal))

        if (emailArray.includes(email)) {
    
            setTimeout(function() {
                document.body.style.transition = "opacity 2s"; // Add a transition effect
                document.body.style.opacity = 0;
            }, 0); // Set the timeout to 0 to start the transition immediately
            
            setTimeout(function() {
                window.location.href = 'seachpage.htm'; // Navigate to the new page after the transition
            }, 900); // Delay the navigation to allow the fade-out effect to complete
        } else {
            alert("Email is not officially registered by Berea");
        }
        
})  

log2.addEventListener("submit",function(event){
    event.preventDefault()

    let studId = document.getElementById("studentId2").value;
    let email = document.getElementById("email2").value;
    let user = document.getElementById("name2").value;

    var bookingSystemLoginVal ={"user":user,"studentID":studId,"email":email}

    localStorage.setItem('loginFormvalsForBookingSystem' , JSON.stringify(bookingSystemLoginVal))

    if (emailArray.includes(email)) {

      
        setTimeout(function() {
            document.body.style.transition = "opacity 2s"; // Add a transition effect
            document.body.style.opacity = 0;
        }, 0); // Set the timeout to 0 to start the transition immediately
        
        setTimeout(function() {
            window.location.href = 'seachpage.htm'; // Navigate to the new page after the transition
        }, 900); // Delay the navigation to allow the fade-out effect to complete
    } else {
        alert("Email is not officially registered by Berea");
    }
    
})  



//method to prevent use of nav unless logged in

document.addEventListener('DOMContentLoaded', function() {
    var links = document.getElementsByTagName("a");

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            
                e.preventDefault();
                alert("Error: Please log in first.");
            
        });
    }
})



function glow(){
    var logbox = document.getElementById("loginBox")

    logbox.style.boxShadow = " 1px 1px 1px cyan"
}


//footer to appear at bottom
// function getBodyHeight() {
//     let body = document.body, html = document.documentElement;
//     return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
//   }

//   document.getElementById("foot").style.top = (getBodyHeight()/3)+"px";