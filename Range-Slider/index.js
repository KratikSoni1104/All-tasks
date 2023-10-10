document.addEventListener('DOMContentLoaded', () => {
    const rangeInput = document.querySelectorAll(".range-input input");
    const progress = document.querySelector(".progress");
    const years = document.querySelector('.years-number');
    const yearLeft = document.querySelector('.year-left');
    const yearRight = document.querySelector('.year-right');
    
    function updateProgress(minVal, maxVal, input) {
        // Update the progress bar and year labels based on minVal and maxVal
        if (minVal > maxVal) {
            // Handle the case when minVal is greater than maxVal
            progress.style.right = 100 - (minVal / (input.max - 40)) * 100 + "%";
            progress.style.left = ((maxVal / (input.max - 40)) * 100) + "%";
            yearLeft.textContent = 2063 + maxVal;
            yearRight.textContent = 2125 - (62 - minVal);
        } else {
            // Handle the case when minVal is less than or equal to maxVal
            progress.style.left = (minVal / (input.max - 40)) * 100 + "%";
            progress.style.right = 100 - ((maxVal / (input.max - 40)) * 100) + "%";
            yearLeft.textContent = 2063 + minVal;
            yearRight.textContent = 2125 - (62 - maxVal);
        }
        const yearVar = "Years";
        years.innerHTML = (Math.abs(minVal - maxVal)).toString() + '<span style="font-weight: 600; font-size:12px ; line-height:30px ; margin-left:5px">' + yearVar + '</span>';
    }

    let minVal = parseInt(rangeInput[0].value) - 40;
    let maxVal = parseInt(rangeInput[1].value) - 40;

    updateProgress(minVal, maxVal, rangeInput[1]);

    rangeInput.forEach(input => {
        input.addEventListener('input', () => {
            minVal = parseInt(rangeInput[0].value) - 40;
            maxVal = parseInt(rangeInput[1].value) - 40;
            updateProgress(minVal, maxVal, input);
        });
    });


    // tooltips functionality
    const slider1 = rangeInput[0];
    const slider2 = rangeInput[1];
    var tooltipsRight = document.querySelector('#tooltip-range-right');
    var tooltipsLeft = document.querySelector('#tooltip-range-left');
    var sliders = document.querySelectorAll('.slider');

    function updateTooltipPosition(slider, tooltip, unitBefore, unitAfter) {
        var sliderValue = slider.value;
        var tooltipPosition = Math.round(((sliderValue - slider.min) / (slider.max - slider.min)) * 100)
        var adjustedPosition = tooltipPosition;
        
        tooltip.style.left = adjustedPosition + '%';
        if (adjustedPosition <= 10) {
            tooltip.style.transform = "translateX(-50%) translateX(16px)";
        } else if (adjustedPosition < 20) {
            tooltip.style.transform = "translateX(-50%) translateX(10px)";
        }
        // Add other conditions for different positions as needed
        else if(adjustedPosition<40){
            tooltip.style.transform="translateX(-50%)  translateX(10px)"
        }
        else if(adjustedPosition<50){
            tooltip.style.transform="translateX(-50%)  translateX(6px)"
        }
        else if(adjustedPosition==50){
            tooltip.style.transform="translateX(-50%) "
        }
        else if(adjustedPosition<80){
            tooltip.style.transform="translateX(-50%) translateX(-8px)"
        }
        else if(adjustedPosition<100){
            tooltip.style.transform="translateX(-50%) translateX(-14px)"
        } else if(adjustedPosition >= 100) {
            tooltip.style.transform="translateX(-59%)"
        }
        else{
            tooltip.style.transform="translateX(-50%)"
        }
        tooltip.innerHTML = unitBefore + '<span style="font-weight: bold; font-size:14px ; line-height:21px ; margin-left:5px">' + sliderValue + '</span>' + '<span style="font-weight: bold; font-size:14px ; line-height:21px">' + unitAfter + '</span>';
    }

    

    slider1.addEventListener('input', () => {
        console.log("slider 1");
        if (parseInt(slider1.value) < parseInt(slider2.value)) {
            console.log("case 1");
            updateTooltipPosition(slider1, tooltipsLeft, 'Retirement age', 'yrs');
            updateTooltipPosition(slider2, tooltipsRight, 'Life Expectancy', 'yrs');
        } else if(parseInt(slider1.value) > parseInt(slider2.value)) {
            console.log("case 2" , parseInt(slider1.value) , parseInt(slider2.value));
            updateTooltipPosition(slider1, tooltipsLeft, 'Life Expectancy', 'yrs');
            updateTooltipPosition(slider2, tooltipsRight, 'Retirement age', 'yrs');
        }
        tooltipsLeft.style.display = 'block';
        tooltipsRight.style.display = 'block';
    });
    
    slider2.addEventListener('input', () => {
        console.log("slider 2" , parseInt(slider1.value) , parseInt(slider2.value) , typeof parseInt(slider1.value));
        if (parseInt(slider1.value) < parseInt(slider2.value)) {
            console.log("case 3");
            updateTooltipPosition(slider2, tooltipsRight, 'Life Expectancy', 'yrs');
            updateTooltipPosition(slider1, tooltipsLeft, 'Retirement age', 'yrs');
        } else if(parseInt(slider1.value) > parseInt(slider2.value)) {
            console.log("case 4");
            updateTooltipPosition(slider2, tooltipsRight, 'Retirement age', 'yrs');
            updateTooltipPosition(slider1, tooltipsLeft, 'Life Expectancy', 'yrs');
        }
        tooltipsLeft.style.display = 'block';
        tooltipsRight.style.display = 'block';
    });

    
    if(parseInt(slider1.value) < parseInt(slider2.value)) {
        updateTooltipPosition(slider1 , tooltipsLeft , 'Retirement age', 'yrs');
        updateTooltipPosition(slider2 , tooltipsRight , 'Life Expectancy', 'yrs');
    } else {
        updateTooltipPosition(slider1 , tooltipsLeft , 'Life Expectancy', 'yrs');
        updateTooltipPosition(slider2 , tooltipsRight , 'Retirement age', 'yrs');
    }

    sliders.forEach(slider => {
        slider.addEventListener('mouseover', function() {
            tooltipsRight.style.display = 'block';
            tooltipsLeft.style.display = 'block';
        });
  
        slider.addEventListener('mouseup', function() {
            tooltipsRight.style.display = 'none';
            tooltipsLeft.style.display = 'none';
        });
  
        slider.addEventListener('mouseout', function() {
            tooltipsRight.style.display = 'none';
            tooltipsLeft.style.display = 'none';
        });
    });

    window.addEventListener('resize', function() {
        if(parseInt(slider1.value) < parseInt(slider2.value)) {
            console.log(parseInt(slider1.value) , parseInt(slider2.value));
            updateTooltipPosition(slider1 , tooltipsLeft , 'Life Expectancy', 'yrs');
            updateTooltipPosition(slider2 , tooltipsRight , 'Retirement age', 'yrs');
        } else {
            console.log(parseInt(slider1.value) , parseInt(slider2.value));
            updateTooltipPosition(slider1 , tooltipsLeft , 'Retirement age', 'yrs');
            updateTooltipPosition(slider2 , tooltipsRight , 'Life Expectancy', 'yrs');
        }
    });
});







