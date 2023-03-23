"use strict"

let productContainer = document.querySelector('section');
let results = document.querySelector('section + div');
let firstImage = document.querySelector('section img:first-child');
let secondImage = document.querySelector('section img:nth-child(2)');
let thirdImage = document.querySelector('section img:last-child');

let vote = 0;
let voteCeil = 25; // maximum number of votes

const state = { //holds current state of application
    prodArr: [],
}

function product(name, source) {
    this.name = name;
    this.source = source;
    this.seen = 0;
    this.vote = 0;
}

function getRandomNumber() {
    return Math.floor(Math.random() * state.prodArr.length);
}

function renderProd() {
    let prod1 = getRandomNumber();
    let prod2 = getRandomNumber();
    let prod3 = getRandomNumber();

    while (prod1 == prod2 || prod2 == prod3 || prod3 == prod1) {

        prod1 = getRandomNumber();
        prod2 = getRandomNumber();
        prod3 = getRandomNumber();
    }

    firstImage.src = state.prodArr[prod1].source;
    secondImage.src = state.prodArr[prod2].source;
    thirdImage.src = state.prodArr[prod3].source;

    firstImage.alt = state.prodArr[prod1].name;
    secondImage.alt = state.prodArr[prod2].name;
    thirdImage.alt = state.prodArr[prod3].name;

    state.prodArr[prod1].seen++;
    state.prodArr[prod2].seen++;
    state.prodArr[prod3].seen++;

}

function clickedOrNah(event) {
    if (event.target === productContainer) {
        alert('Please select product')
    }
    vote++;

    let prodClick = event.target.alt;
    for (let i = 0; i < state.prodArr.length; i++) {
        if (prodClick === state.prodArr[i].name) {
            state.prodArr[i].vote++;
            break;
        }
    }
    if (vote === voteCeil) {
        productContainer.removeEventListener('click', clickedOrNah);
        results.addEventListener('click', renderResults);

        results.className = 'votes-allowed';
    } else {
        renderProd();
    }

}

function renderResults() {
    let ul = document.querySelector('ul');
    for (let i = 0; i < state.prodArr.length; i++) {
        let li = document.createElement('li');
        li.textContent = `${state.prodArr[i].name} was seen ${state.prodArr[i].seen}x and received ${state.prodArr[i].vote} votes`;
        ul.append(li);
    }

}


let bag = new product('bag', 'img/bag.jpg');
let banana = new product('banana', 'img/banana.jpg');
let bathroom = new product('bathroom', 'img/bathroom.jpg')
let boots = new product('boots', 'img/boots.jpg');
let breakfast = new product('breakfast', 'img/breakfast.jpg');
let bubblegum = new product('bubblegum', 'img/bubblegum.jpg');
let chair = new product('Chair', 'img/chair.jpg');
let cthulhu = new product('cthulhu', 'img/cthulhu.jpg');
let dogDuck = new product('dog-duck', 'img/dog-duck.jpg');
let dragon = new product('dragon', 'img/dragon.jpg');
let pen = new product('pen', 'img/pen.jpg');
let petSweep = new product('pet-sweep', 'img/pet-sweep.jpg');
let scissors = new product('scissors', 'img/scissors.jpg');
let shark = new product('shark', 'img/shark.jpg');
let sweep = new product('sweep', 'img/sweep.png');
let tauntaun = new product('tauntaun', 'img/tauntaun.jpg');

state.prodArr.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun);

renderProd();

productContainer.addEventListener('click', clickedOrNah);

