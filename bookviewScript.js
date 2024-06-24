document.addEventListener("DOMContentLoaded",function(){
    disUsername();
    disFavourites();

})
//search bar

var booksArray = [
    "To Kill a Mockingbird",
    "1984",
    "The Great Gatsby",
    "The Catcher in the Rye",
    "The Hobbit",
    "Fahrenheit 451",
    "Moby Dick",
    "The Odyssey",
    "Pride and Prejudice",
    "War and Peace",
    "The Lord of the Rings",
    "Jane Eyre",
    "Brave New World",
    "The Divine Comedy",
    "Crime and Punishment",
    "Wuthering Heights",
    "Great Expectations",
    "Anna Karenina",
    "The Adventures of Huckleberry Finn",
    "Don Quixote",
    "  bok  ",
    "The Brothers Karamazov",
    "Les Misérables",
    "Alice's Adventures in Wonderland",    "Frankenstein",
    "Dracula",   "The Iliad",
    "The Aeneid",
    "The Picture of Dorian Gray",
    "A Tale of Two Cities",
    "Catch-22",
    "One Hundred Years of Solitude",
    "The Grapes of Wrath",
    "Slaughterhouse-Five",
    "The Count of Monte Cristo",
    "Heart of Darkness",
    "The Sound and the Fury",
    "Madame Bovary",
    "Lolita",    "Ulysses",
    "In Search of Lost Time",   "Gone with the Wind",   "The Old Man and the Sea",    "The Metamorphosis",
    "The Stranger",
    "Beloved",
    "The Sun Also Rises",
    "The Trial",
    "The Three Musketeers",
    "The Handmaid's Tale",
    "To the Lighthouse",
    "David Copperfield",
    "Invisible Man",
    "Mansfield Park",
    "The Scarlet Letter",
    "Middlemarch",
    "A Portrait of the Artist as a Young Man",
    "A Clockwork Orange",
    "Rebecca",
    "The Secret Garden",
    "Sense and Sensibility",
    "North and South",
    "Bleak House",
    "Oliver Twist",   "Little Women",
    "Treasure Island",
    "Dr. Jekyll and Mr. Hyde",
    "Robinson Crusoe",    "The War of the Worlds",
    "The Time Machine",
    "The Wind in the Willows",    "The Jungle Book",
    "The Call of the Wild",
    "White Fang",   "The Last of the Mohicans",
    "Gulliver's Travels",   "The Canterbury Tales",
    "The Hunchback of Notre-Dame",
    "Vanity Fair",
    "The Age of Innocence",
    "The Importance of Being Earnest",    "The Turn of the Screw",
    "Lady Chatterley's Lover",   "Persuasion",
    "Emma",
    "Sense and Sensibility",   "Northanger Abbey",
    "The Jungle",
    "The Trial",    "A Room with a View",
    "The Bell Jar",
    "The Prime of Miss Jean Brodie",    "The Remains of the Day",
    "Memoirs of a Geisha",
    "Life of Pi",   "The Road",
    "The Book Thief",    "The Kite Runner",
    "The Girl with the Dragon Tattoo",    "The Da Vinci Code",
    "The Shining",    "It",
    "Carrie",
    "The Stand",    "The Green Mile",
    "Misery",
    "The Dark Tower", "Under the Dome" ,"Introduction to Algorithms", "Artificial Intelligence: A Modern Approach", "Computer Networks",
    "Digital Design and Computer Architecture", "Operating System Concepts", "Database System Concepts",
    "The C Programming Language", "Clean Code: A Handbook of Agile Software Craftsmanship", "Java: The Complete Reference",
    "Python Programming: An Introduction to Computer Science", "Discrete Mathematics and Its Applications",
    "The Art of Electronics", "Engineering Mechanics: Dynamics", "Fundamentals of Thermodynamics", "Electric Circuits",
    "Principles of Communication Systems", "Mechanics of Materials", "Control Systems Engineering", "Signals and Systems",
    "Artificial Neural Networks", "Introduction to Linear Algebra", "Data Structures and Algorithms in Java",
    "Computer Organization and Design", "Modern Control Engineering", "Information Security: Principles and Practice",
    "Principles of Electromagnetics", "Advanced Engineering Mathematics", "Embedded Systems: Introduction to ARM Cortex-M Microcontrollers",
    "Software Engineering: A Practitioner's Approach", "Microelectronic Circuits"
];

document.addEventListener("DOMContentLoaded",function(){
    for (var i = 0; i < 25; i++) {
        txtValue = booksArray[i];
        listArray(txtValue)
    }

})

