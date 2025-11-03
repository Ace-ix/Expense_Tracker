window.onload = () => {
  const saved = localStorage.getItem('expenses');
  if (saved) {
    expenses = JSON.parse(saved);
    renderTable();
    calculateTotal();
  }
};

localStorage.getItem('expenses')


let expenses = [];

function addItem() {
  event.preventDefault();

  const date = document.getElementById('Date').value;
  const item = document.getElementById('item').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const type = document.getElementById('Type').value;

  if (!date || !item || !amount || !type) {
    alert("Please fill all the fields.");
    return;
  }

  const expense = {
    id: Date.now(),
    date,
    item,
    amount,
    category,
    type

  };

  expenses.push(expense);
  renderTable();
  calculateTotal();
  localStorage.setItem('expenses', JSON.stringify(expenses));
  document.getElementById('expenseForm').reset();
}

function removeItem(button, id) {
  button.parentElement.parentElement.remove();
  expenses = expenses.filter(exp => exp.id !== id);
  calculateTotal();
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function renderTable() {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';
  localStorage.getItem('expenses')

  expenses.forEach(exp => {
    const row = document.createElement('tr');
    row.style.color = exp.type === "cashIn" ? "green" : "red";
    row.innerHTML = `
      <td>${exp.date}</td>
      <td>${exp.item}</td>
      <td>₹${exp.amount}</td>
      <td>${exp.category}</td>
      <td>${exp.type}</td>
      <td><button id='remove' onclick="removeItem(this, ${exp.id})">Remove</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function calculateTotal() {
  let totalCashIn = 0;
  let totalCashOut = 0;

  expenses.forEach(exp => {
    if (exp.type === "cashIn") {
      totalCashIn += exp.amount;
    } else {
      totalCashOut += exp.amount;
    }
  });

  document.getElementById('cashin').innerText = "Total Cash In: ₹ " + totalCashIn;
  document.getElementById('cashout').innerText = "Total Cash Out: ₹ " + totalCashOut;
  document.getElementById('bal').innerText = "Balance: ₹ " + (totalCashIn - totalCashOut);
}