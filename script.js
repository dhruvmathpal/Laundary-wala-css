let lastScroll = 0;

window.addEventListener("scroll", function () {
    const nav = document.getElementById("navbar");
    let currentScroll = window.scrollY;

    if (currentScroll > 100 && lastScroll <= 100) {
        nav.classList.add("scrolled");
    }

    if (currentScroll <= 100 && lastScroll > 100) {
        nav.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
});

const addButtons = document.getElementsByClassName("additemBtn");
const tableBody = document.querySelector(".tableAdd");
const totalAmountElement = document.querySelector(".totalamount p");

let totalAmount = 0;
let selectedItems = []; // Store selected items
let itemIndex = 0;

for (let i = 0; i < addButtons.length; i++) {

  addButtons[i].addEventListener("click", function () {

    const serviceElement = this.parentElement;
    const serviceName = serviceElement.querySelector('.service-left').innerText.trim();
    const priceText = serviceElement.querySelector('.amount').innerText.replace("₹", "");
    const price = Number(priceText);
    const img = addButtons[i].querySelector("#itemImg img");
    const btnText = addButtons[i].childNodes[0];
  

    // ITEM ADD
    if (img.src.includes("add.png")) {

      img.src = "images/minus-button.png";
      btnText.textContent = "Added ";
      addButtons[i].style.color = "white";
      addButtons[i].style.background = "#007bff";
      

      selectedItems.push({ serviceName, price });

      totalAmount += price;

    } else {
      // REMOVE ITEM
      img.src = "images/add.png";
      btnText.textContent = "Add Item ";
      addButtons[i].style.color = "black";
      addButtons[i].style.background = "#e7e7e7";

      selectedItems = selectedItems.filter(item => item.serviceName !== serviceName);

      totalAmount -= price;
    }

    renderTable();
    totalAmountElement.innerText = "₹" + totalAmount;

  });
}

// 🔄 Function to update visible table rows dynamically
function renderTable() {
    tableBody.innerHTML = "";

    selectedItems.forEach((item, index) => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.serviceName}</td>
            <td>₹${item.price}</td>
        `;

        tableBody.appendChild(tr);
    });
      const infoMessage = document.getElementById('infoMessage');
      if(selectedItems.length === 0){
        infoMessage.style.display = "block";
      }else {
        infoMessage.style.display = "none";
      }
}
  let popup = document.getElementById("popup");
    function openPopup(){
      popup.style.display="flex"
      popup.classList.add("show-popup");
    }
  function closePopup(){
  const popup = document.getElementById("popup");
  popup.classList.remove("show-popup");

  // 💥 CLEAR SELECTED ITEMS & TABLE
  selectedItems = [];
  totalAmount = 0;
  totalAmountElement.innerText = "₹0";
  renderTable();

  // 🔄 Reset All Buttons
  for (let i = 0; i < addButtons.length; i++) {
    const img = addButtons[i].querySelector("#itemImg img");
    const btnText = addButtons[i].childNodes[0];

    img.src = "images/add.png";
    btnText.textContent = "Add Item ";
    addButtons[i].style.color = "black";
    addButtons[i].style.background = "#e7e7e7";
  }

  setTimeout(() => {
    popup.style.display = "none";
  }, 30);
}


  
