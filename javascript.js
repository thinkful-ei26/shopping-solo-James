'use strict';
/*eslint-env jquery */

const STORE = {
    items: [
        {name: "apples", checked: false, found: false},
        {name: "oranges", checked: false, found: false},
        {name: "milk", checked: true, found: false},
        {name: "bread", checked: false, found: false}
    ],
    hideCompleted: false,
    lookingForName: false,
};

// returns a single LI element as a string
function generateItemElement(item, itemIndex) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
//maps thru the store and returns a string of all the Li's
    if(STORE.lookingForName && !STORE.hideCompleted){
      let searchingFor = [];
        shoppingList.map((element, index) => {
            if(element.found){
              searchingFor.push(generateItemElement(element, index));
            element.found = false;
            }
        });
        STORE.lookingForName = false;
        //console.log(searchingFor);works
        return searchingFor.join('');
    }
    if(STORE.lookingForName){
      //here we are searching but need to hide checked?
      let searchingFor = [];
        shoppingList.map((element, index) => {
            if(element.found){
                if(!element.checked){
                  searchingFor.push(generateItemElement(element, index));
                  element.found = false;
                }
              element.found = false;
            }
        });
        STORE.lookingForName = false;
        //console.log(searchingFor);works
        return searchingFor.join('');
    }


    if(!STORE.hideCompleted){
        let unfilteredItems = [ ...shoppingList ].map((element, index) => generateItemElement(element, index));
        return unfilteredItems.join("");
    }
//returns string of unchecked Li's
    if(STORE.hideCompleted) {
        let unfilteredItems = [];
        shoppingList.map((element, index) => {
            if(!element.checked){
            unfilteredItems.push(generateItemElement(element, index));
            }
        });
        return unfilteredItems.join('');
        }
    
}

//renders the store to the DOM
function renderShoppingList() {
 
    const lisToRender = generateShoppingItemsString(STORE.items);
  // insert built HTML-string into the DOM
  $('.shopping-list').html(lisToRender);
}

function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    //newItemName is the text input from the input box
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
  //console.log('`handleNewItemSubmit` ran');
  renderShoppingList();
});
}

function addItemToShoppingList(itemName){
   // console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false, found: false});
}


function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  $('.shopping-list').on('click', `.js-item-toggle`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
    //console.log('`handleItemCheckClicked` ran');
  });
 
}

function toggleCheckedForListItem(itemAtIndex) {
    //console.log("Toggling checked property for item at index " + itemIndex);
    STORE.items[itemAtIndex].checked = !STORE.items[itemAtIndex].checked;
   
  }

// finds the li and reads it's index attribute, returns it as a number
function getItemIndexFromElement(item) {
    const itemIndexString = $(item).closest('.js-item-index-element').data('item-index');
    //console.log(itemIndexString);
    return parseInt(itemIndexString, 10);
  }

function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  $('.shopping-list').on('click', `.js-item-delete`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  //console.log('`handleDeleteItemClicked` ran');
  });  
}

function deleteListItem(StoreIndex){
    //this function has passed in the itemIndex to remove from the store
    
    //delete STORE[StoreIndex];
    STORE.items.splice(StoreIndex, 1);
    
}

function toggleCheckBoxFilter(){
    //this function sets the store hide/show completed boolean to !whatever it was
    STORE.hideCompleted = !STORE.hideCompleted;
    //console.log("showing items:", STORE.hideCompleted);
    renderShoppingList();
}

function handleDisplayCheckedBox(){
    //this function is the event listener for the checkbox input
    $('#display-checked').on('click', toggleCheckBoxFilter);
}

function handleSearchByName(){
  //event listener for user input on search Box
  $('#searchForm').submit(function(event) {
    //console.log("line 147");works
    event.preventDefault();
    const searchFor = $('#searchByName').val();
    $('#searchByName').val('');
  doTheSearching(searchFor);
  renderShoppingList();
  });
}

function doTheSearching(theirName){

  STORE.lookingForName = true;
  STORE.items.forEach(element => (element.name === theirName)? element.found = true: element.found = false);
  // console.log(theirName, STORE.lookingForName);works
  
}
// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleDisplayCheckedBox();
  handleSearchByName();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);