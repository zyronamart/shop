
// ======================================================
// SHOPZONE - COMPLETE JAVASCRIPT
// ======================================================


// ================= MOBILE MENU =================

function toggleMenu() {

    const navbar = document.getElementById("navbar");

    if (navbar) {
        navbar.classList.toggle("show");
    }

}


// ================= CART =================

// LocalStorage se cart load karo

let cart = JSON.parse(
    localStorage.getItem("shopzoneCart")
) || [];


// ================= UPDATE CART COUNT =================

function updateCartCount() {

    const cartCountElement =
        document.getElementById("cartCount");

    if (!cartCountElement) return;

    let totalItems = 0;

    cart.forEach(function(product) {

        totalItems += Number(product.quantity) || 0;

    });

    cartCountElement.innerText = totalItems;

}


// ================= ADD PRODUCT TO CART =================

function addProductToCart(productName, productPrice, productIcon, productImage) {

    productPrice = Number(
        String(productPrice).replace(/[₹,]/g, "")
    );

    if (isNaN(productPrice)) {
        alert("Product price is missing!");
        return;
    }

    const existingProduct = cart.find(function(product) {
        return product.name === productName;
    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            price: productPrice,
            icon: productIcon,
            image: productImage,
            quantity: 1
        });

    }

    localStorage.setItem(
        "shopzoneCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(productName + " added to cart!");
}














// ======================================================
// SEARCH PRODUCT
// ======================================================

/**function searchProduct() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;


    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    // Empty search

    if (searchText === "") {

        showAllProducts();

        return;

    }


    const products =
        document.querySelectorAll(".product-card");


    let found = false;


    products.forEach(function(product) {

        const productName =
            product.querySelector("h3");

        const category =
            product.querySelector(
                ".product-category"
            );


        const nameText =
            productName
                ? productName.innerText.toLowerCase()
                : "";


        const categoryText =
            category
                ? category.innerText.toLowerCase()
                : "";


        // Search name ya category me

        if (
            nameText.includes(searchText) ||
            categoryText.includes(searchText)
        ) {

            product.style.display = "";

            found = true;

        }

        else {

            product.style.display = "none";

        }

    });


    // Result nahi mila

    if (!found) {

        alert(
            "No product found for: " +
            searchInput.value
        );

    }

}





**/



/* ==========================================
   GLOBAL PRODUCT SEARCH
========================================== */

function searchProduct() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    const query = searchInput.value.trim();

    if (query === "") {
        return;
    }

    // Search keyword save karo
    localStorage.setItem("shopzoneSearch", query);

    // Shop page par bhejo
    window.location.href = "search.html";
}




// ================= ENTER KEY SEARCH =================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const searchInput =
            document.getElementById(
                "searchInput"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "keypress",
                function(event) {

                    if (event.key === "Enter") {

                        searchProduct();

                    }

                }
            );

        }

    }
);






























// ================= SHOW ALL PRODUCTS =================

function showAllProducts() {

    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(function(product) {

        product.style.display = "";

    });

}


// ======================================================
// CATEGORY FILTER
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const filterButtons =
            document.querySelectorAll(
                ".filter-btn"
            );


        filterButtons.forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const category =
                            button.dataset.category;


                        // Active button

                        filterButtons.forEach(
                            function(btn) {

                                btn.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        const products =
                            document.querySelectorAll(
                                ".product-card"
                            );


                        products.forEach(
                            function(product) {

                                const productCategory =
                                    product.dataset.category;


                                if (
                                    category === "all" ||
                                    productCategory === category
                                ) {

                                    product.style.display =
                                        "";

                                }

                                else {

                                    product.style.display =
                                        "none";

                                }

                            }
                        );

                    }
                );

            }
        );

    }
);


// ======================================================
// DISPLAY CART
// ======================================================

function displayCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const emptyCart =
        document.getElementById(
            "emptyCart"
        );


    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    const shippingElement =
        document.getElementById(
            "shipping"
        );


    const grandTotalElement =
        document.getElementById(
            "grandTotal"
        );


    const itemCountElement =
        document.getElementById(
            "itemCount"
        );


    // Cart page nahi hai

    if (!cartItems) return;


    // ================= EMPTY CART =================

    if (cart.length === 0) {

        cartItems.innerHTML = "";


        if (emptyCart) {

            emptyCart.style.display =
                "block";

        }


        if (subtotalElement) {

            subtotalElement.innerText =
                "₹0";

        }


        if (shippingElement) {

            shippingElement.innerText =
                "₹0";

        }


        if (grandTotalElement) {

            grandTotalElement.innerText =
                "₹0";

        }


        if (itemCountElement) {

            itemCountElement.innerText =
                "0 Items";

        }


        return;

    }


    // Empty message hide

    if (emptyCart) {

        emptyCart.style.display =
            "none";

    }


    let subtotal = 0;

    let totalItems = 0;


    cartItems.innerHTML = "";


    // ================= CART PRODUCTS =================

    cart.forEach(
        function(product, index) {

            const price =
                Number(product.price) || 0;


            const quantity =
                Number(product.quantity) || 1;


            const itemTotal =
                price * quantity;


            subtotal += itemTotal;

            totalItems += quantity;


            cartItems.innerHTML += `

               <div class="cart-item-image">

    ${
        product.image
        ? `<img src="${product.image}" alt="${product.name}">`
        : `<i class="fa-solid fa-${product.icon || "bag-shopping"}"></i>`
    }

</div>
                    <div class="cart-item-info">

                        <h3>
                            ${product.name}
                        </h3>


                        <p>
                            ₹${price.toLocaleString("en-IN")}
                        </p>


                        <div class="quantity-control">

                            <button
                                onclick="decreaseQuantity(${index})">

                                <i class="fa-solid fa-minus"></i>

                            </button>


                            <span>
                                ${quantity}
                            </span>


                            <button
                                onclick="increaseQuantity(${index})">

                                <i class="fa-solid fa-plus"></i>

                            </button>

                        </div>

                    </div>


                    <div class="cart-item-right">

                        <div class="item-total">

                            ₹${itemTotal.toLocaleString("en-IN")}

                        </div>


                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${index})">

                            <i class="fa-solid fa-trash"></i>

                            Remove

                        </button>

                    </div>

                </div>

            `;

        }
    );


    // ================= SHIPPING =================

    let shipping = 0;


    // ₹999 se kam par ₹99 shipping

    if (
        subtotal > 0 &&
        subtotal < 999
    ) {

        shipping = 99;

    }


    const grandTotal =
        subtotal + shipping;


    // ================= SUMMARY =================

    if (subtotalElement) {

        subtotalElement.innerText =
            "₹" +
            subtotal.toLocaleString(
                "en-IN"
            );

    }


    if (shippingElement) {

        shippingElement.innerText =
            shipping === 0
                ? "FREE"
                : "₹" +
                  shipping.toLocaleString(
                      "en-IN"
                  );

    }


    if (grandTotalElement) {

        grandTotalElement.innerText =
            "₹" +
            grandTotal.toLocaleString(
                "en-IN"
            );

    }


    if (itemCountElement) {

        itemCountElement.innerText =
            totalItems +
            (
                totalItems === 1
                    ? " Item"
                    : " Items"
            );

    }

}


// ======================================================
// INCREASE QUANTITY
// ======================================================

function increaseQuantity(index) {

    if (!cart[index]) return;


    cart[index].quantity++;


    saveCart();

}


// ======================================================
// DECREASE QUANTITY
// ======================================================

function decreaseQuantity(index) {

    if (!cart[index]) return;


    if (
        Number(cart[index].quantity) > 1
    ) {

        cart[index].quantity--;

    }

    else {

        cart.splice(index, 1);

    }


    saveCart();

}


// ======================================================
// REMOVE PRODUCT
// ======================================================

function removeFromCart(index) {

    if (!cart[index]) return;


    const productName =
        cart[index].name;


    cart.splice(index, 1);


    saveCart();


    alert(
        productName +
        " removed from cart!"
    );

}


// ======================================================
// SAVE CART
// ======================================================

function saveCart() {

    localStorage.setItem(
        "shopzoneCart",
        JSON.stringify(cart)
    );


    updateCartCount();

    displayCart();

}


// ======================================================
// CHECKOUT
// ======================================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;

    }


    alert(
        "Checkout page will be connected next."
    );

}


// ======================================================
// NEWSLETTER
// ======================================================

function subscribe() {

    const emailInput =
        document.getElementById(
            "email"
        );


    if (!emailInput) return;


    const email =
        emailInput.value.trim();


    if (email === "") {

        alert(
            "Please enter your email."
        );

        return;

    }


    if (!email.includes("@")) {

        alert(
            "Please enter a valid email."
        );

        return;

    }


    alert(
        "Thank you for subscribing!"
    );


    emailInput.value = "";

}


