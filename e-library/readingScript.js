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

  if(flip){
    //light mode
    mode.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATxJREFUSEu1lIENwjAMBN1NYBOYBJgEmASYBDaBTYCTYuQmTpyiNlIFSuL/99vxIAuvYWF8mUrwToK647ovJuDZCC4ichaRV2ZhjWAlIpvv98hjvAwA36eLW4ckLxvgxECAqJO94BEQcBcRfosApykQAwHZrvPzWg0AJ1DVoG6XVIIBGORYwuLu1evIniKrQi8+zDAiQDl2sQBTlZCSEZliS94MPzERAeBu8ZJ9x2QTzeAuS6AtyEXdj/o+Py8wIoJnwwbs4dx2T5PAS3FWizwCW+SDeam0L/6z8F/btcCIikyABcsBIHX7Xy+2HhrqNZj/KMZ3PvZvRjki2CvatTYqqrPF8VEzBLyYXR5Bc7Y4BHZ2kQW2hQ8NVaOpmCJa4xoLR+D2QdUeYr4fPby/usgGLU7Qm2lYg8lAtYAP9itIGSh8Q6MAAAAASUVORK5CYII="
    flip= false
    body.style.backgroundColor = "black"
    
  }else{
    //darnk mode
    mode.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARxJREFUSEu1lYsNwjAMRM0msAlsApMAk8AmsAlsAjwplkzsOKnURKoqgXN3/l03MvlsJuPLUoJPETR8bziwAK9GcBORq4i8qxK2CLYisheRe13yKAPAjwX8EJDUGIBzBwJEXWxARMCFx08Nb3chGArEQEC2u5EMiAGci6oGdeeiEiAeyJ8FkLg/5Uo00mRVGE10N8MeAcopV3bok2bi4noE2vCMAHBIwmMJdAQJ1N9fpR8ZgW2uw1iDwApKCSKV1J8+ZIflOo2UKIqZ3mRImW92IDood/ZgA1tTVHuLtYPWokFUe1do1xasq9BkCLjzriiD1FuCOlnvcg1vmZ31IYuZ2TV9ctPU2+Ra8GofnNZYTyfo7Jz/e2mJFhN8AfAuPRnHsrZMAAAAAElFTkSuQmCC"
    flip=true
    body.style.backgroundColor = "white"
  }

  

})
