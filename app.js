// access key
// 6e021c6d1457f08717ac75ec6f99e561
const key = "6e021c6d1457f08717ac75ec6f99e561";
const list = document.querySelector(".list");

const getList = async () => {
  const data = await fetch(`http://api.coinlayer.com/list?access_key=${key}`);
  const response = data.json();
  return response;
};

getList().then((res) => {
  const data = res.crypto;
  console.log(data);
  for (const coins in data) {
    //destructure data object
    const { name, symbol, icon_url } = data[coins];
    //create li item for each coin & append it to ul
    const listItem = document.createElement("li");
    list.appendChild(listItem);
    //create elements for name, symbol and icon & append it to li items
    const coinIcon = document.createElement("img");
    coinIcon.setAttribute("src", icon_url);
    coinIcon.setAttribute("alt", name);
    listItem.appendChild(coinIcon);

    const coinName = document.createElement("h3");
    coinName.innerHTML = name;
    listItem.appendChild(coinName);

    const coinSymbol = document.createElement("p");
    coinSymbol.innerHTML = `Coin symbol: <span>${symbol}</span>`;
    listItem.appendChild(coinSymbol);
  }
});
