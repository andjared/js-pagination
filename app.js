const key = "?access_key=6e021c6d1457f08717ac75ec6f99e561";
const baseUrl = ` http://api.coinlayer.com/`;
const listEndpoint = `${baseUrl}list${key}`;
const list = document.querySelector(".list");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const paginationNumbers = document.querySelector(".pagination-numbers");

//pagination variables
const itemsPerPage = 150;
let currentPage;

//list of coins
let coinList = [];
let pageNumbers = false;

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
  });

  if (!pageNumbers) getPaginationNumbers(); //call only once
  handlePaginationBtns();
};

function numOfPages() {
  return Math.ceil(coinList.length / itemsPerPage);
}

const handleArrowBtns = () => {
  if (currentPage === 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }

  if (currentPage === numOfPages()) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
};

function handlePaginationBtns() {
  document.querySelectorAll(".pagination-number").forEach((btn) => {
    const pageIndex = Number(btn.getAttribute("page-index"));
    btn.addEventListener("click", () => {
      setCurrentPage(pageIndex);
      renderData(currentPage);
    });
  });
}

function renderPaginationButtons(index) {
  const paginationBtn = document.createElement("button");
  paginationBtn.innerHTML = index;
  paginationBtn.classList.add("pagination-number");
  paginationBtn.setAttribute("page-index", index);
  paginationNumbers.appendChild(paginationBtn);
}

function getPaginationNumbers() {
  pageNumbers = true;
  for (let i = 1; i <= numOfPages(); i++) {
    renderPaginationButtons(i);
  }
}

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

function setCurrentPage(pageNum) {
  currentPage = pageNum;
  setActiveBtn();
  handleArrowBtns();
}

function setActiveBtn() {
  document.querySelectorAll(".pagination-number").forEach((btn) => {
    const pageIndex = Number(btn.getAttribute("page-index"));
    btn.classList.remove("active");
    if (pageIndex === currentPage) {
      btn.classList.add("active");
    }
  });
}

window.addEventListener("load", () => {
  setCurrentPage(1);
  renderData();

  nextBtn.addEventListener("click", nextPage);

  prevBtn.addEventListener("click", prevPage);
});
