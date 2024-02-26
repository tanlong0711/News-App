"use strict";
if (activeUser) {
  const btnSearch = document.getElementById("btn-submit");
  const queryInput = document.getElementById("input-query");
  const navPageNum = document.getElementById("nav-page-num");

  const newsContainer = document.getElementById("news-container");
  const pageNum = document.getElementById("page-num");
  const btnPre = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  let totalResults = 0;
  let keywords = "";

  // ẩn đi thanh chuyển trang
  navPageNum.style.display = "none";

  btnSearch.addEventListener("click", function () {
    if (validate()) {
      keywords = queryInput.value;

      // Đặt lại giá trị trang bằng 1
      pageNum.textContent = "1";

      // Hiển thị ra thanh chuyển trang
      navPageNum.style.display = "block";

      // Xóa đi articles trước đó
      newsContainer.innerHTML = "";

      dataNewsKeywords(keywords, 1);
    }
  });

  const dataNewsKeywords = async function (keywords, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${keywords}&sortBy=relevancy&pageSize=${activeUser.pageSize}&page=${page}&apiKey=b85a593e31db4bc2964216cf01bffff5`
      );

      const data = await res.json();
      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }
      renderNews(data);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Hàm display các News
  function renderNews(data) {
    totalResults = data.totalResults;

    checkPre();
    checkNext();

    let html = "";
    data.articles.forEach(function (article) {
      html += `
    <div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src=${article.urlToImage ? article.urlToImage : "errorimage.jpg"}
            class="card-img"
            alt="image">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${
              article.description ? article.description : ""
            }</p>
            <a href=${article.url}
              class="btn btn-primary" target='_blank'>View</a>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    });
    newsContainer.innerHTML = html;
  }

  // Hàm check nút Pre
  function checkPre() {
    if (pageNum.textContent == 1) {
      btnPre.style.display = "none";
    } else {
      btnPre.style.display = "block";
    }
  }
  // Hàm check nút Next
  function checkNext() {
    if (pageNum.textContent == Math.ceil(totalResults / activeUser.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }

  // Hàm validate đã nhập từ khóa hay chưa
  function validate() {
    if (queryInput.value.trim() === "") {
      alert(`Mời bạn nhập từ khóa!`);
      navPageNum.style.display = "none";
      return false;
    }
    return true;
  }

  // Bắt sự kiện nút Pre
  btnPre.addEventListener("click", function () {
    dataNewsKeywords("us", --pageNum.textContent);
  });

  // Bắt sự kiện nút Next
  btnNext.addEventListener("click", function () {
    dataNewsKeywords("us", ++pageNum.textContent);
  });
} else {
  alert(`Mời bạn đăng nhập!`);
  window.location.href = "../index.html";
}
