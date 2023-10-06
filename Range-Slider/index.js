// ------------------ for expense calculation ----------------------//

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
            }

            // for increament
            function handleIncreament(id) {
                const count = document.getElementById(id);
                var currVal = parseFloat(count.textContent.replace('₹' , ''));

                currVal += 1000;

                count.textContent = `₹ ${currVal}`;
            }


            // for general calculations
            let input = document.getElementById('inputBox');
            let buttons = document.querySelectorAll('.btn');
            let string = "";
            let arr = Array.from(buttons);
            let isNegative = false;

            arr.forEach(button => {
                button.addEventListener('click', (e) => {
                    if(e.target.innerHTML === '=') {
                        string = string.replace(/x/g, '*').replace(/÷/g, '/');
                        string = eval(string);
                    } else if(e.target.innerHTML === 'AC') {
                        string = "";
                    } else if (e.target.innerHTML === '+/-') {
                        if (string !== "") {
                            string = parseFloat(string) * -1;
                            isNegative = !isNegative;
                        }
                    } else {
                        string += e.target.innerHTML;
                    }
                    
                    input.value = string;
                })
            })
    

                

            // for handliing the toogle button and opening and closing of calculator
            const genCal = document.getElementById('cal-gen');
            const expCal = document.getElementById('cal-exp');
            const gen = document.getElementById('gen');
            const exp = document.getElementById('exp');
            const cal = document.getElementById('cal');

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