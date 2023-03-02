const loadData = async (searchField, dataLimit) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchField}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayData(data.drinks, dataLimit);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const displayData = (drink, dataLimit) => {
    // console.log(object);
    const drinkContainer = document.getElementById('drink-container');
    drinkContainer.innerHTML = '';
    // display 6 drinks 
    const showAll = document.getElementById('show-all')
    if (dataLimit && drink.length > 6) {
        drink = drink?.slice(0, 6)
        showAll.classList.remove('hidden')
    } else {
        showAll.classList.add('hidden')
    }
    // console.log(drink);
    // display no drink 
    const noDrink = document.getElementById('error-message')
    if (drink == undefined) {
        // console.log('enter');
        noDrink.classList.remove('hidden')
    } else {
        noDrink.classList.add('hidden')
    }

    // display all drinks 
    drink?.forEach(element => {
        const drinkDiv = document.createElement('div')
        drinkDiv.classList.add('grid')
        drinkDiv.innerHTML = `
            <div class="hero flex justify-between px-28">
                <div class="hero-content flex-col lg:flex-row">
                    <img src="${element.strDrinkThumb}" class="rounded-lg shadow-2xl w-56 h-72" />
                    <div>
                        <h1 class="text-2xl font-bold">${element.strDrink}</h1>
                        <p class="py-6">${element.strInstructions}</p>
                        <label onclick="loadDrinksDetail('${element.idDrink}')" for="my-modal-6" class="btn  bg-blue-700 border-none">Show Details</label>
                    </div>
                </div>
            </div>
    `
        drinkContainer.appendChild(drinkDiv)
    });
    // loader stop
    toggleSpinner(false)
}

const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field').value;
    loadData(searchField, dataLimit)
}

const btnSearch = () => {
    // loader start
    processSearch(6)
    // const searchText = searchField.value;
}

const btnShowAll = () => {
    processSearch()
}

// enter by search 
document.getElementById('search-field').addEventListener('keypress', function (e) {
    console.log(e.key);
    if (e.key === 'Enter') {
        processSearch(6)
    }
});

const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('hidden')
    } else {
        loaderSection.classList.add('hidden')
    }
}

const loadDrinksDetail = async (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayDrinkDetail(data);
}

const displayDrinkDetail = (drink) => {
    // console.log(drink);
    const { } = drink;
    const drinkDetail = document.getElementById('drink-detail')
    drinkDetail.innerHTML = `
    <h3 class="text-center font-semibold">Name: ${drink.drinks[0].strDrink}</h3>
    <img class="rounded mt-12 mb-8 mx-auto" style="width: 400px;
    height: 400px;" src="${drink.drinks[0].strDrinkThumb
        }" alt="">
    <p> Description: <span class="font-bold">${drink.drinks[0].strInstructions
        }</span></p>
    <p>Youtube Channel: <a href=""></a>${drink.drinks[0].strVideo ? drink.drinks[0].strVideo : 'No link Found'}</p>
    `
}

loadData('a')