// ======================================================
// PAGE LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        displayCart();

    }
);


// ======================================================
// OFFER COUNTDOWN
// ======================================================

const offerEndDate =
    new Date(
        "October 20, 2026 23:59:59"
    ).getTime();


const countdownTimer =
    setInterval(
        function() {

            const daysElement =
                document.getElementById(
                    "days"
                );


            const hoursElement =
                document.getElementById(
                    "hours"
                );


            const minutesElement =
                document.getElementById(
                    "minutes"
                );


            const secondsElement =
                document.getElementById(
                    "seconds"
                );


            // Countdown page par nahi hai

            if (
                !daysElement ||
                !hoursElement ||
                !minutesElement ||
                !secondsElement
            ) {

                return;

            }


            const now =
                new Date().getTime();


            const distance =
                offerEndDate - now;


            if (distance <= 0) {

                clearInterval(
                    countdownTimer
                );


                daysElement.innerText =
                    "00";


                hoursElement.innerText =
                    "00";


                minutesElement.innerText =
                    "00";


                secondsElement.innerText =
                    "00";


                return;

            }


            const days =
                Math.floor(
                    distance /
                    (1000 * 60 * 60 * 24)
                );


            const hours =
                Math.floor(
                    (
                        distance %
                        (1000 * 60 * 60 * 24)
                    ) /
                    (1000 * 60 * 60)
                );


            const minutes =
                Math.floor(
                    (
                        distance %
                        (1000 * 60 * 60)
                    ) /
                    (1000 * 60)
                );


            const seconds =
                Math.floor(
                    (
                        distance %
                        (1000 * 60)
                    ) /
                    1000
                );


            daysElement.innerText =
                String(days).padStart(
                    2,
                    "0"
                );


            hoursElement.innerText =
                String(hours).padStart(
                    2,
                    "0"
                );


            minutesElement.innerText =
                String(minutes).padStart(
                    2,
                    "0"
                );


            secondsElement.innerText =
                String(seconds).padStart(
                    2,
                    "0"
                );

        },
        1000
    );


























// ======================================================
// SHOPZONE - WISHLIST
// ======================================================


// ================= LOAD WISHLIST =================

let wishlist = JSON.parse(
    localStorage.getItem("shopzoneWishlist")
) || [];


// ================= UPDATE WISHLIST COUNT =================

function updateWishlistCount() {

    const wishlistCount =
        document.getElementById("wishlistCount");

    if (!wishlistCount) return;

    wishlistCount.innerText = wishlist.length;

}


// ================= ADD TO WISHLIST =================

function addToWishlist(button) {

    const productCard =
        button.closest(".product-card");

    if (!productCard) return;


    // Product name

    const nameElement =
        productCard.querySelector("h3");

    const productName =
        nameElement
            ? nameElement.innerText.trim()
            : "Product";


    // Product price

    const priceElement =
        productCard.querySelector(".price strong");

    let productPrice = 0;

    if (priceElement) {

        productPrice = Number(
            priceElement.innerText
                .replace(/[₹,]/g, "")
                .trim()
        );

    }


    // Product category

    const categoryElement =
        productCard.querySelector(".product-category");

    const productCategory =
        categoryElement
            ? categoryElement.innerText.trim()
            : "";


    // Product icon

    const iconElement =
        productCard.querySelector(
            ".product-placeholder i"
        );

    let productIcon =
        "bag-shopping";

    if (iconElement) {

        const classes =
            Array.from(iconElement.classList);

        const iconClass =
            classes.find(function(className) {

                return className.startsWith("fa-") &&
                       className !== "fa-solid" &&
                       className !== "fa-regular";

            });

        if (iconClass) {

            productIcon =
                iconClass.replace("fa-", "");

        }

    }


    // Product image

    const imageElement =
        productCard.querySelector(
            ".product-placeholder img"
        );

    const productImage =
        imageElement
            ? imageElement.getAttribute("src")
            : "";


    // Check already exists

    const alreadyExists =
        wishlist.some(function(product) {

            return product.name === productName;

        });


    if (alreadyExists) {

        alert(
            productName +
            " is already in your wishlist!"
        );

        return;

    }


    // Add product

    wishlist.push({

        name: productName,

        price: productPrice,

        category: productCategory,

        icon: productIcon,

        image: productImage

    });


    // Save

    localStorage.setItem(
        "shopzoneWishlist",
        JSON.stringify(wishlist)
    );


    // Heart change

    const heart =
        button.querySelector("i");

    if (heart) {

        heart.classList.remove(
            "fa-regular"
        );

        heart.classList.add(
            "fa-solid"
        );

    }


    updateWishlistCount();


    alert(
        productName +
        " added to wishlist!"
    );

}


