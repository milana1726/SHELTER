async function getDataPets(){    
    let response = await fetch('./pets.json');
    if (response.ok) {
        let data = await response.json();
        return data;
    } else {
        alert("Error HTTP: " + response.status);
    }
}

const pets_container = document.querySelector('.slider_pets');
const btn_start = document.querySelector('.arrow_double_left');
const btn_left = document.querySelector('.arrow_single_left');
const btn_page = document.querySelector('.button_page');
const btn_right= document.querySelector('.arrow_single_right');
const btn_end = document.querySelector('.arrow_double_right');
let petsArr = [];

function createPetCard({name, img, type, breed, description, age, inoculations, diseases, parasites}) {
    let fragment = document.createDocumentFragment();

    let card = document.createElement('div');
    card.classList.add('pet_card');
    card.addEventListener('click', () => 
        openModal(img, name, type, breed, description, age, inoculations, diseases, parasites));

    let petImg = document.createElement('img');
    petImg.setAttribute('src', img);
    petImg.setAttribute('alt', name);

    let petName = document.createElement('h4');
    petName.textContent = name;

    let btnMore = document.createElement('button');
    btnMore.type = "button";
    btnMore.classList.add('button_more');
    btnMore.textContent = 'Learn more';

    card.append(petImg);
    card.append(petName);
    card.append(btnMore);

    fragment.append(card);

    return fragment;
}

function openModal(img, name, type, breed, description, age, inoculations, diseases, parasites) {
    let output = '';
    output += `
            <div class="description_img">
              <img src="${img}" alt="pet_image">
            </div>
            <div class="description_content">
              <p class="description_name">${name}</p>
              <p class="description_type">${type} - ${breed}</p>
              <p class="description_more">${description}</p>
              <ul class="information" type="disc">
                    <li>
                        <span class="info-item"><b>Age:</b> </span>
                        <span>${age}</span>
                    </li>
                    <li>
                        <span class="info-item"><b>Inoculations:</b> </span>
                        <span>${inoculations}</span>
                    </li>
        
                    <li>
                        <span class="info-item"><b>Diseases:</b> </span>
                        <span>${diseases}</span>
                    </li>
                    <li>
                        <span class="info-item"><b>Parasites:</b> </span>
                        <span>${parasites}</span>
                    </li>
                </ul>
                <div class="modal_close" type="button">+<div>
        </div>`;
        document.getElementById("modal_container").classList.add("visible"),
        document.documentElement.style.overflowY = "hidden",
        document.querySelector(".pet_description").innerHTML = output;

        document.querySelector(".modal_close").addEventListener("click", function () {
            document.getElementById("modal_container").classList.remove("visible"),
                document.documentElement.style.overflowY = "visible";
        });
        
        
        document.getElementById("modal_container").addEventListener("click", function (e) {
            const click = e.composedPath().includes(document.getElementById("more_content"));
            if (!click) {
                document.getElementById("modal_container").classList.remove("visible");
                document.documentElement.style.overflowY = "visible";
            }
        });
};

window.addEventListener('DOMContentLoaded', () => {
    createCards();
});
window.addEventListener('resize', () => {
    createCards();
});

function createCards() {    
    if (window.innerWidth > 1279) {
        petsArr = [0, 1, 2, 3, 4, 5, 6, 7];
    } else if (window.innerWidth < 1279 && window.innerWidth > 767 ) {
        petsArr = [0, 1, 2, 3, 4, 5]; 
    } else {
        petsArr = [0, 1, 2];
    }
    while (pets_container.firstChild) {
        pets_container.removeChild(pets_container.firstChild);
    }
    createSlider(petsArr);
};

btn_right.addEventListener('click', () => {
    showCards('right');
});
btn_left.addEventListener('click', () => {
    showCards('left');
});

async function createSlider(randomArr, btnInfo) {
    let pets = await getDataPets();
    randomArr.forEach(item => {
        if (btnInfo === 'right') {
            pets_container.append(createPetCard(pets[item]));
        } else {
            pets_container.prepend(createPetCard(pets[item]));
        }
    });     
}

function randomArray(petsArr) {
    let randomArr = [];
    for (let item of petsArr) {
        while (petsArr.includes(item) || randomArr.includes(item)) {
            item = Math.floor(Math.random()*8);
        }
        randomArr.push(item);
    }
    return randomArr;
}

function showCards(btnInfo) {     
    const randomArr = randomArray(petsArr);
    createSlider(randomArr, btnInfo);
    setTimeout(() => {
        removeCards(petsArr, btnInfo);
    }, 0);
    petsArr = randomArr;
};

function removeCards(petsArr, btnInfo) {
    for(let i = 0; i < petsArr.length; i++) {
        if (btnInfo === 'right') {
            pets_container.removeChild(pets_container.firstChild);
        } else {
            pets_container.removeChild(pets_container.lastChild);
        } 
    }
}

const menu = document.querySelector(".nav_burger");
const menuItems = document.querySelectorAll(".nav_item");
const hamburger= document.querySelector(".icon_nav_hidden");
const menuIcon = document.querySelector(".icon_burger");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    menuIcon.style.display = "block";
    menuIcon.style.transform = "rotate(180deg)";
    menuIcon.src = "../../assets/icons/Burger_2.svg";

  } else {
    menu.classList.add("showMenu");
    menuIcon.style.transform = "rotate(90deg)";
    document.body.style.overflow = 'hidden';
    menuIcon.src = "../../assets/icons/Burger.svg";
  }
}

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)