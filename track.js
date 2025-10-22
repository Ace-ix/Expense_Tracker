var expenses = []
function addItem() {
    event.preventDefault();  // prevent form submission
    var Date = document.getElementById('Date')
    var itemName = document.getElementById('item')
    var amount = document.getElementById('amount')
    var Type = document.getElementById('Type')
    if (!Date.value || !itemName.value || !amount.value || !Type.value) {
        alert("Please fill all the fields.");
        return;
    }
    var expense = [Date.value, itemName.value, amount.value, Type.value];
    expenses.push(expense);
    var col = Type.value === "cashIn" ? "green" : "red";
    var list = document.getElementById('tableBody');
    var element = document.createElement('tr');
    element.style.color = col;
    element.innerHTML = `<td>${Date.value}</td><td>${itemName.value}</td><td>${'₹'+amount.value}</td><td>${Type.value}</td><td><button id='remove'onclick="this.parentElement.parentElement.remove()">remove</button></td>`;
    list.appendChild(element);
    document.getElementById('expenseForm').reset();  

    var totalCashIn = 0;
    var totalCashOut = 0;
    for (i in expenses) {
        if (expenses[i][3] === "cashIn") {
            totalCashIn += parseFloat(expenses[i][2]);}
        else {
            totalCashOut += parseFloat(expenses[i][2]);}
    }
    var totalcashin = document.getElementById('cashin');
    var balance = document.getElementById('bal');
    var totalcashout = document.getElementById('cashout');
    totalcashin.innerText = "Total Cash In: "+'₹ ' + totalCashIn;
    totalcashout.innerText = "Total Cash Out: "+'₹ ' + totalCashOut;
    balance.innerText = "Balance: "+'₹ ' + (totalCashIn - totalCashOut);
}