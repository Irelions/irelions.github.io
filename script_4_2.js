const lightGray = "#e3e3e3";
const gray = '#e5e5e5';
const darkGray = '#c4c4c4';
const purple  = '#E27BEB';
const blue = '#65CDF9';
const apiGithubRepository = 'API_GitHub_Repository';

//Body
const body = document.body;
body.style.backgroundColor = gray;
body.style.padding = '60px';

// Container
const container = document.createElement("div");
container.classList.add('container');
container.style.width = '660px';
container.style.margin = '0 auto';
container.style.padding = '80px';
container.style.boxSizing = 'border-box'
container.style.backgroundColor = darkGray;
body.appendChild(container);

//InpupWrap
const inputWrap = document.createElement("div");
inputWrap.style.width = '500px';
inputWrap.style.height = '300px';
container.appendChild(inputWrap);

// Input
const inputSearch = document.createElement("input");
inputSearch.type = 'text';
inputSearch.style.display = 'block';
inputSearch.placeholder = 'Введите запрос...';
inputSearch.style.height = '60px';
inputSearch.style.margin = '0 auto';
inputSearch.style.width = '100%';
inputSearch.style.boxSizing = 'border-box';
inputSearch.style.border = '1px solid black';
inputSearch.style.fontSize = '48px';
inputSearch.style.padding = '0 15px';
inputWrap.appendChild(inputSearch);

//View
const viewer = document.createElement("div");
viewer.style.width = '100%';
container.appendChild(viewer);


const debounce = (fn, debounceTime) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, debounceTime);
    };
};

const addItemToLocalStorage = (item) => {
    const apiLocalStorage = localStorage.getItem(apiGithubRepository);
    if (apiLocalStorage) {
        const items = new Map(JSON.parse(apiLocalStorage));
        items.set(item.id, item);
        localStorage.setItem(apiGithubRepository, JSON.stringify(Array.from(items.entries())));
    } else {
        const itemToDB = new Map();
        itemToDB.set(item.id, item);
        localStorage.setItem(apiGithubRepository, JSON.stringify(Array.from(itemToDB.entries())));
    }
};

const deleteItemFromLocalStorage = (id) =>{
    const apiLocalStorage = localStorage.getItem(apiGithubRepository);
    if (apiLocalStorage) {
        const items = new Map(JSON.parse(apiLocalStorage));
        items.delete(id);
        localStorage.setItem(apiGithubRepository, JSON.stringify(Array.from(items.entries())));
    }
};

const renderCard = () => {
    const items = localStorage.getItem(apiGithubRepository);
    if (items) {

        const itemsDB = new Map(JSON.parse(items));
        viewer.innerHTML = '';
        itemsDB.forEach(item => {
            const cardItem = document.createElement("div");
            cardItem.style.width = '100%';
            cardItem.style.height = '100px';
            cardItem.style.display = 'flex';
            cardItem.style.backgroundColor = purple;
            cardItem.style.fontSize = '24px';
            cardItem.style.padding = '5px 15px';
            cardItem.style.boxSizing = 'border-box';
            cardItem.style.border = '1px solid black';

            const cardItemLeft = document.createElement('div');
            cardItemLeft.style.width = '80%';

            const cardItemRight = document.createElement('div');
            const imgDel = document.createElement('img');
            imgDel.src = 'deleteCross.png';
            imgDel.style.scale = '50%';

            imgDel.addEventListener('click', (env) => {
                deleteItemFromLocalStorage(item.id);
                renderCard();
            });

            cardItemRight.appendChild(imgDel);
            cardItemRight.style.width = '20%';


            const cardName = document.createElement("div");
            const cardOwner = document.createElement("div");
            const cardStars = document.createElement("div");

            cardName.innerText = `Name: ${item.name}`;
            cardOwner.innerText = `Owner: ${item['owner'].login}`;
            cardStars.innerText = `Stars: ${item.stargazers_count}`;

            cardItemLeft.appendChild(cardName);
            cardItemLeft.appendChild(cardOwner);
            cardItemLeft.appendChild(cardStars);

            cardItem.appendChild(cardItemLeft);
            cardItem.appendChild(cardItemRight);

            viewer.appendChild(cardItem);
        });
    }
};


inputSearch.addEventListener('keyup', debounce(async () => {
    const value = inputSearch.value;
    const response = await fetch(`https://api.github.com/search/repositories?q=${value}`);

    response.json()
        .then(res => {
            return res.items.slice(0, 5);
        })
        .then(res => {
            //ItemList
            let listItems;
            const itemListId = document.getElementById('itemList');
            if (itemListId) {
                itemListId.remove();
                listItems = document.createElement("div");
            } else {
                listItems = document.createElement("div");
            }
            listItems.id = 'itemList';
            inputWrap.appendChild(listItems);
            res.forEach(item => {
                const listItem = document.createElement("div");
                listItem.textContent = item.name;

                //listItem style
                listItem.style.fontSize = '30px';
                listItem.style.height = '40px';
                listItem.style.border = '1px solid black';
                listItem.style.padding = '0 15px';
                listItem.style.backgroundColor = lightGray;
                listItems.appendChild(listItem)


                listItem.addEventListener('mouseover', () => {
                    listItem.style.backgroundColor = blue;
                });
                listItem.addEventListener('mouseout', () => {
                    listItem.style.backgroundColor = lightGray;
                });


                listItem.addEventListener('click', () => {
                    inputSearch.value = '';
                    addItemToLocalStorage(item);
                    renderCard();
                });
            })
        }
    );
    }, 500
));

renderCard();