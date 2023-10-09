const rangeInput = document.querySelectorAll(".range-input input");
const progress = document.querySelector(".progress");
const years = document.querySelector('.years-number');
const yearLeft = document.querySelector('.year-left');
const yearRight = document.querySelector('.year-right');

rangeInput.forEach(input => {
    input.addEventListener('input' , () => {
        var minVal = parseInt(rangeInput[0].value)-40;
        var maxVal = parseInt(rangeInput[1].value)-40;

        console.log(minVal , maxVal);
    
        if(minVal > maxVal) {
            progress.style.right = 100 - (minVal / (rangeInput[0].max-40)) * 100 + "%";
            progress.style.left = ((maxVal / (rangeInput[1].max-40)) * 100) + "%";
            yearLeft.textContent = 2063 + maxVal;
            yearRight.textContent = 2125- (62 - minVal);
        } else {
            progress.style.left = (minVal / (rangeInput[0].max-40)) * 100 + "%";
            progress.style.right = 100 - ((maxVal / (rangeInput[1].max-40)) * 100) + "%";
            yearLeft.textContent = 2063 + minVal;
            yearRight.textContent = 2125- (62 - maxVal);
        }
        const yearVar = "Years";
        years.innerHTML = (Math.abs(minVal - maxVal)).toString() + '<span style="font-weight: 600; font-size:12px ; line-height:30px ; margin-left:5px">' + yearVar + '</span>';
    })
})

// tool-tip functionality 
document.addEventListener('DOMContentLoaded', function() {

    var sliders = document.querySelectorAll('.slider');
    var tooltips = document.querySelector('.tooltip-range');
  
    function updateTooltipPosition(slider, tooltip, unitBefore, unitAfter) {
        var sliderValue = slider.value;
        
    
        var tooltipPosition=Math.round(  ((sliderValue - slider.min) / (slider.max - slider.min)) * 100 )
        var adjustedPosition = tooltipPosition ;
        // Update the tooltip's left position
        tooltip.style.left = adjustedPosition + '%';
        //console.log(adjustedPosition>50)
        if(adjustedPosition<=10){
            tooltip.style.transform="translateX(-50%) translateX(16px)"
        }
        else if(adjustedPosition<20){
            tooltip.style.transform="translateX(-50%) translateX(10px)"
        }
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
        }
        else{
        // tooltip.style.transform="translateX(-50%)"
        }
        tooltip.innerHTML = unitBefore + '<span style="font-weight: bold; font-size:14px ; line-height:21px ; margin-left:5px">' + sliderValue + '</span>' + '<span style="font-weight: bold; font-size:14px ; line-height:21px">' + unitAfter + '</span>';
  }
  
   sliders.forEach(function(slider, index) {
    var unitBefore = 'Life Expectancy  ';
    var unitAfter = ' yrs';
    // Initial positioning of the tooltips
    updateTooltipPosition(slider, tooltips, unitBefore, unitAfter);
  
    // Show the tooltip on input (when dragging the slider)
    slider.addEventListener('input', function() {
      updateTooltipPosition(slider, tooltips, unitBefore, unitAfter);
      tooltips.style.display = 'block';
  });
  
    // Show the tooltip on hover
    slider.addEventListener('mouseover', function() {
        tooltips.style.display = 'block';
        console.log(index);
    });
  
    //Hide the tooltip when the user stops interacting with the slider
    slider.addEventListener('mouseup', function() {
        tooltips.style.display = 'none';
    });
  
    // Hide the tooltip when the user stops hovering over the slider
    slider.addEventListener('mouseout', function() {
        tooltips.style.display = 'none';
    });
  });
  
  // Adjust tooltip position on window resize
  window.addEventListener('resize', function() {
    sliders.forEach(function(slider, index) {
        updateTooltipPosition(slider, tooltips);
    });
  });
  });
  
  
  