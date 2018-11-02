'use strict';
/*eslint-env jquery */

const STORE = {
    items: [
        {name: "apples", checked: false, iindex: 0},
        {name: "oranges", checked: false, iindex: 1},
        {name: "milk", checked: true, iindex: 2},
        {name: "bread", checked: false, iindex: 3}
    ],
    hideCompleted: false,
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

//maps thru the store and returns a string of all the LI's
function generateShoppingItemsString(shoppingList) {
    if(!STORE.hideCompleted){
        let unfilteredItems = [ ...shoppingList ].map((element, index) => generateItemElement(element, index));
        return unfilteredItems.join("");
    }
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
 //make a string from the store that has all items if hideCompleted is false
 // and only filtered items if true.
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
  STORE.items.push({name: itemName, checked: false});
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
    console.log(itemIndexString);
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
    //console.log("deleteing items function line 100 here");
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
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);