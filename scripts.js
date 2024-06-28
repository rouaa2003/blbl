document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const addProductButton = document.getElementById("add-product-button");
    const addProductFormContainer = document.getElementById("add-product-form-container");
    const cancelButton = document.getElementById("cancel-button");
    const addProductForm = document.getElementById("add-product-form");
    const chatToggle = document.getElementById("chat-toggle");
    const chatContainer = document.getElementById("chat-container");
    const chatList = document.getElementById("chat-list");
    const productGrid = document.getElementById("product-grid");
    const chatContent = document.getElementById("chat-content");
    const exitButton = document.querySelector('.exit-chat-button');
    let isChatOpen = false;
    const profileButton = document.getElementById('profileButton');
  const profileModal = document.getElementById('profileModal');
  const closeBtn = document.getElementsByClassName('close')[0];
  const modal = document.querySelector('.modal');
  const editProfileBtn = document.querySelector('.edit-profile-btn');
  const editModal = document.querySelector('.edit-modal');
  const saveProfileBtn = document.querySelector('.save-profile-btn');
  const profileForm = document.getElementById('profile-form');

  document.getElementById('profilePic').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


  editProfileBtn.addEventListener('click', () => {
    editModal.style.display = 'block';
  });

  saveProfileBtn.addEventListener('click', () => {
    // Code to save the changes made to the profile data
  });

  profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Code to handle form submission and save the changes made to the profile data
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }

    if (event.target === editModal) {
      editModal.style.display = 'none';
    }
  });

  profileButton.addEventListener('click', function () {
    profileModal.style.display = 'block';
  });
  closeBtn.addEventListener('click', function () {
    profileModal.style.display = 'none';
  });


    // Add product form functionality
    addProductButton.addEventListener("click", function () {
        addProductFormContainer.style.display = "flex";
        chatContent.classList.add("hidden"); // Hide chat content when adding a product
    });

    cancelButton.addEventListener("click", function () {
        addProductFormContainer.style.display = "none";
    });

    addProductForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Retrieve form data
        const productName = document.getElementById("product-name").value;
        const productCondition = document.getElementById("product-condition").value;
        const productImage = document.getElementById("product-image").value;
        const productStatus = document.getElementById("product-status").value;
        const productCity = document.getElementById("product-city").value;

        // Create new product card
        const newProductCard = document.createElement("div");
        newProductCard.className = "product-card";
        newProductCard.innerHTML = `
            <img src="${productImage}" alt="${productName}">
            <div class="product-details">
                <h3>${productName}</h3>
                <p>Condition: ${productCondition}</p>
                <p>Status: ${productStatus}</p>
                <p>City: ${productCity}</p>
                <button class="chat-button">Chat with Seller</button>
                <button class="sell-button">Mark as Sold</button>
            </div>
        `;

        // Append new product card to the grid
        productGrid.insertBefore(newProductCard, addProductButton);

        // Reset and hide the form
        addProductForm.reset();
        addProductFormContainer.style.display = "none";
    });

    // Toggle chat overlay
    chatToggle.addEventListener("click", function () {
        if (!isChatOpen) {
            productGrid.style.width = "65%";
            chatContainer.style.width = "35%";
            chatContainer.style.display = "flex";
            header.style.width = "65%"; // Set header width
            chatContent.classList.add("hidden"); // Hide chat content when toggling chat
        } else {
            productGrid.style.width = "100%";
            chatContainer.style.width = "300px";
            chatContainer.style.display = "none";
            header.style.width = "100%"; // Restore header width
        }
        isChatOpen = !isChatOpen;
    });

    // Show chat content when clicking on a chat item
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(function (item) {
        item.addEventListener('click', function () {
            showChatContent(item.dataset.chatId);
        });
    });

    // Hide chat content when clicking on exit button
    exitButton.addEventListener('click', function () {
        hideChatContent();
    });

    // Function to show chat content
    function showChatContent(chatId) {
        chatContent.classList.remove("hidden");
        chatContent.style.width = "100%"; // Expand chat content width
        chatList.style.padding = "0px";
        loadChatMessages(chatId);
    }

    // Function to hide chat content
    function hideChatContent() {
        chatContent.classList.add("hidden");
        chatList.style.padding = "10px";
        chatContent.style.width = "0"; // Collapse chat content width
    }

    // Function to load chat messages (dummy function for demonstration)
    function loadChatMessages(chatId) {
        const messagesContainer = document.querySelector(".messages");
        // Dummy messages for demonstration
        messagesContainer.innerHTML = `
            <div class="message">Message 1 in ${chatId}</div>
            <div class="message">Message 2 in ${chatId}</div>
        `;
    }

    // Function to send a new message (dummy function for demonstration)
    function sendMessage() {
        const input = document.querySelector(".new-message input");
        const message = input.value.trim();
        if (message) {
            const messagesContainer = document.querySelector(".messages");
            const newMessage = document.createElement("div");
            newMessage.classList.add("message");
            newMessage.textContent = message;
            messagesContainer.appendChild(newMessage);
            input.value = "";
        }
    }
});