function listArray(txtValue) {
    var catalogueBox = document.getElementById("catalogue");

    var fdiv = document.createElement("div");
    var div = document.createElement("div");
    var a = document.createElement("a");
    a.href = "reading.htm";
    a.textContent = txtValue;

    fdiv.classList.add("bookbox");
    div.classList.add("imgContainer");

    div.appendChild(a);
    fdiv.appendChild(div);
    catalogueBox.appendChild(fdiv);

    // Add event listener to store title in localStorage when link is clicked
    a.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default link behavior (optional)
        var title = this.textContent; // Get text content of clicked link
        var obje = { "title": title };
        localStorage.setItem("title", JSON.stringify(obje));
        console.log("Stored title in localStorage: " + title);
        window.location='reading.htm'
    });
}

function search() {
    var input, filter, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    var maxResults = 25;
    var resultsCount = 0;

    var catalogueBox = document.getElementById("catalogue");
    catalogueBox.innerHTML = ""; // Clear previous results

    for (i = 0; i < booksArray.length; i++) {
        if (resultsCount >= maxResults) {
            break;
        }
        txtValue = booksArray[i];
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            listArray(txtValue); // Pass txtValue to listArray function
            resultsCount++;
        }
    }

    // Display message if no results found
    var messageElement = document.getElementById("re");
    if (resultsCount === 0) {
        messageElement.textContent = "No results found";
    } else {
        messageElement.textContent = ""; // Clear message if results are found
    }
}


function disUsername(){
var username = JSON.parse(localStorage.getItem("name"))
console.log(username.name)
var user = document.getElementById("user")
user.innerHTML= username.name;
}



            //favourites
function disFavourites(){
var favorite = JSON.parse(localStorage.getItem("fav"))
console.log(favorite.fav)
var viewFav = document.getElementById("ViewableFav")
viewFav.innerHTML= favorite.fav

//add to fav

var arrayOfFavorites = [];
arrayOfFavorites.push(favorite.fav)

localStorage.setItem("listOfFavorites", JSON.stringify(arrayOfFavorites))

var favlist = JSON.parse(localStorage.getItem(listOfFavorites))

for(i in favlist){
    
}

console.log(favlist[i])


}


// function addtofavorites(){
// let p=document.createElement("p")
// p.innerHTML=favorite.fav
// viewFav.appendChild(p)

// }




//somehow find a permanet storage way for saved and favorites
//use a nodejs to do this when you get serverside credentials
// var permasave = JSON.parse(localStorage.getItem("permasaved")) || [];

// // Retrieve the saved book from localStorage
// var save = JSON.parse(localStorage.getItem("saved"));
// var newbook = save ? save.saved : null;

// console.log(newbook);

// // Function to save a new book
// function antikaSave(newbook) {
//     if (!hasDuplicates(permasave, newbook)) {
//         permasave.push(newbook); // Add newbook to permasave array
//         localStorage.setItem("permasaved", JSON.stringify(permasave)); // Store permasave in localStorage
//         console.log(permasave);
//         console.log(newbook);
//         showSaved(); // Calls showSaved to update the UI
//     } else {
//         alert("Book already saved");
//     }
// }

// // Function to check for duplicates
// function hasDuplicates() {
//     var permasave = JSON.parse(localStorage.getItem("permasaved")) || [];
    
// }

// // Function to display saved books
// function showSaved() {
//     var permaSavedBooks = JSON.parse(localStorage.getItem("permasaved")) || []; // Retrieve permasave from localStorage

//     // Clear existing content before appending new content
//     var savedBooksElement = document.getElementById("savedbooks");
//     savedBooksElement.innerHTML = ''; // Clear existing content

//     if (permaSavedBooks.length > 0) {
//         // Iterate through permaSavedBooks and append each book to the DOM
//         permaSavedBooks.forEach(function(book) {
//             var pElement = document.createElement("p");
//             pElement.textContent = book; // Assuming book is a string, adjust as per your structure
//             savedBooksElement.appendChild(pElement); // Append the <p> element to savedBooksElement
//         });
//     } else {
//         savedBooksElement.textContent = "No saved books."; // Display message if no books are saved
//     }
// }

// // Example usage:
// // Assuming you have a book object stored in localStorage as "saved"
// if (newbook) {
//     antikaSave(newbook); // Save the new book and update the UI
// }


//navbar
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    let input = document.getElementById("myInput");
    input.disabled = true
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("main").style.opacity="0.5"
    document.getElementById("main2").style.marginLeft = "250px";
    document.getElementById("main2").style.opacity="0.5"
    document.getElementById("openbtn").style.display = " none"
   
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  function closeNav() {
    let input = document.getElementById("myInput");
    input.disabled = false
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("main").style.opacity="1"
    document.getElementById("main2").style.marginLeft = "0";
    document.getElementById("main2").style.opacity="1"
    document.getElementById("openbtn").style.display = " block"
  }
//footer to appear at bottom
function getBodyHeight() {
    let body = document.body, html = document.documentElement;
    return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  }

  document.getElementById("main2").style.top = (getBodyHeight()/5)+"px";