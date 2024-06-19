 var heading = JSON.parse(localStorage.getItem("title"))
console.log("title:"+heading.title)
 
 document.getElementById("title").innerHTML =heading.title;
 
 //pdf viewer
 
// Get access to pdf.js library
var { pdfjsLib } = globalThis;

// Set the worker source for pdf.js (must be included)
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

// Initialize variables
var pdfDoc = null,         // PDF document object
    pageNum = 1,           // Current page number
    pageRendering = false, // Flag to indicate if a page is currently being rendered
    pageNumPending = null, // Number of the page rendering is pending
    scale = 2,             // Initial scale of the PDF
    canvas = document.getElementById('the-canvas'), // Canvas element to render PDF
    ctx = canvas.getContext('2d'); // 2D rendering context of the canvas

/**
 * Render a specific page of the PDF.
 * @param {number} num - Page number to render.
 */
function renderPage(num) {
  pageRendering = true;
  // Fetch the specified page from the PDF document
  pdfDoc.getPage(num).then(function(page) {
    // Get the viewport of the page at the specified scale
    var viewport = page.getViewport({ scale: scale });
    // Set the canvas dimensions to match the viewport
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Prepare the rendering context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    // Render the PDF page into the canvas
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      // If there is a pending page number, render it now
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update the page number displayed
  document.getElementById('page_num').textContent = num;
}

/**
 * Queue the rendering of a page.
 * @param {number} num - Page number to render.
 */
function queueRenderPage(num) {
  // If a page is currently being rendered, mark the page number as pending
  if (pageRendering) {
    pageNumPending = num;
  } else {
    // Otherwise, render the page immediately
    renderPage(num);
  }
}

/**
 * Display the previous page of the PDF.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return; // Exit if already on the first page
  }
  pageNum--; // Decrement the page number
  queueRenderPage(pageNum); // Render the previous page
}

/**
 * Display the next page of the PDF.
 */
function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return; // Exit if already on the last page
  }
  pageNum++; // Increment the page number
  queueRenderPage(pageNum); // Render the next page
}

/**
 * Go to a specific page of the PDF.
 */
function goToPage() {
  var input = document.getElementById('page_num_input').value;
  var pageNumber = parseInt(input);

  if (pageNumber >= 1 && pageNumber <= pdfDoc.numPages) {
    pageNum = pageNumber;
    queueRenderPage(pageNum);
  } else {
    alert(`Please enter a page number between 1 and ${pdfDoc.numPages}`);
  }
}

/**
 * Load the PDF document asynchronously.
 */
var url = 'img/E-Library (3).pdf';  // Replace with your PDF file URL
pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
  // Once the PDF is loaded, store the document object
  pdfDoc = pdfDoc_;
  // Display the total number of pages in the document
  document.getElementById('page_count').textContent = pdfDoc.numPages;

  // Initial rendering of the first page
  renderPage(pageNum);
});

function handleVolumeButtonPress(event) {
  if (event.key === "VolumeUp") {
    event.preventDefault(); // Prevent default volume change behavior
    alert(`Volume button pressed: ${event.key}`);
    // Add any other functionality you want to trigger here
      onNextPage()
  }else if(event.key === "VolumeDown"){
      onPrevPage()
  }
}



 //favourites
 function favour(){
    let favbook = heading.title
    var favObj ={"fav":favbook}

    localStorage.setItem( "fav",JSON.stringify(favObj))
    console.log(favObj)
    // alert("book added to favorites")

  disPopUP()

  setTimeout(popDisapear,2000)
  
 }



//save books

function saveBooks(){
  let savebook = heading.title
  var saveObj ={"saved":savebook}

  localStorage.setItem( "saved",JSON.stringify(saveObj))
  console.log(saveObj)
  //alert("saved")

  disSaved()
  setTimeout(popDisapear,2000)
    
  }

function disSaved(){
  let  popUP = document.getElementById("favPopUp");
  popUP.innerHTML= heading.title +"<h2>has been saved</h2>"
    popUP.style.display="block"
}

 function disPopUP(){
    let  popUP = document.getElementById("favPopUp");
    popUP.innerHTML= heading.title +"<h2>has been added to favourites</h2>"
    popUP.style.display="block"

 }

 function popDisapear(){
    let  popUP = document.getElementById("favPopUp");
    popUP.style.display="none"
 }




 var bookbtn=document.getElementById("backToFav");
 bookbtn.style.border ="1px solid black";
 bookbtn.style.backgroundColor = "grey"
 bookbtn.style.padding = "10px"
 bookbtn.style.cursor ="default"
 bookbtn.addEventListener("click",function(event){

    window.location="bookViewing.htm"
 })

//dark mode and light mode

var flip = true;

var modswitch = document.getElementById("modeswitch")

modswitch.addEventListener("click", function(){
  let mode = document.getElementById("mode")
  let body = document.getElementById("body")
  var paragraphs = document.getElementsByTagName("p");  

  if(flip){
    //light mode
    mode.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUlJREFUSEvVVcENwjAMtDeBTWASyiTAJMAksAlscvSQXUXBTiiCB5WqPhL7zr6zq/LjR3+cX2YBAAAJqerbcW9fZOKvAQA4jkQPqnovW5gBAFiIyGp8r3XMSwWWfBARJl/XAbVmlpyECEBS+/JOBEA2FxHh9yUgACAZAtxVdVmfhxoYq8HZACC7jbFkDlZH8Ktpw7unyJFdkQE4wyi+W2ETwJizXXwOY9ucJUFZEdu4bOnUA2DyULxxJCjmzpyzzgZ2AnALloPU8319HuXoAdyyNpgReD65pwkQlQjgey1KANh/F3nrk1r0n2EcxqddP7WpixnFbzP/++XWoK082OxKx9CWfGnXczFoJHGK7JqtinS3BKvCKwx3VwTQ3C3JsvPdxSqo1fRkLdrXW7H1PzDL7urkz5nK1E9c9Sd/tDlV9e7OalEvWXT+AAyDwxnqMtZlAAAAAElFTkSuQmCC"
    body.style.backgroundColor = "black"
    mode.style.backgroundColorcolor-"green"

    for (let p of paragraphs) {
      p.style.color = "white"; 
      
    }
    flip= false
    
  }else{
    //darnk mode
    mode.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARJJREFUSEu1ldsRgkAMRS+daCVqJWolaiVqJWolWoocZ3Gyyz4ZyA/DwOQkN69OC1u3sH+VACtJB0l7SespweQAZ0kn5/Qm6Tgn4CFpaxziHEizxTK4Olmss0v/QkbNFgKImuhDmw3w7qWgsKE9Je2aw5e8LqJbkCdmnzm6KKa9hZEBmTSZrUEJQBZAeFabBaT0t86apbKAsPdTUTZlMgUAGMjd1SRWFzrxJ6UF2NVQrbFzZCF043+1WEBqyFpgw78sxlEGfCx1Ug3MG8pwVaAdxY5Nc41z/vHmJbbschNdgoyGMXUPWjNBb1b6qKNyB2e4ZsPRSUWf3bSlk4lTQHQYz42jvDIz4AVSAyjpnv2+OOALFOIwGfh1e/QAAAAASUVORK5CYII="
    body.style.backgroundColor = "white"
    for (let p of paragraphs) {
      p.style.color = "black"; 
      
  
    
    flip=true
    }}

  

})
