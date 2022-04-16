const createElement = function (elName, className, textContent) {
    const createdElement = document.createElement(elName);
    createdElement.className = className;
    if (textContent) {
        createdElement.textContent = textContent;
    }
    return createdElement;
}
const addZero = function (number) {
    return number < 10 ? "0" + number : number;
}

const showDate = function (dateString) {
    const date = new Date(dateString);

    return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${addZero(date.getFullYear())}`;
}


const parrotsTable = document.querySelector(".parrots");
const addParrotsModal = new bootstrap.Modal(document.querySelector("#add-parrot-modal"));
const renderParrot = function (parrot) {
    const {
        id,
        title,
        img,
        price,
        birthDate,
        sizes,
        isFavorite,
        features
    } = parrot;

    const parrotsTemplate = document.querySelector(".template");
    const parrotsItem = parrotsTemplate.content.cloneNode(true);
    const parrotsImg = parrotsItem.querySelector(".parrots__img");
    parrotsImg.src = img;
    const parrotsTitle = parrotsItem.querySelector(".parrots__title");
    parrotsItem.querySelector(".parrots__title").textContent = title;
    const parrotsMark = parrotsItem.querySelector(".parrots__mark");
    parrotsItem.querySelector(".parrots__mark").textContent = `${"$" + price}`;
    const parrotsSubtitle = parrotsItem.querySelector(".parrots__subtitle");
    parrotsItem.querySelector(".parrots__subtitle").textContent = `${sizes.height + "sm"} x ${sizes.width + "sm"}`;
    const parrotsDate = parrotsItem.querySelector(".parrots__date");
    parrotsItem.querySelector(".parrots__date").textContent = showDate(birthDate);
    const parrotsDeleteBtn = parrotsItem.querySelector(".parrots__del-btn");
    parrotsDeleteBtn.setAttribute("data-id", id);
    const parrotsStarsBtn = parrotsItem.querySelector(".parrots__star-btn");
    parrotsStarsBtn.setAttribute("data-star", id);
    const parrotsEditBtn = parrotsItem.querySelector(".parrots__edit-btn");
    parrotsEditBtn.setAttribute("data-edit", id);
    const parrotsFeatures = parrotsItem.querySelector(".benefits");
    parrotsItem.querySelector(".parrots__list-item").textContent = features;
    
    return parrotsItem;
};

const elCount = document.querySelector(".count");
let showingParrots = products.slice();

const renderParrots = function () {

    parrotsTable.innerHTML = "";

    elCount.textContent = `Count: ${showingParrots.length}`;
    const parrotsFragment = document.createDocumentFragment();
    showingParrots.forEach(function (parrot) {

        const elParrots = renderParrot(parrot);
        parrotsFragment.append(elParrots);
    })
    parrotsTable.append(parrotsFragment);
};


const addInput = document.querySelector("#features");
let addOption = [];
addInput.addEventListener("input", function () {

    const addSplitedValue = addInput.value.trim().split(" ");

    if (addSplitedValue.length === 2) {
        addOption.push(addSplitedValue[0]);
        addInput.value = "";
    }
});

const addForm = document.querySelector("#add-form");
addForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const elements = evt.target.elements;

    const addParrotTitle = elements.title;
    const addParrotImg = elements.img;
    const addPrice = elements.price;
    const addDate = elements.date;
    const addHeight = elements.width;
    const addWidth = elements.height;
    const addFeatures = elements.features;

    const titleValue = addParrotTitle.value;
    const imgValue = addParrotImg.value;
    const priceValue = addPrice.value;
    const dateValue = addDate.value;
    const heightValue = addHeight;
    const widthValue = addWidth.value;
    const featuresValue = addFeatures.value;

    if (titleValue.trim() && imgValue && priceValue && dateValue && heightValue && widthValue) {
        const NewParrot = {
            id: Math.floor(Math.random() * 1000),
            title: titleValue,
            img: String(imgValue),
            price: priceValue,
            birthDate: dateValue,
            sizes: {
                width: widthValue,
                height: heightValue
            },
            features: addOption
        }
        products.push(NewParrot);
        showingParrots.push(NewParrot);
        renderParrots();
    }
    addParrotsModal.hide();
    addForm.reset();
});

const editTitle = document.querySelector("#edit-parrot-title");
const editImg = document.querySelector("#edit-parrot-img");
const editPrice = document.querySelector("#edit-price");
const editDate = document.querySelector("#edit-parrot-date");
const editWidth = document.querySelector("#edit-parrot_width");
const editHeight = document.querySelector("#edit-parrot_height");
const editfeatures = document.querySelector("#edit-features");

parrotsTable.addEventListener("click", function (evt) {


    if (evt.target.matches(".parrots__del-btn")) {
        const deleteId = +evt.target.dataset.id;

        const deleteItem = products.findIndex(function (parrots) {
            return parrots.id === deleteId;
        })
        const deleteShowItem = showingParrots.findIndex(function (showingParrot) {
            return showingParrot.id === deleteId;
        });
        products.splice(deleteItem, 1);
        showingParrots.splice(deleteShowItem, 1);
    } else if (evt.target.matches("parrots__star-btn")) {
        const startId = +evt.target.dataset.star;
        const starItem = products.find(function(parrots) {
        return parrots.id === startId;
    });
       
    }
    else if (evt.target.matches(".parrots__edit-btn")) {
        const editId = +evt.target.dataset.edit;
        const editItem = products.find(function (parrot) {
            return parrot.id === editId;
        });
        
        editTitle.value = editItem.title;
        editImg.value = editItem.img;
        editPrice.value = editItem.price;
        editDate.value = editItem.birthDate;
        editWidth.value = editItem.sizes.width;
        editHeight.value = editItem.sizes.height;
        editfeatures.value = editItem.features;
        editForm.setAttribute("data-editing-id", editId);
    }
    renderParrots();
});

const editParrotsModal = new bootstrap.Modal(document.querySelector("#edit-parrot-modal"));
const editForm = document.querySelector("#edit-form");
editForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
  
    const editingId = +evt.target.dataset.editingId;
  
    const editTitleValue = editTitle.value;
    const editImgValue = editImg.value;
    const editPriceValue = editPrice.value;
    const editDateValue = editDate.value;
    const editWidthValue = editWidth.value;
    const editHeightValue = editHeight.value;
    const featuresValue = editfeatures.value;
  
    const editParrot = {
      id: editingId,
      title: editTitleValue,
      img: editImgValue,
      price: editPriceValue,
      birthDate: editDateValue,
      sizes: {
        width: editWidthValue,
        height: editHeightValue,
      },
      isFavorite: false,
      features: featuresValue
    }
  
    const editingItemsIndex = products.findIndex(function (parrot) {
      return parrot.id === editingId;
    })
    
    const editingShowItemsIndex = showingParrots.findIndex(function (parrot) {
        return parrot.id === editingId;
      })
  
    products.splice(editingItemsIndex, 1, editParrot);
    showingParrots.splice(editingShowItemsIndex, 1, editParrot);
    editForm.reset();
    editParrotsModal.hide();
    renderParrots();
  });

renderParrots();

const filter = document.querySelector(".filter");
filter.addEventListener("submit", function(evt) {
    evt.preventDefault();

    const elements = evt.target.elements;
    
    const fromValue = elements.from.value;
    const toValue = elements.to.value;
    const searchValue = elements.search.value;
    const fromWidtValue = elements.from_width.value;
    const toWidtValue = elements.to_width.value;
    const fromHeightValue = elements.from_height.value;
    const toHeightValue = elements.to_height.value;
    const sortValue = elements.sortby.value;

    
    showingParrots = products
    .sort(function(a, b) {
        switch (sortValue) {
            case "1":
                if (a.name > b.name) {
                return -1
                } else if (a.name < b.name) {
                    return 1
                };
                case "2":
                    return a.price - b.price
                case "3":
                    return b.price - a.price
                case "4":
                    return a.birthDate - b.birthDate
                
                case "5": 
                    return b.birthDate - a.birthDate
                break;
        
            default:
                break;
        }
    }).filter(function(parrot) {
        return parrot.price >= fromValue;
    }).filter(function(parrot) {
        return !toValue ? true : parrot.price <= toValue;
    }).filter(function(parrot) {
        return parrot.sizes.width >= fromWidtValue;
    }).filter(function(parrot) {
        return !toWidtValue ? true : parrot.sizes.width <= toWidtValue;
    }).filter(function(parrot) {
        return parrot.sizes.height >= fromHeightValue;
    }).filter(function(parrot) {
        return !toHeightValue ? true : parrot.sizes.height <= toHeightValue;
    }).filter(function(parrot) {
        const searchRegExp = new RegExp(searchValue, "gi");
        return parrot.title.match(searchRegExp);
    });

    renderParrots();
});