// ======================================================
// DISPLAY WISHLIST
// ======================================================

function displayWishlist() {

    const wishlistItems =
        document.getElementById(
            "wishlistItems"
        );

    const emptyWishlist =
        document.getElementById(
            "emptyWishlist"
        );


    // Wishlist page nahi hai

    if (!wishlistItems) return;


    // Empty wishlist

    if (wishlist.length === 0) {

        wishlistItems.innerHTML = "";

        if (emptyWishlist) {

            emptyWishlist.style.display =
                "block";

        }

        return;

    }


    // Hide empty message

    if (emptyWishlist) {

        emptyWishlist.style.display =
            "none";

    }


    wishlistItems.innerHTML = "";


    wishlist.forEach(
        function(product, index) {

            const price =
                Number(product.price) || 0;


            let productVisual = "";


            // Image available

            if (product.image) {

                productVisual = `
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >
                `;

            }

            // Icon fallback

            else {

                productVisual = `
                    <i class="fa-solid fa-${
                        product.icon ||
                        "bag-shopping"
                    }"></i>
                `;

            }


            wishlistItems.innerHTML += `

                <div class="wishlist-card">


                    <div class="wishlist-image">

                        ${productVisual}


                        <button
                            class="remove-wishlist"
                            onclick="removeFromWishlist(${index})"
                            title="Remove from Wishlist">

                            <i class="fa-solid fa-heart"></i>

                        </button>

                    </div>


                    <div class="wishlist-info">


                        <h3>
                            ${product.name}
                        </h3>


                        <div class="wishlist-price">

                            <strong>
                                ₹${price.toLocaleString("en-IN")}
                            </strong>

                        </div>


                        <button
                            class="wishlist-cart-btn"
                            onclick="addWishlistToCart(${index})">

                            <i class="fa-solid fa-cart-shopping"></i>

                            Add to Cart

                        </button>


                    </div>

                </div>

            `;

        }
    );

}


// ======================================================
// REMOVE FROM WISHLIST
// ======================================================

function removeFromWishlist(index) {

    if (!wishlist[index]) return;


    const productName =
        wishlist[index].name;


    wishlist.splice(index, 1);


    localStorage.setItem(
        "shopzoneWishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistCount();

    displayWishlist();


}


// ======================================================
// ADD WISHLIST PRODUCT TO CART
// ======================================================

function addWishlistToCart(index) {

    if (!wishlist[index]) return;


    const product =
        wishlist[index];


    // Existing cart

    let cart =
        JSON.parse(
            localStorage.getItem("shopzoneCart")
        ) || [];


    // Check existing product

    const existingProduct =
        cart.find(function(item) {

            return item.name === product.name;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    }

    else {

        cart.push({

            name: product.name,

            price: Number(product.price) || 0,

            icon: product.icon,

            image: product.image,

            quantity: 1

        });

    }


    // Save cart

    localStorage.setItem(
        "shopzoneCart",
        JSON.stringify(cart)
    );


    // Update global cart variable

    if (typeof window.cart !== "undefined") {

        window.cart = cart;

    }


    updateCartCount();


    alert(
        product.name +
        " added to cart!"
    );

}


// ======================================================
// WISHLIST PAGE LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateWishlistCount();

        displayWishlist();

    }
);


















































