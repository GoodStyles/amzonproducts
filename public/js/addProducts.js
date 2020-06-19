const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, msg) => {
  hideAlert();
  const markUp = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markUp);
  window.setTimeout(hideAlert, 1000);
};


const addProduct = async (product, productBy, productName, price, imageCover, ratings, ratingsQuantity, link) => {
  try {
    const res = await axios({
      method: "POST",
      url: `https://goodstyles.herokuapp.com/addproducts/${product}`,
      data: { 
        productBy, 
        productName,
        price, 
        imageCover, 
        ratings, 
        ratingsQuantity, 
        link
      },
    });
    console.log(res)
    if (res.data.status === "Success") {
      showAlert("success", `Successfully product is added to ${product} category!`);
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
    console.log(res);
  } catch (err) {
    showAlert("error", err);
  }
};

const addProductForm = document.querySelector(".addproduct-form");

if (addProductForm) {
  addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const product = document.getElementById("sel1").value;
    const productBy = document.getElementById("productBy").value;
    const productName = document.getElementById("productName").value;
    const price = document.getElementById("price").value;
    const imageCover = document.getElementById("imageCover").value;
    const ratings = document.getElementById("ratings").value;
    const ratingsQuantity = document.getElementById("ratingsQuantity").value;
    const link = document.getElementById("link").value;
    addProduct(product, productBy, productName, price, imageCover, ratings, ratingsQuantity, link);
  });
}

