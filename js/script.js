var titleInput = document.getElementById("prodTitle");
var priceInput = document.getElementById("prodPrice");
var categoryInput = document.getElementById("prodCategory");
var imageInput = document.getElementById("prodImage");
var descInput = document.getElementById("prodDesc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var search = document.getElementById("prodSearch");
var localStorageKey = "allProducts";

var productList = [];
if (JSON.parse(localStorage.getItem(localStorageKey))) {
    productList = JSON.parse(localStorage.getItem(localStorageKey));
    displayProduct(productList);
}

function localStorageData() {
    localStorage.setItem(localStorageKey, JSON.stringify(productList));
}

function addProduct() {
    var product = {
        title: titleInput.value,
        price: priceInput.value,
        category: categoryInput.value,
        image: `../images/${imageInput.files[0]?.name}`,
        description: descInput.value
    };
    productList.push(product);
    localStorageData()
    console.log(productList);
    clearForm()
    displayProduct(productList);

}


function clearForm(product) {
    titleInput.value = product ? product.title : "";
    priceInput.value = product ? product.price : "";
    categoryInput.value = product ? product.category : "";
    descInput.value = product ? product.description : "";
    imageInput.files[0].name = product? product.image:"";
}

function displayProduct(arr, originalArr) {
    let bBox = '';
    if (arr.length === 0) {
        bBox = '<div class="col-12 text-center text-danger border border-3 p-5 fs-1"><p>No Products</p></div>';
    } else {
    for (var i = 0; i < arr.length; i++) {
        let originalIndex = originalArr ? originalArr[i] : i;
        bBox += `<div class="col-lg-3 col-md-3 col-sm-6">
        <div class="product bg-light py-3 rounded-3">
          <img src="${arr[i].image}" class="img-fluid mb-3" alt="">
          <h3>${arr[i].newTitle ? arr[i].newTitle : arr[i].title}</h3>
          <div class="d-flex justify-content-between mb-2">
            <span>${arr[i].category}</span>
            <span>${arr[i].price}</span>
          </div>
          <p>${arr[i].description}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-outline-danger" onclick="deleteProduct(${originalIndex})">Delete</button>
            <button class="btn btn-outline-success" onclick="editProduct(${originalIndex})">Edit</button>
          </div>
        </div>
      </div>`;
    }
    }
    document.getElementById("products").innerHTML = bBox;
}


function deleteProduct(deletedIndex) {
    productList.splice(deletedIndex, 1)
    localStorageData();
    displayProduct(productList);
}



function editProduct(EditedProduct) {
    clearForm(productList[EditedProduct]);
    // titleInput.value = productList[EditedProduct].title;
    // priceInput.value = productList[EditedProduct].price;
    // categoryInput.value = productList[EditedProduct].category;
    // descInput.value = productList[EditedProduct].description;
    //imageInput.files[0].name = productList[EditedProduct].image;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    updateBtn.setAttribute("data-index", EditedProduct);

}

function updateProduct() {
    const updatedIndex = updateBtn.getAttribute("data-index");
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

    productList[updatedIndex].title = titleInput.value;
    productList[updatedIndex].price = priceInput.value;
    productList[updatedIndex].category = categoryInput.value;
    productList[updatedIndex].description = descInput.value;
    productList[updatedIndex].image = `../images/${imageInput.files[0]?.name}`;
    
    localStorageData()
    displayProduct(productList);
    clearForm();

}


function searchProd() {
    var matchedProducts = [];
    var originalArr = [];
    var keyword = search.value;
    
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].title.toLowerCase().includes(keyword.toLowerCase())) {
            matchedProducts.push(productList[i]);
            originalArr.push(i);

            productList[i].newTitle = productList[i].title.toLowerCase()
                .replace(keyword.toLowerCase(), `<span class='text-danger'>${keyword.toLowerCase()}</span>`);
        }
    }
    if (matchedProducts.length === 0) {
        displayProduct([], []);
        document.getElementById("products").innerHTML = '<div class="col-12 text-center text-danger border border-3 p-5 fs-1"><p>Not Found</p></div>';
    } else {
        displayProduct(matchedProducts, originalArr);
    }
}


function validation(validated) {
    var regex = {
        prodTitle: /^[A-Z][a-z]{2,10}$/,
        prodPrice: /^([6-9][0-9]{3}|[1-9][0-9]{4})$/,
        prodCategory: /TV|Mobile|Screens|Watches|Electronics/,
        prodDesc: /^[a-zA-Z]{0,255}$/

    }
    var isValid = regex[validated.id].test(validated.value);
    if (isValid) {
        validated.classList.replace("is-invalid", "is-valid");
        validated.nextElementSibling.classList.replace("d-block", "d-none");
    } else {
        if (validated.classList.contains("is-valid")) {
            validated.classList.replace("is-valid", "is-invalid");
        } else {
            validated.classList.add("is-invalid");
        }
        validated.nextElementSibling.classList.replace("d-none", "d-block");

    }

}