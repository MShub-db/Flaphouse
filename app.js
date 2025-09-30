// Grab elements
const form = document.getElementById("addItemForm");
const tableBody = document.getElementById("inventoryTable");
const reportSummary = document.getElementById("reportSummary");
const searchBar = document.getElementById("searchBar");

// Load saved inventory or start empty
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

// Render table
function renderInventory(filteredInventory = inventory) {
  tableBody.innerHTML = "";
  filteredInventory.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.grade}</td>
      <td>${item.thickness}</td>
      <td>${item.finish}</td>
      <td>${item.shape}</td>
      <td>${item.dimension}</td>
      <td>${item.zone}</td>
      <td>${item.quantity}</td>
      <td>
        <button onclick="editItem(${index})">Edit</button>
        <button onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
  generateReport();
}

// Save inventory to localStorage
function saveInventory() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const item = {
    grade: document.getElementById("grade").value.trim(),
    thickness: document.getElementById("thickness").value.trim(),
    finish: document.getElementById("finish").value.trim(),
    shape: document.getElementById("shape").value.trim(),
    dimension: document.getElementById("dimension").value.trim(),
    zone: document.getElementById("zone").value.trim(),
    quantity: parseInt(document.getElementById("quantity").value)
  };

  const editIndex = document.getElementById("editIndex").value;
  if (editIndex !== "") {
    inventory[editIndex] = item;
    document.getElementById("editIndex").value = "";
    document.getElementById("cancelEdit").style.display = "none";
  } else {
    inventory.push(item);
  }

  saveInventory();
  renderInventory();
  form.reset();
});

// Edit item
function editItem(index) {
  const item = inventory[index];
  document.getElementById("grade").value = item.grade;
  document.getElementById("thickness").value = item.thickness;
  document.getElementById("finish").value = item.finish;
  document.getElementById("shape").value = item.shape;
  document.getElementById("dimension").value = item.dimension;
  document.getElementById("zone").value = item.zone;
  document.getElementById("quantity").value = item.quantity;
  document.getElementById("editIndex").value = index;
  document.getElementById("cancelEdit").style.display = "inline-block";
}

// Cancel edit
function cancelEdit() {
  form.reset();
  document.getElementById("editIndex").value = "";
  document.getElementById("cancelEdit").style.display = "none";
}

// Delete item
function deleteItem(index) {
  inventory.splice(index, 1);
  saveInventory();
  renderInventory();
}

// Generate summary report
function generateReport() {
  const totalItems = inventory.length;
  const totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);
  reportSummary.innerText = `Total Stock Types: ${totalItems} • Total Quantity: ${totalQuantity}`;
}

// Show sections
function showSection(sectionId) {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("reports").style.display = "none";
  document.getElementById(sectionId).style.display = "block";
}

// Fake logout
function logout() {
  alert("You have been logged out (stub).");
}

// Search & filter
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  const filtered = inventory.filter(item =>
    item.grade.toLowerCase().includes(query) ||
    item.thickness.toLowerCase().includes(query) ||
    item.finish.toLowerCase().includes(query) ||
    item.shape.toLowerCase().includes(query) ||
    item.dimension.toLowerCase().includes(query) ||
    item.zone.toLowerCase().includes(query) ||
    String(item.quantity).includes(query)
  );
  renderInventory(filtered);
});

// Initial render
renderInventory();
