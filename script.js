const result = document.getElementById('result');
const buttons = document.querySelectorAll('button');
const themeToggle = document.getElementById('themeToggle');
let currentInput = '۰';
let shouldResetInput = false;

// Theme handling
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function toEnglish(str) {
    return str.split('').map(char => {
        const index = persianNumbers.indexOf(char);
        return index !== -1 ? englishNumbers[index] : char;
    }).join('');
}

function toPersian(str) {
    return str.split('').map(char => {
        const index = englishNumbers.indexOf(char);
        return index !== -1 ? persianNumbers[index] : char;
    }).join('');
}

function calculate(expression) {
    try {
        const englishExpression = toEnglish(expression)
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        const result = eval(englishExpression);
        return toPersian(result.toString());
    } catch (error) {
        return 'خطا';
    }
}

buttons.forEach(button => {
    if (button.id === 'themeToggle') return;
    
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'پاک کردن') {
            currentInput = '۰';
            shouldResetInput = false;
        } else if (value === 'محاسبه') {
            currentInput = calculate(currentInput);
            shouldResetInput = true;
        } else {
            if (currentInput === '۰' || currentInput === 'خطا' || shouldResetInput) {
                currentInput = value;
                shouldResetInput = false;
            } else {
                currentInput += value;
            }
        }

        result.textContent = currentInput;
    });
}); 