// document.addEventListener('DOMContentLoaded', function() {

//     var sliders = document.querySelectorAll('.slider');
//     var tooltips = document.querySelector('.tooltip-range');
  
//     function updateTooltipPosition(slider, tooltip, unitBefore, unitAfter) {
//         var sliderValue = slider.value;
        
    
//         var tooltipPosition=Math.round(  ((sliderValue - slider.min) / (slider.max - slider.min)) * 100 )
//         var adjustedPosition = tooltipPosition ;
//         // Update the tooltip's left position
//         tooltip.style.left = adjustedPosition + '%';
//         //console.log(adjustedPosition>50)
//         if(adjustedPosition<=10){
//             tooltip.style.transform="translateX(-50%) translateX(16px)"
//         }
//         else if(adjustedPosition<20){
//             tooltip.style.transform="translateX(-50%) translateX(10px)"
//         }
//         else if(adjustedPosition<40){
//             tooltip.style.transform="translateX(-50%)  translateX(10px)"
//         }
//         else if(adjustedPosition<50){
//             tooltip.style.transform="translateX(-50%)  translateX(6px)"
//         }
//         else if(adjustedPosition==50){
//             tooltip.style.transform="translateX(-50%) "
//         }
//         else if(adjustedPosition<80){
//             tooltip.style.transform="translateX(-50%) translateX(-8px)"
//         }
//         else if(adjustedPosition<100){
//             tooltip.style.transform="translateX(-50%) translateX(-14px)"
//         }
//         else{
//         // tooltip.style.transform="translateX(-50%)"
//         }
//         tooltip.innerHTML = unitBefore + '<span style="font-weight: bold; font-size:14px ; line-height:21px ; margin-left:5px">' + sliderValue + '</span>' + '<span style="font-weight: bold; font-size:14px ; line-height:21px">' + unitAfter + '</span>';
//   }
  
//    sliders.forEach(function(slider, index) {
//     var unitBefore = 'Life Expectancy  ';
//     var unitAfter = ' yrs';
//     // Initial positioning of the tooltips
//     updateTooltipPosition(slider, tooltips, unitBefore, unitAfter);
  
//     // Show the tooltip on input (when dragging the slider)
//     slider.addEventListener('input', function() {
//       updateTooltipPosition(slider, tooltips, unitBefore, unitAfter);
//       tooltips.style.display = 'block';
//   });
  
