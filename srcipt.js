/* =====================================
   📦 MYStore - Main Script (script.js)
===================================== */

// 🛒 Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =======================
// 🧮 Update Cart Count
// =======================
function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(span => {
    span.textContent = cart.length;
  });
}

// Initialize cart count on load
updateCartCount();


// =======================
// 🛍️ Add Item to Cart
// =======================
function addToCart(name, price, pdf = "", video = "", img = "images/iphone 17 pro.jpg") {
  cart.push({ name, price, pdf, video, img });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}


// =======================
// 🔍 Search Functionality
// =======================
function searchSubjects() {
  const input = document.getElementById("search-input")?.value.toLowerCase() || "";
  document.querySelectorAll(".product-card").forEach(card => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = title.includes(input) ? "block" : "none";
  });
}


// =======================
// 🎞️ View Sample Content
// =======================
function viewSample(pdf, video, name) {
  const sampleWindow = window.open("", "_blank", "width=800,height=600");
  sampleWindow.document.write(`
    <h2>📘 Sample Content: ${name}</h2>
    <p><strong>PDF Sample:</strong></p>
    <iframe src="${pdf || 'sample.pdf'}" width="100%" height="300"></iframe>
    <p><strong>Video Sample:</strong></p>
    <video width="100%" controls>
      <source src="${video || 'sample.mp4'}" type="video/mp4">
    </video>
  `);
}


// =======================
// 🧾 Render Cart Page
// =======================
if (document.getElementById("cart-items")) {
  const cartContainer = document.getElementById("cart-items");

  function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
      document.getElementById("total").innerText = "Total: ₹0";
      return;
    }

    cart.forEach((item, index) => {
      total += item.price;
      cartContainer.innerHTML += `
        <div class="cart-row">
          <img src="${item.img}" alt="${item.name}">
          <div>
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
          </div>
        </div>
      `;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
  }

  // Initial render
  renderCart();

  // Remove Item
  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  };
}


// =======================
// 🔓 Get Access (Checkout)
// =======================
function getAccess() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "content.html";
}


// =======================
// 📚 Purchased Content Page
// =======================
if (document.getElementById("content-container")) {
  const container = document.getElementById("content-container");

  if (cart.length === 0) {
    container.innerHTML = "<p>No purchased content found.</p>";
  } else {
    cart.forEach(item => {
      container.innerHTML += `
        <div class="content-box">
          <h3>${item.name}</h3>
          <p><strong>📘 PDF Notes:</strong></p>
          <iframe src="${item.pdf || 'sample.pdf'}" width="100%" height="250"></iframe>
          <p><strong>🎥 Video Lecture:</strong></p>
          <video width="100%" controls>
            <source src="${item.video || 'sample.mp4'}" type="video/mp4">
          </video>
        </div>
      `;
    });
  }
}
