const key = "?access_key=6e021c6d1457f08717ac75ec6f99e561";
const baseUrl = ` http://api.coinlayer.com/`;
const listUrl = `${baseUrl}list${key}`;
const list = document.querySelector(".list");

//pagination variables
const itemsPerPage = 8;
let numOfPages;
let currentPage = 1;

//data variables
let coinList = [];

const getData = async () => {
  const response = await fetch(listUrl);
  const data = response.json();
  return data;
};

const renderData = async (currentPage = 1) => {
  await getData().then((data) => {
    const coins = data.crypto;
    const dataAsArray = Object.keys(coins);

    for (let key in dataAsArray) {
      let val = dataAsArray[key];
      coinList.push(coins[val]);
    }

    //html template
    let listItem = "";
    coinList
      .filter((item, index) => {
        let start = (currentPage - 1) * itemsPerPage;
        let end = currentPage * itemsPerPage;
        if (index >= start && index < end) {
          console.log(index);
          return true;
        }
      })
      .forEach((coin) => {
        const { name, symbol, icon_url } = coin;
        listItem += `<li>`;
        listItem += `<img src=${icon_url} alt=${name} />`;
        listItem += `<h3>${name}</h3>`;
        listItem += `<p>Coin symbol: <span>${symbol}</span> </p>`;
        listItem += `</li>`;
      });
    list.innerHTML = listItem;
  });
};

function numOfPages() {
  return Math.ceil(coinList.length / itemsPerPage);
}

const nextPage = () => {
  if (currentPage < numOfPages()) {
    currentPage++;
  }
  // console.log(currentPage);
  renderData(currentPage);
};

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
  }
  renderData(currentPage);
};

renderData();

document.querySelector(".next").addEventListener("click", nextPage);

document.querySelector(".prev").addEventListener("click", prevPage);
