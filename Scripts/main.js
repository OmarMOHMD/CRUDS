let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

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
        total.style.background = '#2E1B7B';
    }
}

//Create product

let dataPro;
if(localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
}else {
    dataPro = [];
}

//To Save data in it to edit, delete, push data loop data

submit.onclick = function() {
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

//Count
    if(title.value != '' && price.value != '' && newPro.count < 200){
            if(mood === 'create'){    
        if(newPro.count > 1) {
        for(let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
        }
    } else {
        dataPro.push(newPro);
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';
    }
                clearData()
} 
    }
else {
    dataPro[tmp] = newPro;
}   

    //Save localStorage

    localStorage.setItem('product', JSON.stringify(dataPro));
    showData()

// Add sound when clicking a btn “how to add sound onclick in html” Code Answer

    // var audio = new Audio("../Finger Snap2.wav");
    // submit.onclick = function () {
    //     audio.play()
    // }
    // audio.play()
    
}

//Clear inputs when user finish create

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.value = '';
    count.value = '';
    category.value = '';
}

//Read 

function showData() {
    getTotal()
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].count}</td>
                    <td class="category_hide">${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()"><img src="./images/garbage.png" alt="image garbage delete all items">
        Delete All (${dataPro.length})</button>
        `
    }else {
        btnDelete.innerHTML = '';
    }
}
showData()


//Delete

function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    // alert('Permanently delete all products!!');
    localStorage.clear()
    dataPro.splice(0);
    showData();
}

//Update

function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior: 'smooth',
    })
}

//Search

let searchMood = 'title';
function getSearch(id) {
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
    }else {
        searchMood = 'category'
    }
        search.placeholder = 'Search By '+ searchMood;
    search.focus()
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++){
    if(searchMood == 'title'){
        
            if (dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].count}</td>
                    <td class="category_hide">${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                </tr>
        `;
            }
        
    }

    else {
        if (dataPro[i].category.includes(value.toLowerCase())) {
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].count}</td>
                    <td class="category_hide">${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                </tr>
        `;
        }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

//Clean Data



