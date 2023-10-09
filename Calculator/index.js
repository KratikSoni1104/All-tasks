// ------------------ for expense calculation ----------------------//

const total = document.querySelector('.cost');


function handleTotalExpene() {
    
    const inputs = document.querySelectorAll('.count');

    var t = 0;

    inputs.forEach(input => {
        t += parseInt(input.innerText.replace(/\D/g, ''), 10);
    })

    total.textContent = '₹' + t.toLocaleString();
    const rup = document.querySelector('.total-expense');
    rup.style.fontWeight = '400';
    rup.style.fontSize = '14px';
}      

// for decreament
function handleDecreament(id) {
    const count = document.getElementById(id);
    var currVal = parseFloat(count.textContent.replace('₹' , ''));
    
    if(currVal >= 1000) {
        currVal -= 1000;
    } else {
        currVal = 0;
    }

    count.textContent = `₹ ${currVal}`;
    handleTotalExpene();
}

// for increament
function handleIncreament(id) {
    const count = document.getElementById(id);
    var currVal = parseFloat(count.textContent.replace('₹' , ''));

    currVal += 1000;

    count.textContent = `₹ ${currVal}`;
    handleTotalExpene();
}


// for general calculations
let input = document.getElementById('inputBox');
let input2 = document.getElementById('inputBox2');
let buttons = document.querySelectorAll('.btn');
let string = "";
let arr = Array.from(buttons);
let isNegative = false;
let operator = false;
let finalString = "";
let str = "";

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if(e.target.innerHTML === '=') {
            str = finalString + string;
            str = str.replace(/x/g, '*').replace(/÷/g, '/');
            input2.textContent = "";
            input.textContent = eval(str);
            string = eval(str).toString();
        } else if(e.target.innerHTML === 'AC') {
            string = "0";
            input.textContent = string;
            input2.textContent = "";
        } else if (e.target.innerHTML === '+/-') {
            if (string !== "") {
                string = parseFloat(string) * -1;
                isNegative = !isNegative;
            }
            input.textContent = string;
        } else if(e.target.innerHTML === '+' || e.target.innerHTML === '-' || e.target.innerHTML === 'x' || e.target.innerHTML  === '÷') {
            if (!isOperator(string.charAt(string.length - 1))) {
                string += e.target.innerHTML;
                input2.textContent = string;
                finalString = string;
                string = "";
                input.textContent = string;
            }
        } else {
            if(string === "0") {
                string = "";
            }
            string += e.target.innerHTML;
            input.textContent = string;
        }
    })
})

function isOperator(char) {
    return ['+' , '-' , 'x','÷'].includes(char);
}


    

// for handliing the toogle button and opening and closing of calculator
const genCal = document.getElementById('cal-gen');
const expCal = document.getElementById('cal-exp');
const gen = document.getElementById('gen');
const exp = document.getElementById('exp');
const cal = document.querySelector('.cal');

function handleCalExp() {
    expCal.style.backgroundColor='#F27B1A';
    expCal.style.color='#FFF';
    genCal.style.backgroundColor='#fff';
    genCal.style.color='#F27B1A';
    exp.classList.remove('d-none');
    gen.classList.add('d-none');
}

function handleCalGen() {
    genCal.style.backgroundColor='#F27B1A';
    genCal.style.color='#FFF';
    expCal.style.backgroundColor='#fff';
    expCal.style.color='#F27B1A';
    gen.classList.remove('d-none');
    exp.classList.add('d-none');
}


// for closing and opening of calculator

function closeCal() {
    cal.classList.add('dn' , 'dnone');
}
function openCal(e) {
    cal.classList.remove('dn' , 'dnone');
}