// ================================
// FRESHMART GROCERY STORE
// SCRIPT PART 1
// ================================

// CART
let cart = [];

// LOGIN DATA
let currentUser = null;

// ELEMENTS
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

const userBox = document.getElementById("userBox");
const userName = document.getElementById("userName");

const loginNow = document.getElementById("loginNow");
const signupNow = document.getElementById("signupNow");

const closeBtn = document.querySelector(".close");
const closeSignup = document.querySelector(".closeSignup");

const showSignup = document.getElementById("showSignup");


// ================================
// OPEN LOGIN
// ================================

loginBtn.addEventListener("click", () => {

    loginModal.style.display = "block";

});


// ================================
// CLOSE LOGIN
// ================================

closeBtn.onclick = () => {

    loginModal.style.display = "none";

};


// ================================
// OPEN SIGNUP
// ================================

showSignup.onclick = () => {

    loginModal.style.display = "none";

    signupModal.style.display = "block";

};


// ================================
// CLOSE SIGNUP
// ================================

closeSignup.onclick = () => {

    signupModal.style.display = "none";

};


// ================================
// SIGNUP
// ================================

signupNow.addEventListener("click", () => {

    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    if(name==="" || email===""){

        alert("Please fill all fields.");

        return;

    }

    const user = {

        name:name,

        email:email

    };

    localStorage.setItem("freshmartUser",
    JSON.stringify(user));

    alert("Signup Successful ✅");

    signupModal.style.display="none";

});


// ================================
// LOGIN
// ================================

loginNow.addEventListener("click",()=>{

    const name=
    document.getElementById("loginName").value.trim();

    const email=
    document.getElementById("loginEmail").value.trim();

    const savedUser=
    JSON.parse(localStorage.getItem("freshmartUser"));

    if(!savedUser){

        alert("Please Signup First.");

        return;

    }

    if(

        name===savedUser.name &&

        email===savedUser.email

    ){

        currentUser=savedUser;

        localStorage.setItem("loggedIn","true");

        loginBtn.style.display="none";

        userBox.style.display="flex";

        userName.innerHTML="👋 "+savedUser.name;

        loginModal.style.display="none";

        alert("Welcome "+savedUser.name);

    }

    else{

        alert("Wrong Name or Email");

    }

});


// ================================
// LOGOUT
// ================================

logoutBtn.addEventListener("click",()=>{

    localStorage.removeItem("loggedIn");

    currentUser=null;

    loginBtn.style.display="inline-block";

    userBox.style.display="none";

    alert("Logged Out");

});


// ================================
// AUTO LOGIN
// ================================

window.addEventListener("load",()=>{

    const loggedIn=

    localStorage.getItem("loggedIn");

    const savedUser=

    JSON.parse(localStorage.getItem("freshmartUser"));

    if(loggedIn && savedUser){

        loginBtn.style.display="none";

        userBox.style.display="flex";

        userName.innerHTML="👋 "+savedUser.name;

        currentUser=savedUser;

    }

});
// ======================================
// ADD TO CART
// ======================================

const addButtons =
document.querySelectorAll(".add-to-cart");

const cartItems =
document.getElementById("cart-items");

const totalPrice =
document.getElementById("total-price");

const cartCount =
document.getElementById("cart-count");

let total = 0;


// ==============================
// UPDATE CART
// ==============================

function updateCart(){

    cartItems.innerHTML="";

    total=0;

    cartCount.innerHTML=cart.length;

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        const div=document.createElement("div");

        div.className="cart-item";

        div.innerHTML=`

        <div>

        <h3>${item.name}</h3>

        <p>

        Quantity :
        ${item.quantity}

        </p>

        </div>

        <div>

        <strong>

        $${(item.price*item.quantity).toFixed(2)}

        </strong>

        <br><br>

        <button
        onclick="removeItem(${index})">

        Remove

        </button>

        </div>

        `;

        cartItems.appendChild(div);

    });

    totalPrice.innerHTML=total.toFixed(2);

}



// ==============================
// ADD PRODUCT
// ==============================

addButtons.forEach(button=>{

button.addEventListener("click",()=>{

const card=

button.parentElement;

const productName=

card.querySelector("h3").innerText;

const productPrice=

parseFloat(

card.querySelector(".price")

.innerText.replace("$","")

);

const qty=

parseInt(

card.querySelector(".quantity").value

);

cart.push({

name:productName,

price:productPrice,

quantity:qty

});

updateCart();

alert(productName+" Added To Cart 🛒");

});

});




// ==============================
// REMOVE PRODUCT
// ==============================

function removeItem(index){

cart.splice(index,1);

updateCart();

}
// ======================================
// SEARCH PRODUCTS
// ======================================

const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const value = searchInput.value.toLowerCase();

const cards = document.querySelectorAll(".product-card");

cards.forEach(card=>{

const name = card.querySelector("h3").innerText.toLowerCase();

if(name.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}


// ======================================
// CHECKOUT
// ======================================

const checkoutBtn=document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click",()=>{

if(cart.length===0){

alert("🛒 Your cart is empty!");

return;

}

if(currentUser==null){

alert("⚠ Please Login First.");

loginModal.style.display="block";

return;

}

alert(

"🎉 Order Placed Successfully!\n\nThank You "+currentUser.name

);

cart=[];

updateCart();

});


// ======================================
// CLOSE POPUP
// ======================================

window.onclick=function(e){

if(e.target==loginModal){

loginModal.style.display="none";

}

if(e.target==signupModal){

signupModal.style.display="none";

}

};


// ======================================
// ENTER KEY LOGIN
// ======================================

document.addEventListener("keydown",function(e){

if(e.key==="Enter"){

if(loginModal.style.display==="block"){

loginNow.click();

}

}

});


// ======================================
// TOAST MESSAGE
// ======================================

function showToast(message){

const toast=document.createElement("div");

toast.innerText=message;

toast.style.position="fixed";

toast.style.bottom="30px";

toast.style.right="30px";

toast.style.background="#3cb815";

toast.style.color="#fff";

toast.style.padding="15px 25px";

toast.style.borderRadius="10px";

toast.style.fontWeight="600";

toast.style.boxShadow="0 10px 25px rgba(0,0,0,.2)";

toast.style.zIndex="99999";

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},2500);

}


// ======================================
// CHANGE ALERT TO TOAST
// ======================================

document.querySelectorAll(".add-to-cart").forEach(btn=>{

btn.addEventListener("click",()=>{

showToast("✅ Product Added Successfully");

});

});