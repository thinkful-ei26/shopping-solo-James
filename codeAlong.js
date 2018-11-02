'use strict';
/*eslint-env jquery*/
//save our list data to an array
// example [{name: 'userEnteredListItem', checked: Boolean, item-index: number, isHappy: boolean}];
const STORE = [];



//A shopping list should be rendered to the page
function renderShoppingList(){

}

//You should be able to add items to the list
function addItems(){}
//You should be able to check items on the list
function checkItems(){}
//You should be able to delete items from the list
function deleteItems() {}


function isThisProgramBecomingSkyNet (bool) {
    if(bool){
        console.log("Find John Conner");
    }
}
//page loads finishes this function runs
function init(){
    renderShoppingList();
    addItems();
    checkItems();
    deleteItems();
    isThisProgramBecomingSkyNet(false);
}
//actually call it.
$(init);