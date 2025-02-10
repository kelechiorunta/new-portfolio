/**
 * TOASTER FUNCTION
 */

// const createToaster = (text, status) => {
//     // Get the snackbar DIV
//     var toaster = document.getElementById("snackbar");
//     var mySVG = document.getElementById("mySVG");
//     var triangle = document.getElementById("triangle");
//     var path1 = document.getElementById("crossPath1");
//     var path2 = document.getElementById("crossPath2");
//     var length = triangle.getTotalLength();
//     var error_length1 = path1.getTotalLength();
//     var error_length2 = path2.getTotalLength();
//     const paginationBtns = document.querySelectorAll('.pagination button')
//     // Set up stroke-dash properties
//     triangle.style.strokeDasharray = length;
//     triangle.style.strokeDashoffset = length;
    
//     path1.style.strokeDashoffset = error_length1;
//     path2.style.strokeDashoffset = error_length2;
    

//     if (mySVG){
//         // alert("SVG");
//         mySVG.style.setProperty('height', '100px')
//         mySVG.style.setProperty('width', '100px')
//         mySVG.style.setProperty('padding', '1rem')
//         mySVG.style.setProperty('background-color', 'transparent')
//         mySVG.style.setProperty('border', '2px solid white')
//         mySVG.style.setProperty('z-index', '10')
//         mySVG.style.setProperty('margin', 'auto')
//         mySVG.style.setProperty('border-radius', '50%')
//         mySVG.style.setProperty('display', 'flex')
//         mySVG.style.setProperty('align-items', 'center')
//         mySVG.style.setProperty('justify-content', 'center')

//     }
//    // Animation
//    let start;
  
//    const drawLine = (timestamp) => {
//      if (!start) start = timestamp;
 
//      // Calculate progress based on time elapsed
//      const elapsed = timestamp - start;
//      const progress = Math.min(elapsed / 1000, 1); // Animate over 2 seconds (2000ms)
 
//      // Update strokeDashoffset based on progress
//      if (status === 'success') {
//         triangle.style.strokeDashoffset = length * (1 - progress);
//         status='';
//      } else {
//         path1.style.strokeDashoffset = error_length1 * (1 - progress);
//         path2.style.strokeDashoffset = error_length2 * (1 - progress);
//         status='';
//      }
     
 
//      if (progress < 1) {
//        requestAnimationFrame(drawLine);
//      }
//    };
 
//    // Start animation
//    requestAnimationFrame(drawLine);
    
//     // Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
  
//     // Add the "show" class to DIV
//     toaster.classList.add("show");
//     toaster.textContent = text;
//     if (status === 'success') {
//         mySVG.append(triangle)
//         status='';
//     }else{
//         mySVG.append(path1)
//         mySVG.append(path2)
//         status='';
//     }
   
//     toaster.append(mySVG)
  
//     // After 3 seconds, remove the show class from DIV
//     setTimeout(function(){ toaster.classList.remove("show"); 
//         status='';
//         triangle.style.strokeDashoffset = length;
//         path1.style.strokeDashoffset = error_length1;
//         path2.style.strokeDashoffset = error_length2;
//     }, 3000);
//   }

const createToaster = (text, status) => {
    // Get the snackbar container
    var toaster = document.getElementById("snackbar");

    // Remove existing SVG to avoid duplicates
    var existingSVG = document.getElementById("toasterSVG");
    if (existingSVG) {
        existingSVG.remove();
    }

    // Create a new SVG container
    var mySVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    mySVG.setAttribute("id", "toasterSVG");
    mySVG.setAttribute("width", "100");
    mySVG.setAttribute("height", "100");
    mySVG.setAttribute("viewBox", "0 0 50 50");
    mySVG.style.cssText = `
        height: 100px;
        width: 100px;
        padding: 1rem;
        background-color: transparent;
        border: 2px solid white;
        z-index: 10;
        margin: auto;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    let svgPath1, svgPath2;

    if (status === 'success') {
        svgPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        svgPath1.setAttribute("id", "successPath");
        svgPath1.setAttribute("d", "M5 25 L20 40 L45 10");
        svgPath1.setAttribute("stroke", "green");
        svgPath1.setAttribute("stroke-width", "3");
        svgPath1.setAttribute("fill", "none");
        mySVG.appendChild(svgPath1);
    } else {
        svgPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        svgPath1.setAttribute("id", "crossPath1");
        svgPath1.setAttribute("d", "M10 10 L40 40");
        svgPath1.setAttribute("stroke", "red");
        svgPath1.setAttribute("stroke-width", "5");
        svgPath1.setAttribute("fill", "none");
        svgPath1.setAttribute("stroke-linecap", "round");

        svgPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        svgPath2.setAttribute("id", "crossPath2");
        svgPath2.setAttribute("d", "M40 10 L10 40");
        svgPath2.setAttribute("stroke", "red");
        svgPath2.setAttribute("stroke-width", "5");
        svgPath2.setAttribute("fill", "none");
        svgPath2.setAttribute("stroke-linecap", "round");

        mySVG.appendChild(svgPath1);
        mySVG.appendChild(svgPath2);
    }

    // Append the SVG to the toaster
    toaster.innerHTML = ""; // Clear previous content
    toaster.appendChild(mySVG);
    toaster.appendChild(document.createTextNode(text));

    // Get path lengths for animation
    const length1 = svgPath1.getTotalLength();
    const length2 = svgPath2 ? svgPath2.getTotalLength() : 0;

    // Set initial stroke-dash properties
    svgPath1.style.strokeDasharray = length1;
    svgPath1.style.strokeDashoffset = length1;
    if (svgPath2) {
        svgPath2.style.strokeDasharray = length2;
        svgPath2.style.strokeDashoffset = length2;
    }

    // Animation function
    let start;
    const drawLine = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / 500, 1);

        svgPath1.style.strokeDashoffset = length1 * (1 - progress);
        if (svgPath2) {
            svgPath2.style.strokeDashoffset = length2 * (1 - progress);
        }

        if (progress < 1) {
            requestAnimationFrame(drawLine);
        }
    };

    requestAnimationFrame(drawLine);

    // Show toaster
    toaster.classList.add("show");

    // Hide toaster after 3 seconds
    setTimeout(() => {
        toaster.classList.remove("show");
    }, 3000);
};

// Example usage
// createToaster("Operation Successful!", "success");
// createToaster("Something went wrong!", "error");


  ///////////////////////////////////////////////
  export { createToaster }