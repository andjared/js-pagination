const key = "?access_key=6e021c6d1457f08717ac75ec6f99e561";
const baseUrl = ` http://api.coinlayer.com/`;
const listEndpoint = `${baseUrl}list${key}`;
const list = document.querySelector(".list");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const currBtn = document.querySelector("#current");

//pagination variables
const itemsPerPage = 12;
let currentPage = 1;

//list of coins
let coinList = [];

const fetchData = async () => {
  const response = await fetch(listEndpoint);
  const data = await response.json();
  const coins = data.crypto;
  const dataAsArray = Object.keys(coins);

  if (!coinList.length)
    for (let key in dataAsArray) {
      let val = dataAsArray[key];
      coinList.push(coins[val]);
    }

  return coinList;
};

const renderData = async (currentPage = 1) => {
  await fetchData().then((data) => {
    let listItem = "";
    data
      .filter((item, index) => {
        let start = (currentPage - 1) * itemsPerPage;
        let end = currentPage * itemsPerPage;
        if (index >= start && index < end) {
          return true;
        }
      })
      .forEach((coin) => {
        const { name, symbol, icon_url } = coin;
        listItem += `<li>
            <img src=${icon_url} alt=${name} />
            <h3>${name}</h3>
            <p>Coin symbol: <span>${symbol}</span> </p>        
        </li>`;
      });

    list.innerHTML = listItem;
    renderPaginationBtns();
  });
};

function numOfPages() {
  return Math.ceil(coinList.length / itemsPerPage);
}

const renderPaginationBtns = () => {
  if (currentPage === 1) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }

  if (currentPage === numOfPages()) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "block";
  }

  prevBtn.innerHTML = currentPage - 1;
  currBtn.innerHTML = currentPage;
  nextBtn.innerHTML = currentPage + 1;
};

const nextPage = () => {
  if (currentPage < numOfPages()) {
    currentPage++;
  }

  renderData(currentPage);
};

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
  }
  renderData(currentPage);
};

renderData();

nextBtn.addEventListener("click", nextPage);

prevBtn.addEventListener("click", prevPage);
