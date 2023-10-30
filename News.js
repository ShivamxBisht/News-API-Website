const api_key = "a42d2962e0d146ca951b712861d34a56";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Trending"));
window.addEventListener("load", () => {
  showAndHideLoadingBar();
});

function scrolltotop() {
  window.scrollTo(0, 0);
  showAndHideLoadingBar();
}

function reload() {
  window.location.reload();
}
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apikey=${api_key}`);
  const data = await res.json();
  bindData(data.articles);
}
function bindData(articles) {
  const cardscontainer = document.getElementById("card-container");
  const newscardtemplate = document.getElementById("news-card");
  cardscontainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newscardtemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardscontainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsimg = cardClone.querySelector("#news-img");
  const newstitle = cardClone.querySelector("#news-title");
  const newssource = cardClone.querySelector("#news-content");
  const newsdesc = cardClone.querySelector("#news-desc");

  newsimg.src = article.urlToImage;

  newstitle.innerHTML = article.title;
  newsdesc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-us", {
    timeZone: "Asia/Jakarta",
  });
  newssource.innerHTML = `${article.source.name} ◌ ${article.author} ◌ ${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "blank");
  });
}
let curselectednav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curselectednav?.classList.remove("active");
  curselectednav = navItem;
  curselectednav.classList.add("active");
  scrolltotop();
  showAndHideLoadingBar();
}
const searchbtn = document.getElementById("btn2");
const searchtxt = document.getElementById("search-text");
searchbtn.addEventListener("click", () => {
  const query = searchtxt.value;
  if (!query) return;
  fetchNews(query);
  curselectednav?.classList.remove("active");
  curselectednav = null;
  scrolltotop();
  showAndHideLoadingBar();
});
//For searching through single word
// searchtxt.addEventListener('keyup',function(){
//   const query = searchtxt.value;
//   if (!query) return;
//   fetchNews(query);
//   curselectednav?.classList.remove("active");
//   curselectednav = null;
// })

//For searching by pressing enter
searchtxt.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const query = searchtxt.value;
    if (!query) return;
    fetchNews(query);
    curselectednav?.classList.remove("active");
    curselectednav = null;
    scrolltotop();
    showAndHideLoadingBar();
  }
});
//For Dark Mode
const togglebtn = document.querySelector("#checkbox");
const navcolor = document.getElementsByTagName("nav");
togglebtn.addEventListener("click", function () {
  if (togglebtn.checked) {
    document.body.classList.add("dark-mode");
    for (const nav of navcolor) {
      nav.style.backgroundColor = "#111111";
    }
  } else {
    document.body.classList.remove("dark-mode");
    for (const nav of navcolor) {
      nav.style.backgroundColor = "";
    }
  }
});
//For Loading Animation (Non-real time)

function showLoadingBar() {
  const loadingBar = document.getElementById("loading-bar");
  loadingBar.classList.add("loading");
}

function hideLoadingBar() {
  const loadingBar = document.getElementById("loading-bar");
  loadingBar.classList.remove("loading");
}
function showAndHideLoadingBar() {
  showLoadingBar();
  setTimeout(() => {
    hideLoadingBar();
  }, 1000);
}
