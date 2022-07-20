let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

// Get total
function getTotal() {
    if(price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        //the plus sign(+) inTheLeftOfVariable is converting the default dataType string to a number so we can deal with a number, make calculations on it
        total.innerHTML = result;
        total.style.background = '#7D7D7D';
    }
    else {
        total.innerHTML = '';
        total.style.background = 'rgb(255,0,0)';
    }
}

//Create product
let dataProd = [];//To Save data in it to edit, delete, push data loop data
submit.onclick = function() {
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    console.log(newPro);
}

//Save localStorage

//Clear inputs when user finish create

//Read 

//Count

//Delete

//Update

//Search

//Clean Data