async function loadAll() {
  let items = await fetch('/items', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => appendToTable(response.items));
}

function updateStore(items) {
  window.items = items;
}

function appendToTable(items) {
  window.items = items;
  let table = document.getElementById('currentItems');
  for (let index = table.rows.length - 1; index > 0; index--) {
    table.deleteRow(index);
  }
  let index = table.rows.length;
  items.forEach((item) => {
    let entry = table.insertRow(index);
    entry.insertCell(0).innerHTML = item.id;
    entry.insertCell(1).innerHTML = item.name;
    entry.insertCell(2).innerHTML = item.price;
    entry.insertCell(3).innerHTML = item.quantity;
    entry.insertCell(
      4
    ).innerHTML = `<input type="button" id="${item.id}" value="Show" onClick="showItem(event.target.id)" />`;
  });
}

async function addItem() {
  let id = document.getElementById('id').value;
  let name = document.getElementById('name').value;
  let price = document.getElementById('price').value;
  let quantity = document.getElementById('quantity').value;
  let item = {
    id: id,
    name: name,
    price: price,
    quantity: quantity,
  };

  let newItem = await fetch(`/new-item/${id}`, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(() => loadAll());
}

async function updateItem() {
  let id = document.getElementById('id').value;
  let name = document.getElementById('name').value;
  let price = document.getElementById('price').value;
  let quantity = document.getElementById('quantity').value;
  let payload = {
    currentItems: window.items,
    item: {
      id: id,
      name: name,
      price: price,
      quantity: quantity,
    },
  };
  let request = await fetch(`/update-item/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => updateStore(response.items))
    .then(() => loadAll());
}

async function deleteItem() {
  let id = document.getElementById('id').value;
  let request = await fetch(`/item/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(() => loadAll());
}

async function showItem(id) {
  let request = await fetch(`/item/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => popUp(response.item));
}

function popUp(item) {
  let message = `Id: ${item.id}, Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}`;
  alert(message);
}
