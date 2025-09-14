// ----------------RIPPLE EFFECT//

document.querySelectorAll('.btn').forEach(btn => {

  btn.addEventListener('click',(e) =>{

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});


// ----------------RESULT-CONTAINER

let resultDigits = document.querySelector('.result-digits');
let blinkingCursor = document.querySelector('.blinking-cursor');
let buttons = document.querySelectorAll('.btn');
let expression = "";

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value ? btn.dataset.value : btn.textContent.trim();

    if (value === 'AC') {
      expression = "";
      resultDigits.textContent = "";
      resultDigits.classList.remove('blink');
      blinkingCursor.style.display = "inline-block";
    } else if (value.toUpperCase() === 'DEL') {
      expression = expression.slice(0, -1); 
      resultDigits.textContent = expression;
      resultDigits.classList.remove('blink');
      blinkingCursor.style.display = "inline-block";
    } else if (value === '=') {
      try {
        const result = eval(expression);
        resultDigits.textContent = result;
        expression = result.toString(); 
        resultDigits.classList.add('blink');
        blinkingCursor.style.display = "none";
        setTimeout(() => {
          resultDigits.classList.remove('blink');
        }, 1200);
      } catch {
        resultDigits.textContent = "Error";
        expression = "";
        resultDigits.classList.remove('blink');
        blinkingCursor.style.display = "inline-block";
      }
    } else {
      expression += value;
      resultDigits.textContent = expression;
      resultDigits.classList.remove('blink');
      blinkingCursor.style.display = "inline-block";
    }
  });
});




