function saveBillToStorage() {
    const name = document.getElementById("billName").value.trim();
    const amount = document.getElementById("number").value.trim();

    if (!name || !amount) {
        alert("Please enter both a bill name and amount.");
        return;
    }

    const bill = {
        name: name,
        amount: parseFloat(amount),
        checked: false 
    };

    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.push(bill);
    localStorage.setItem("bills", JSON.stringify(bills));

    document.getElementById("billName").value = "";
    document.getElementById("number").value = "";

    alert("Bill added!");
}

function loadBillsFromStorage() {
    const billsSection = document.getElementById("billsCheckbox");
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    billsSection.innerHTML = "";

    for (let i = 0; i < bills.length; i++) {
        const bill = bills[i];

        const div = document.createElement("div");
        div.setAttribute("class", "bills");

        const nameP = document.createElement("p");
        nameP.textContent = bill.name;

        const amountP = document.createElement("p");
        amountP.textContent = "$" + bill.amount.toFixed(2);

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "paid");
        checkbox.setAttribute("value", "yes");
        checkbox.checked = bill.checked;

        checkbox.addEventListener("change", function () {
            updateCheckbox(i, this.checked);
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", function () {
            removeBill(i);
        });

        div.appendChild(nameP);
        div.appendChild(amountP);
        div.appendChild(checkbox);
        div.appendChild(removeBtn);

        billsSection.appendChild(div);
    }
}

function updateCheckbox(index, checked) {
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    if (index >= 0 && index < bills.length) {
        bills[index].checked = checked; 
        localStorage.setItem("bills", JSON.stringify(bills));
    }
}

function removeBill(index) {
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    if (index >= 0 && index < bills.length) {
        bills.splice(index, 1);
        localStorage.setItem("bills", JSON.stringify(bills));
        loadBillsFromStorage();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadBillsFromStorage();
});






function handleAddWeek() {
    let weekInput = document.getElementById("gasWeek").value.trim();
    let amountInput = document.getElementById("gasAmount").value.trim();

    let weekNumber = parseInt(weekInput);
    let amount = parseFloat(amountInput);

    if (!weekInput || !amountInput) {
        alert("Please enter both week number and amount.");
        return;
    }

    if (isNaN(weekNumber) || isNaN(amount)) {
        alert("Please enter valid numbers.");
        return;
    }

    // Load existing entries or initialize array
    let gasEntries = JSON.parse(localStorage.getItem("gasEntries")) || [];

    // Add the new entry
    gasEntries.push({ week: weekNumber, amount: amount });

    // Save back to localStorage
    localStorage.setItem("gasEntries", JSON.stringify(gasEntries));

    // Go to the page that will show all the weeks
    window.location.href = "index.html";
}


function createGasEntry(weekNumber, amount) {
    let gasSection = document.getElementById("gas");

    let container = document.createElement("div");
    container.setAttribute("class", "gasContainer");

    let weekP = document.createElement("p");
    weekP.textContent = "Week " + weekNumber;

    let amountP = document.createElement("p");
    amountP.textContent = amount.toFixed(2);

    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter amount to subtract";

    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

function subtractAmount() {
    let inputValue = parseFloat(input.value);
    let currentAmount = parseFloat(amountP.textContent);

    if (!isNaN(inputValue)) {
        let newAmount = currentAmount - inputValue;
        amountP.textContent = newAmount.toFixed(2);
        input.value = "";

        // Update localStorage
        let gasEntries = JSON.parse(localStorage.getItem("gasEntries")) || [];
        let entryIndex = gasEntries.findIndex(entry => entry.week === weekNumber);

        if (entryIndex !== -1) {
            gasEntries[entryIndex].amount = newAmount;
            localStorage.setItem("gasEntries", JSON.stringify(gasEntries));
        }
    } else {
        alert("Please enter a valid number.");
    }
}

    submitBtn.addEventListener("click", subtractAmount);
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") subtractAmount();
    });

    removeBtn.addEventListener("click", function () {
        gasSection.removeChild(container);
    });

    container.appendChild(weekP);
    container.appendChild(amountP);
    container.appendChild(input);
    container.appendChild(submitBtn);
    container.appendChild(removeBtn);

    gasSection.appendChild(container);
}

window.onload = function () {
    let gasSection = document.getElementById("gas");

    let gasEntries = JSON.parse(localStorage.getItem("gasEntries")) || [];

    if (gasEntries.length === 0) {
        return;
    }

    gasEntries.forEach(function(entry) {
        createGasEntry(entry.week, parseFloat(entry.amount));
    });
};
