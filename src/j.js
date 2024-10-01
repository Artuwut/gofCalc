const display = document.getElementById('display');
const customCalc = document.querySelectorAll('fieldset button'); // Select all buttons within fieldsets
const userInput = document.getElementById('user-input');
const addValueBtn = document.getElementById('add-value');
const historyList = document.getElementById('history-list'); // Get the history list element

// Your custom values mapping
const customValues = {
    pul: 0.5,
    um: 0.7,
    mal: 1,
    ist: 1.5,
    gul: 2,
    vex: 3,
    ohm: 4.5,
    lo: 6,
    sur: 10,
    ber: 15,
    jah: 20,
    cham: 30,
    zodd: 100,
    legendär: 1,
    legiperf: 20,
    legiETH: 10,
    TalSet: 15,
    Pgems: 1,
    mara2024: 10,
    mara2529: 12,
    mara30: 20,
    BK35: 10,
    soj: 10,
    highlords: 10,
    skiller: 1.5,
    skiller030: 1.5,
    skiller3144: 10,
    skiller45: 100,
    jmod: 1000,
    scs: 1000,
};

let historyStack = []; // Stores all added values for undo functionality

// Update display by recalculating the total from historyStack
function updateDisplay() {
    const expression = historyStack.reduce((acc, value) => acc + value, 0);
    display.value = expression.toString();
}

// Add an action to the history
function addToHistory(entry) {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.insertBefore(li, historyList.firstChild); // Add new entries at the top
    historyList.scrollTop = 0; // Scroll to the top to keep the newest entry in view
}

// Handle custom mode button clicks (add custom values)
customCalc.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value in customValues) {
            historyStack.push(customValues[value]);  // Add the custom value to the stack
            addToHistory(`${value} (${customValues[value]})`);  // Add action to history
            updateDisplay();  // Recalculate and display the new total
        }
    });
});

// Handle adding values from the input field
addValueBtn.addEventListener('click', () => {
    const inputValue = parseFloat(userInput.value);
    if (!isNaN(inputValue)) {
        historyStack.push(inputValue); // Add the input value to the stack
        addToHistory(`Self Input (${inputValue})`);  // Add action to history
        updateDisplay(); // Recalculate and display the new total
        userInput.value = ''; // Clear the input field
    }
});

// Undo last input and remove from history
document.getElementById('undo').addEventListener('click', () => {
    if (historyStack.length > 0) {
        const lastValue = historyStack.pop();  // Remove the last added value from the stack
        const lastAction = historyList.firstChild; // Get the first child to remove
        if (lastAction) {
            historyList.removeChild(lastAction); // Remove it from the UI
        }
        updateDisplay();  // Recalculate and display the new total
    }
});

// Reset functionality
document.getElementById('reset-btn').addEventListener('click', function() {
    display.value = ''; // Clear display
    historyList.innerHTML = ''; // Clear history list
    historyStack = []; // Reset the history stack
});
