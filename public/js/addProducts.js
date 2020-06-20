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


const addProduct = async (product, data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `https://goodstyles.herokuapp.com/addProduct/${product}`,
      data,
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
    const form = new FormData()

    form.append("productBy", document.getElementById("productBy").value);
    form.append("productName", document.getElementById("productName").value);
    form.append("price", document.getElementById("price").value);
    form.append("imageCover", document.getElementById("imageCover").files[0]);
    form.append("ratings", document.getElementById("ratings").value);
    form.append("ratingsQuantity", document.getElementById("ratingsQuantity").value);
    form.append("link", document.getElementById("link").value);
    addProduct(product, form, 'data');
  });
}