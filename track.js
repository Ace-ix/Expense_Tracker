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
    var col = Type.value === "cashIn" ? "green" : "red";
    var list = document.getElementById('tableBody');
    var element = document.createElement('tr');
    element.style.color = col;
    element.innerHTML = `<td>${Date.value}</td><td>${itemName.value}</td><td>${'₹'+amount.value}</td><td>${Type.value}</td><td><button id='remove'onclick="this.parentElement.parentElement.remove()">remove</button></td>`;
    list.appendChild(element);
    document.getElementById('expenseForm').reset();
}

    