// imgSlide();
// alert(Handlebars)
var shoes = [{
        color: "red",
        price: 400,
        in_stock: 6,
        brand: "Puma",
        size: 7
    },
    {
        color: "blue",
        price: 300,
        in_stock: 7,
        brand: "Adidas",
        size: 6
    },
    {
        color: "black",
        price: 900,
        in_stock: 8,
        brand: "Sketchers",
        size: 5
    },
    {
        color: "brown/black",
        price: 500,
        in_stock: 5,
        brand: "Catapillar",
        size: 4
    },
    {

          color: "suede",
          price: 1500,
          in_stock: 8,
          brand: "Jordan",
          size: 6
    },
];

//
// function imgSlide() {
//   'use strict';
//   var mySlides = document.getElementsByClassName('slides');
//   for (var i = 0; i < mySlides.length; i++) {
//     mySlides[i].style.display = 'none';
//   }
//   slider++;
//   if (slider > mySlides.length) {
//     slider = 1;
//   }
//   mySlides[slider - 1].style.display = 'inline-block';
//   setTimeout(imgSlide, 2000);
// }

//generate handlebars templates
var source = document.getElementById('colorList').innerHTML;
var source2 = document.getElementById('sizeList').innerHTML;
var source3 = document.getElementById('brandList').innerHTML;
var template = Handlebars.compile(source);
var template2 = Handlebars.compile(source2);
var template3 = Handlebars.compile(source3);

//get comboboxes
var selectedColor = document.getElementById('selectColor');
var selectedSize = document.getElementById('selectSize');
var selectedBrand = document.getElementById('selectBrand');

//select html elements
var searchButton = document.getElementById('searchBTN');
var addButton = document.getElementById('addBTN');
var ul = document.querySelector('.ul');

var sourceResults = document.getElementById('outputItems').innerHTML;
var templateResults = Handlebars.compile(sourceResults);

//select image div element
var image = document.querySelector('.shoeIMG');
var display = document.querySelector('.searchResults');

//colorComboBox.innerHTML = template(shoes[0]);
window.onload = function() {
    populateElements();
}

function populateElements() {
    for (var i = 0; i < shoes.length; i++) {
        //create elements
        var optionColor = document.createElement('option');
        var optionSize = document.createElement('option');
        var optionBrand = document.createElement('option');

        optionColor.innerHTML = template(shoes[i]);
        optionSize.innerHTML = template2(shoes[i]);
        optionBrand.innerHTML = template3(shoes[i]);

        selectedColor.appendChild(optionColor);
        selectedSize.appendChild(optionSize);
        selectedBrand.appendChild(optionBrand);
    }
}



//Search Button
searchButton.addEventListener('click', function() {
    //clear unordered list
    ul.innerHTML = "";
    //get values from respective functions
    var inStock = checkForStock();
    var getPrice = checkForPrice();

    var storeOutput = [inStock, getPrice];

    if (storeOutput[1] === "N/A") {
        display.classList.remove('active');
        display.className += ' imageOutOfStock';
        ul.style.display = "none";
    } else {
        display.classList.remove('imageOutOfStock');
        ul.style.display = "block";
        display.className += ' active';
    };



    var searchResults = [{
        img: image,
        brand: selectedBrand.value,
        in_stock: inStock,
        price: getPrice,
        size: selectedSize.value,
        color: selectedColor.value
    }];


    ul.innerHTML = templateResults(searchResults[0]);
}, false);



function checkForPrice() {
    //empty object to store stock
    var priceMap = {};

    //get the size, color user selected
    var getColor = selectedColor.value;
    var getSize = parseInt(selectedSize.value);
    var getBrand = selectedBrand.value;

    //loop through data object
    for (var i = 0; i < shoes.length; i++) {
        //save object values in variables
        var shoeList = shoes[i];
        var size = shoeList.size;
        var color = shoeList.color;
        var stock = shoeList.in_stock;
        var brand = shoeList.brand;
        var price = shoeList.price;


        //check the color that has been selected
        if (color === getColor && size === getSize && brand === getBrand) {

            //check if the value is undefined
            if (priceMap[price] === undefined) {
                priceMap[price] = 0;
            }
            //add value to object
            priceMap[price] = +1;
        }
    }


    //loop through object
    for (var y in priceMap) {
        var itemPrice = y;
    }

    if (itemPrice === undefined) {
        return 'N/A'
    } else {
        return itemPrice;
    }
}

function checkForStock() {
    //empty object to store stock
    var stockMap = {};

    //get the size, color user selected
    var getColor = selectedColor.value.toLowerCase();
    var getSize = parseInt(selectedSize.value);
    var getBrand = selectedBrand.value;

    //loop through data object
    for (var i = 0; i < shoes.length; i++) {
        //save object values in variables
        var shoeList = shoes[i];
        var size = shoeList.size;
        var color = shoeList.color;
        var stock = shoeList.in_stock;
        var brand = shoeList.brand;
        var price = shoeList.price;

        // console.log(stock);

        //check the color that has been selected
        if (brand === getBrand) {
            //check if the value is undefined
            if (stockMap[stock] === undefined) {
                stockMap[stock] = 0;
            }
            //add value to object
            stockMap[stock] = +1;
        }
    }
  //loop through object
    for (var x in stockMap) {
        //save the stock in variable
        var inStock = x;
    }

    if (inStock === undefined) {
        return 'Out Of Stock'
    } else {
        return inStock;
    }
}


