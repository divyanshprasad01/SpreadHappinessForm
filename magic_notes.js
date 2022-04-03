console.log(`starting my javascript journey today`)
showCard(); //shows previosly saved notes...
//function to add a note on click of save note button ...
let addbtn = document.getElementById(`saveButton`);
addbtn.addEventListener('click', function() {
    let mName = document.getElementById('name');
    let mAge = document.getElementById('age')
    let mdob = document.getElementById('dob')
    let mphone = document.getElementById('phone')
    let maddress = document.getElementById('address');
    let mcountry = document.getElementById('country')
    
     if(mName.value.length == 0 || mAge.value.length == 0 || mdob.value.length == 0 || mphone.value.length == 0 || maddress.value.length == 0 || mcountry.value.length == 0){
        alert("All Fields Are Mandatory!!!")
        return 0;
    }

    //an object to store title and note 
    let myObj = {
        Name: mName.value,
        Age: mAge.value,
        DOB: mdob.value,
        Phone: mphone.value,
        Address: maddress.value,
        Country: mcountry.value
    }

    let storage = localStorage.getItem('cards');

    if (storage == null) {
        cardsObj = [];
    } else {
        cardsObj = JSON.parse(storage);
    }

    cardsObj.push(myObj);
    localStorage.setItem('cards', JSON.stringify(cardsObj));

    mName.value = '';
    mdob.value = '';
    mphone.value = '';
    maddress.value = '';
    mcountry.value = '';
    // console.log('new card is ', cardsObj);
    showCard(); //updating notes palatte....

});

//function to show previously saved notes.....
function showCard() {
    let storage = localStorage.getItem('cards');

    if (storage == null) {
        cardsObj = [];
    } else {
        cardsObj = JSON.parse(storage);
    }
    let inner_html = '';
    cardsObj.forEach(function(element, index) {
        inner_html += `<div class="card cardss" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.Name}</h5>
            <p class="card-text">AGE : ${element.Age}</p>
            <p class="card-text">DOB : ${element.DOB}</p>
            <p class="card-text">PHONE : ${element.Phone}</p>
            <p class="card-text">ADDRESS : ${element.Address}</p>
            <p class="card-text">COUNTRY : ${element.Country}</p>
            <button onclick = 'delete_card(this.id)' id = '${index}' class="btn btn-primary">Delete Note</button>
        </div>
    </div> `

    });

    let saved_notes = document.getElementById('savedNotes')
    if (saved_notes == null) {

        saved_notes.innerHTML = 'There is Nothing To show !! Please add Notes from above given Palatte ...'

    } else {
        saved_notes.innerHTML = inner_html;
        // console.log('element added');
    }

}

//function to delete notes on click of delete button.....
function delete_card(index) {
    console.log("deleting this element", index)
    let storage = localStorage.getItem('cards');

    if (storage == null) {
        cardsObj = [];
    } else {
        cardsObj = JSON.parse(storage);
    }
    cardsObj.splice(index, 1);
    localStorage.setItem('cards', JSON.stringify(cardsObj));
    showCard();

}

//search box.....
let search = document.getElementById('searchBox')
search.addEventListener('input', function() {
    let inputval = search.value;
    // console.log('search box triggerd');
    let cards = document.getElementsByClassName('cardss');
    // console.log(cards);
    Array.from(cards).forEach(function(element) {
        // console.log(cards);
        let card_title = element.getElementsByTagName("h5")[0].innerText;
        // console.log(card_title);
        if (card_title.includes(inputval)) {
            element.style.display = 'block'
        } else {
            element.style.display = 'none';

        }

    });
})
