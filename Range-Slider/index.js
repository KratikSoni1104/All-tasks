const rangeInput = document.querySelectorAll(".range-input input");
const progress = document.querySelector(".progress");
const years = document.querySelector('.years-number');

rangeInput.forEach(input => {
    input.addEventListener('input' , () => {
        var minVal = parseInt(rangeInput[0].value)-40;
        var maxVal = parseInt(rangeInput[1].value)-40;

        console.log(minVal , maxVal);
    
        if(minVal > maxVal) {
            progress.style.right = 100 - (minVal / (rangeInput[0].max-40)) * 100 + "%";
            progress.style.left = ((maxVal / (rangeInput[1].max-40)) * 100) + "%";
        } else {
            progress.style.left = (minVal / (rangeInput[0].max-40)) * 100 + "%";
            progress.style.right = 100 - ((maxVal / (rangeInput[1].max-40)) * 100) + "%";
        }
       
        years.textContent = Math.abs(minVal - maxVal);
    })
})