//     // Show the tooltip on hover
//     slider.addEventListener('mouseover', function() {
//         tooltips.style.display = 'block';
//         console.log(index);
//     });
  
//     //Hide the tooltip when the user stops interacting with the slider
//     slider.addEventListener('mouseup', function() {
//         tooltips.style.display = 'none';
//     });
  
//     // Hide the tooltip when the user stops hovering over the slider
//     slider.addEventListener('mouseout', function() {
//         tooltips.style.display = 'none';
//     });
//   });
  
//   // Adjust tooltip position on window resize
//   window.addEventListener('resize', function() {
//     sliders.forEach(function(slider, index) {
//         updateTooltipPosition(slider, tooltips);
//     });
//   });
//   });

// ...

// document.addEventListener('DOMContentLoaded', function() {
//     var sliders = document.querySelectorAll('.slider');
//     var tooltipsRight = document.querySelector('#tooltip-range-min');
//     var tooltipsLeft = document.querySelector('#tooltip-range-max');
  
//     function updateTooltipPosition(slider, tooltip, unitBefore, unitAfter) {
//         var sliderValue = slider.value;
//         var tooltipPosition = Math.round(((sliderValue - slider.min) / (slider.max - slider.min)) * 100)
//         var adjustedPosition = tooltipPosition;
        
//         tooltip.style.left = adjustedPosition + '%';
//         if (adjustedPosition <= 10) {
//             tooltip.style.transform = "translateX(-50%) translateX(16px)";
//         } else if (adjustedPosition < 20) {
//             tooltip.style.transform = "translateX(-50%) translateX(10px)";
//         }
//         // Add other conditions for different positions as needed
//         else if(adjustedPosition<40){
//             tooltip.style.transform="translateX(-50%)  translateX(10px)"
//         }
//         else if(adjustedPosition<50){
//             tooltip.style.transform="translateX(-50%)  translateX(6px)"
//         }
//         else if(adjustedPosition==50){
//             tooltip.style.transform="translateX(-50%) "
//         }
//         else if(adjustedPosition<80){
//             tooltip.style.transform="translateX(-50%) translateX(-8px)"
//         }
//         else if(adjustedPosition<100){
//             tooltip.style.transform="translateX(-50%) translateX(-14px)"
//         }
//         else{
//             tooltip.style.transform="translateX(-50%)"
//         }
        
//         tooltip.innerHTML = unitBefore + '<span style="font-weight: bold; font-size:14px ; line-height:21px ; margin-left:5px">' + sliderValue + '</span>' + '<span style="font-weight: bold; font-size:14px ; line-height:21px">' + unitAfter + '</span>';
//     }
  
//     sliders.forEach(function(slider, index) {
//         var unitBefore = 'Life Expectancy  ';
//         var unitAfter = ' yrs';
        
//         if (index === 0) {
//             // For the first input (range-min)
//             updateTooltipPosition(slider, tooltipsRight, unitBefore, unitAfter);
//         } else if (index === 1) {
//             // For the second input (range-max)
//             updateTooltipPosition(slider, tooltipsLeft, unitBefore, unitAfter);
//         }
  
//         slider.addEventListener('input', function() {
//             if (index === 0) {
//                 // For the first input (range-min)
//                 updateTooltipPosition(slider, tooltipsRight, unitBefore, unitAfter);
//             } else if (index === 1) {
//                 // For the second input (range-max)
//                 updateTooltipPosition(slider, tooltipsLeft, unitBefore, unitAfter);
//             }
//             tooltipsRight.style.display = 'block';
//             tooltipsLeft.style.display = 'block';
//         });
  
//         slider.addEventListener('mouseover', function() {
//             if (index === 0) {
//                 tooltipsRight.style.display = 'block';
//             } else if (index === 1) {
//                 tooltipsLeft.style.display = 'block';
//             }
//         });
  
//         slider.addEventListener('mouseup', function() {
//             if (index === 0) {
//                 tooltipsRight.style.display = 'none';
//             } else if (index === 1) {
//                 tooltipsLeft.style.display = 'none';
//             }
//         });
  
//         slider.addEventListener('mouseout', function() {
//             if (index === 0) {
//                 tooltipsRight.style.display = 'none';
//             } else if (index === 1) {
//                 tooltipsLeft.style.display = 'none';
//             }
//         });
//     });
  
//     window.addEventListener('resize', function() {
//         sliders.forEach(function(slider, index) {
//             if (index === 0) {
//                 // For the first input (range-min)
//                 updateTooltipPosition(slider, tooltipsRight);
//             } else if (index === 1) {
//                 // For the second input (range-max)
//                 updateTooltipPosition(slider, tooltipsLeft);
//             }
//         });
//     });
// });

  
  
  