var addedColor = document.getElementById('addedColor');
var addedBrand = document.getElementById('addedBrand');
var addedSize = document.getElementsByName('addedSize');
var addedPrice = document.getElementById('addedPrice');
var addedStock = document.getElementById('addedStock');
var showModalBTN = document.getElementById('modalActive');
var modal = document.querySelector('.container2');
var closeModal = document.querySelector('.close');
var form = document.querySelector('.addingData');
var successForm = document.querySelector('.success');
var successBTN = document.getElementById('successBTN');
// var errorAlert = document.querySelector('.errorAlert');
// var errorMessage = document.getElementById('errorMessage');

//show modal
showModalBTN.addEventListener('click', function() {
    modal.classList.remove("inactiveModal");
    form.classList.remove("inactiveForm");
    form.classList.add('formActive');
    modal.classList.add("activeModal");
});

closeModal.addEventListener('click', function() {
    hideModal();
    form.classList.add('inactiveForm');
    form.classList.remove('formActive');
    clearInput();
});

successBTN.addEventListener('click', function() {
    hideModal();
    success();
    successForm.classList.remove('formActive');
});


//validations
function validations() {
    if (addedBrand.value === "" || isNaN(addedBrand.value) === false) {
        //return error
        errorMessage.innerHTML = 'Brand Value Not A String or Is Empty. Please Try Again!';
        return true;
    } else {
        return false;
    }

    if (addedColor.value === "" || isNaN(addedColor.value) === false) {
        return error
        errorMessage.innerHTML = 'Color Value Not A String or Is Empty. Please Try Again!';
        return true;
    } else {
        return false;
    }

    if (addedPrice.value === "" || isNaN(addedPrice.value) === true) {
        return error
        errorMessage.innerHTML = 'Price Value Not A Number or Is Empty. Please Try Again!';
        return true;
    } else {
        return false;
    }

    if (addedStock.value === "" || isNaN(addedStock.value) === true) {
        return error
        errorMessage.innerHTML = 'Stock Value Not A Number or Is Empty. Please Try Again!';
        return true;
    } else {
        return false;
    }
}

//Add new Item Button
addButton.addEventListener('click', function() {
    var addedSizeSelect = 0;

    for (var i = 0; i < addedSize.length; i++) {
        if (addedSize[i].selected === true) {
            addedSizeSelect = addedSize[i].value;
        }
    }

    var errorPickedUP = validations();

    if (errorPickedUP === false) {
        //add data to object
        var data = {
            brand: addedBrand.value,
            color: addedColor.value,
            size: parseInt(addedSizeSelect),
            price: parseFloat(addedPrice.value),
            in_stock: addedStock.value
        };

        repopulateElements(data);

        success();

        clearInput();
    } else {
        failure();
        setInterval(function() {
            stopFailureMessage();
        }, 6000);
    }
});

function repopulateElements(newItem) {
    //create elements
    var optionColor = document.createElement('option');
    var optionSize = document.createElement('option');
    var optionBrand = document.createElement('option');

    var colorResult = false;
    var brandResult = false;
    var sizeResult = false;

    for (var i = 0; i < shoes.length; i++) {
        if (shoes[i].color === newItem.color) {
            colorResult = true;
        }

        if (shoes[i].brand === newItem.brand) {
            brandResult = true;
        }

        if (shoes[i].size === newItem.size) {
            sizeResult = true;
        }
    }


    if (colorResult !== true) {
        optionColor.innerHTML = newItem.color;
        selectedColor.appendChild(optionColor);
    }


    if (brandResult !== true) {
        optionBrand.innerHTML = newItem.brand;
        selectedBrand.appendChild(optionBrand);
    }

    if (sizeResult !== true) {
        optionSize.innerHTML = newItem.size;
        selectedSize.appendChild(optionSize);
    }

    shoes.push(newItem);
}


function hideModal() {
    modal.classList.add("inactiveModal");
    modal.classList.remove("activeModal");

}

function success() {
    form.classList.add('inactiveForm');
    form.classList.remove('formActive');
    successForm.classList.add('formActive');
}
//
// function failure() {
//     errorAlert.classList.add('errorDisplay');
// }
//
// function stopFailureMessage() {
//     errorAlert.classList.remove('errorDisplay');
// }