function loadCheckoutItems() {

    const cart = JSON.parse(localStorage.getItem("shopzoneCart")) || [];

    const checkoutItems = document.getElementById("checkoutItems");
    const checkoutSubtotal = document.getElementById("checkoutSubtotal");
    const checkoutShipping = document.getElementById("checkoutShipping");
    const checkoutTotal = document.getElementById("checkoutTotal");

    if (!checkoutItems) return;

    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <p class="empty-checkout">
                Your cart is empty.
            </p>
        `;

        checkoutSubtotal.textContent = "₹0";
        checkoutShipping.textContent = "₹0";
        checkoutTotal.textContent = "₹0";

        return;
    }

    let subtotal = 0;

    checkoutItems.innerHTML = cart.map(item => {

        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;

        const itemTotal = price * quantity;

        subtotal += itemTotal;

        return `
            <div class="checkout-product">

                <div class="checkout-product-image">
                    ${
                        item.image
                        ? `<img src="${item.image}" alt="${item.name}">`
                        : `<i class="fa-solid fa-box"></i>`
                    }
                </div>

                <div class="checkout-product-info">

                    <h3>${item.name}</h3>

                    <p>
                        ₹${price.toLocaleString("en-IN")}
                        × ${quantity}
                    </p>

                </div>

                <div class="checkout-product-total">
                    ₹${itemTotal.toLocaleString("en-IN")}
                </div>

            </div>
        `;

    }).join("");

    // SUBTOTAL
    checkoutSubtotal.textContent =
        "₹" + subtotal.toLocaleString("en-IN");

    // SHIPPING
    const shipping = subtotal >= 999 ? 0 : 50;

    checkoutShipping.textContent =
        shipping === 0
        ? "FREE"
        : "₹" + shipping.toLocaleString("en-IN");

    // GRAND TOTAL
    const grandTotal = subtotal + shipping;

    checkoutTotal.textContent =
        "₹" + grandTotal.toLocaleString("en-IN");
}


// Page load hone par cart load karo
document.addEventListener("DOMContentLoaded", function () {
    loadCheckoutItems();
});









/* ==========================================
   ACTIVE NAVBAR
   Automatically highlights current page
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".navbar a");

    // Current page ka naam
    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href")
                .split("/")
                .pop()
                .toLowerCase();


        // Purana active remove
        link.classList.remove("active");


        // Current page ko active karo
        if (
            linkPage === currentPage &&
            currentPage !== ""
        ) {

            link.classList.add("active");

        }

    });

});






















































































/* =========================================
   SHOPZONE PRODUCT POPUP
========================================= */

const modalProductImages = [
      "/product/jewllerys/Princess Unique Jewellery Set",
    "/product/jewllerys/Princess Unique Jewellery Set",
 "/product/jewllerys/Princess Unique Jewellery Set",
   "/product/women/trendy Handbag for Women"
];


let modalCurrentImage = 0;

let modalQuantity = 1;

let selectedProductSize = "8";

let addingProduct = false;


/* =========================================
   OPEN POPUP
========================================= */

function openProductPopup(event) {

    if (event) {

        event.stopPropagation();

    }


    const modal =
        document.getElementById("productModal");


    if (!modal) return;


    modal.classList.add("show");


    document.body.style.overflow =
        "hidden";


    modalCurrentImage = 0;

    modalQuantity = 1;

    selectedProductSize = "8";


    showModalImage(0);

    updateModalQuantity();


    /* Reset Size */

    document
        .querySelectorAll(".size-btn")
        .forEach(function(button) {

            button.classList.remove(
                "selected"
            );


            if (
                button.textContent.trim()
                === "8"
            ) {

                button.classList.add(
                    "selected"
                );

            }

        });

}


/* =========================================
   CLOSE POPUP
========================================= */

function closeProductPopup() {

    const modal =
        document.getElementById("productModal");


    if (!modal) return;


    modal.classList.remove("show");


    document.body.style.overflow =
        "";

}


/* =========================================
   IMAGE
========================================= */

function showModalImage(index) {

    modalCurrentImage = index;


    const mainImage =
        document.getElementById(
            "modalProductImage"
        );


    const thumbnails =
        document.querySelectorAll(
            ".modal-thumb"
        );


    if (!mainImage) return;


    mainImage.src =
        modalProductImages[
            modalCurrentImage
        ];


    thumbnails.forEach(
        function(thumb, i) {

            thumb.classList.toggle(
                "active",
                i === modalCurrentImage
            );

        }
    );

}


/* =========================================
   NEXT / PREVIOUS
========================================= */

function changeModalImage(direction) {

    modalCurrentImage += direction;


    if (
        modalCurrentImage < 0
    ) {

        modalCurrentImage =
            modalProductImages.length - 1;

    }


    if (
        modalCurrentImage >=
        modalProductImages.length
    ) {

        modalCurrentImage = 0;

    }


    showModalImage(
        modalCurrentImage
    );

}


/* =========================================
   SIZE
========================================= */

function selectProductSize(button) {

    document
        .querySelectorAll(".size-btn")
        .forEach(function(btn) {

            btn.classList.remove(
                "selected"
            );

        });


    button.classList.add(
        "selected"
    );


    selectedProductSize =
        button.textContent.trim();

}


/* =========================================
   QUANTITY
========================================= */

function changeProductQuantity(amount) {

    modalQuantity += amount;


    if (modalQuantity < 1) {

        modalQuantity = 1;

    }


    if (modalQuantity > 10) {

        modalQuantity = 10;

    }


    updateModalQuantity();

}


function updateModalQuantity() {

    const quantity =
        document.getElementById(
            "productQuantity"
        );


    if (quantity) {

        quantity.textContent =
            modalQuantity;

    }

}


/* =========================================
   ADD TO CART
   EXACTLY ONCE
========================================= */

function addModalProductToCart(event) {

    if (event) {

        event.preventDefault();

        event.stopPropagation();

    }


    /* Prevent double click */

    if (addingProduct) {

        return;

    }


    addingProduct = true;


    const product = {

        id:
            "premium-sports-shoes-" +
            selectedProductSize,

        name:
            "Premium Sports Shoes",

        price:
            2199,

        image:
            "../images/sports-shoes-1.jpg",

        size:
            selectedProductSize,

        quantity:
            modalQuantity

    };


    /* ===============================
       GET CART
    =============================== */

    let cart = [];


    try {

        cart =
            JSON.parse(
                localStorage.getItem(
                    "shopzoneCart"
                )
            ) || [];

    }

    catch (error) {

        cart = [];

    }


    /* ===============================
       FIND PRODUCT
    =============================== */

    const existingProduct =
        cart.find(function(item) {

            return (
                item.id === product.id
            );

        });


    if (existingProduct) {

        existingProduct.quantity =
            Number(
                existingProduct.quantity
            ) +
            product.quantity;

    }

    else {

        cart.push(product);

    }


    /* ===============================
       SAVE ONLY ONCE
    =============================== */

    localStorage.setItem(
        "shopzoneCart",
        JSON.stringify(cart)
    );


    /* ===============================
       UPDATE BADGE
    =============================== */

    updateShopZoneCartCount();


    /* ===============================
       BUTTON SUCCESS
    =============================== */

    const button =
        document.getElementById(
            "modalAddCartBtn"
        );


    if (button) {

        button.innerHTML =
            '<i class="fa-solid fa-check"></i> Added to Cart';

        button.disabled = true;

    }


    /* Close after 800ms */

    setTimeout(function() {

        closeProductPopup();

        if (button) {

            button.innerHTML =
                '<i class="fa-solid fa-cart-shopping"></i> Add to Cart';

            button.disabled = false;

        }


        addingProduct = false;

    }, 800);

}


/* =========================================
   CART BADGE
========================================= */

function updateShopZoneCartCount() {

    let cart = [];


    try {

        cart =
            JSON.parse(
                localStorage.getItem(
                    "shopzoneCart"
                )
            ) || [];

    }

    catch (error) {

        cart = [];

    }


    let count = 0;


    cart.forEach(function(item) {

        count +=
            Number(
                item.quantity
            ) || 0;

    });


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            count;

    }

}


/* =========================================
   WISHLIST
========================================= */

function addModalProductToWishlist(event) {

    if (event) {

        event.preventDefault();

        event.stopPropagation();

    }


    const product = {

        id:
            "premium-sports-shoes",

        name:
            "Premium Sports Shoes",

        price:
            2199,

        image:
            "../images/sports-shoes-1.jpg",

        category:
            "Shoes"

    };


    let wishlist = [];


    try {

        wishlist =
            JSON.parse(
                localStorage.getItem(
                    "shopzoneWishlist"
                )
            ) || [];

    }

    catch (error) {

        wishlist = [];

    }


    /* Check duplicate */

    const exists =
        wishlist.some(function(item) {

            return (
                item.id === product.id
            );

        });


    if (exists) {

        showPopupMessage(
            "❤️ Product already in Wishlist"
        );

        return;

    }


    wishlist.push(product);


    localStorage.setItem(
        "shopzoneWishlist",
        JSON.stringify(wishlist)
    );


    const button =
        document.getElementById(
            "modalWishlistBtn"
        );


    if (button) {

        button.innerHTML =
            '<i class="fa-solid fa-heart"></i> Added to Wishlist';

        button.classList.add(
            "wishlist-added"
        );

    }


    showPopupMessage(
        "❤️ Product added to Wishlist"
    );

}


/* =========================================
   SMALL MESSAGE
========================================= */

function showPopupMessage(message) {

    alert(message);

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeProductPopup();

        }

    }
);