function clearInput() {
    addedBrand.value = "";
    addedColor.value = "";
    addedSize[0].selected = true;
    addedPrice.value = "";
    addedStock.value = "";
}
//
// var btn = document.querySelector('.display');
// var searchRes =  document.querySelector('.output-zone');
// var sizes = document.querySelector('.size');
// var color = document.querySelector('.color');
// var releaseDates = document.querySelector('.dateRel');
// var brands = document.querySelector('.brand');
// var sBtn = document.querySelector('.searchChange');
// var filters = document.getElementsByName('filter');
// var stockAddPara = document.querySelector('.stockP');
//
//
// var newBrand = document.querySelector('#newBrand');
// var newColor = document.querySelector('#newColor');
// var newRelDate = document.querySelector('#newRelDate');
// var newPrice = document.querySelector('#newPrice');
// var newSizes = document.querySelector('#newSizes');
// var tBtn = document.querySelector('.addStock');
// var sizeFormat = document.querySelector('#askAboutSize');
//
// // sizeFormat.addEventListener('mouseover', alert('Add the amount of shoes in each size (starting with size 1) separated by commas. For example, if there are 3 pairs in size 1, 4 in size 2 and 8 in size 3 the input would be: 3,4,8'))
//
// function hideShow(){
//   counter ++;
//   if (counter % 2 == 0 || counter == 0){
//   stockAddPara.style.visibility = 'hidden'
// }
// else{
//   stockAddPara.style.visibility = "visible"
// }
// };
//
// var counter = 0;
//
// var newColorOption = document.getElementById('newColorOption').innerHTML;
// var template2 = Handlebars.compile(newColorOption);
//
// var newBrandOption = document.getElementById('newBrandOption').innerHTML;
// var template3 = Handlebars.compile(newBrandOption);
//
//
// // tBtn.addEventListener('click', function(){
// //   var colorOptions = document.querySelectorAll('.colorOptions');
// //   var brandOptions = document.querySelectorAll('.brandOptions');
// //   var dateRelOptions = document.querySelectorAll('.dateRelOptions');
// //   var colorArray = [];
// //   var brandArray = [];
// //   var dateRelArray = [];
// //
// //   for (var i=0;i<colorOptions.length;i++){
// //     if (colorOptions[i].value == newColor.value.toLowerCase()){
// //       colorArray.push(colorOptions[i].value);
// //     }
// //   };
// //  if (colorArray.length == 0){
// //
// // var newColorChoice = template2({
// //   newColorHandle : newColor.value.toLowerCase(),
// //   newColorHandleMenu : newColor.value.substr(0,1).toUpperCase() + newColor.value.substr(1).toLowerCase()
// // })
// // color.innerHTML += newColorChoice;
// //  }
// //
// //  for (var i=0;i<brandOptions.length;i++){
// //    if (brandOptions[i].value == newBrand.value){
// //      colorArray.push(colorOptions[i].value);
// //    }
// //  };
// // if (brandArray.length == 0){
// // var newBrandChoice = template3({
// //  newBrandHandle : newBrand.value.substr(0,1).toUpperCase() + newBrand.value.substr(1).toLowerCase(),
// //  newBrandHandleMenu : newBrand.value.substr(0,1).toUpperCase() + newBrand.value.substr(1).toLowerCase()
// // });
// // brands.innerHTML += newBrandChoice;
// // };
// //
// //
// //   var sizeArr = newSizes.value.split(',');
// //   var newStockItem = {
// //     color : newColor.value.toLowerCase(),
// //     price : newPrice.value,
// //     brand: newBrand.value.substr(0,1).toUpperCase() + newBrand.value.substr(1).toLowerCase(),
// //     releaseDate: newRelDate.value,
// //     size: sizeArr
// //   };
// //   shoes.push(newStockItem);
// //   newColor.value = "";
// //   newPrice.value = "";
// //   newBrand.value = "";
// //   newRelDate.value = "";
// //   newSizes.value = "";
// //
// //
// // });
//
// function isColor(stock){
//   return stock.color == color.value;
// }
// function isBrand(stock){
//   return stock.brand == brands.value;
// }
//
// function isReleaseDate(stock){
//   return stock.releaseDate == releaseDates.value;
//
// }
//
// var tableDsgn = document.getElementById('table').innerHTML;
// var template = Handlebars.compile(tableDsgn);
//
// btn.addEventListener('click', function(){
//   var sizeChosen = sizes.value;
//
//   Handlebars.registerHelper('sizeIng', function(finalArray) {
//     r value=""eturn finalArray[sizeChosen];
//   });
//
//   var sizeNotString = Number(sizeChosen);
//   var actualSize = sizeNotString+1;
//
//   if (sizeChosen !== 'notSize'){
//   if (color.value !== 'notOption'){
//     var filter1 = shoes.filter(isColor);
//   }
//   else{filter1 = shoes};
//   if (brands.value !== 'notOption'){
//     var filter2 = filter1.filter(isBrand);
//   }
//   else { var filter2 = filter1};
//   if (releaseDates.value !== 'notOption'){
//   var filter3 = filter2.filter(isReleaseDate)}
//   else { var filter3 = filter2
//   }
//   for (var i=0; i<filter3.length; i++){
//   var sizeChosenHandle = filter3[i].size[sizeChosen];
// };
// console.log(sizeChosenHandle)
//       var shoeTable = template({
//         size : actualSize,
//         filter3,
//       });
//       searchRes.innerHTML = shoeTable;
//   }
// else{
//   alert('Please choose a size!')
// }
//
// });
