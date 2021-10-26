// fetch(
//   "https://gnews.io/api/v4/top-headlines?&token=f9c5231237bb6a99f7ae45a0390457b4&lang=en"
// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     console.log("success");
//   });

// dom js

var btnFind = document.getElementById("btn-find");
var block = document.getElementById("block");
var btnResult = document.getElementById("btn-find01");
var btnResult02 = document.getElementById("btn-find002");
var close = document.getElementById("btn-primary");
function myFind() {
  block.classList.toggle("show");
  
}
btnResult.addEventListener("click", myFind);
btnResult02.addEventListener("click", myFind);
btnFind.addEventListener("click", myFind);
close.addEventListener("click", myFind);

var demo = document.getElementById("demo");
var html = "";



var menuBtn = document.getElementById("mobile-nav-toggle");
var menuMobile = document.getElementById("mobile-nav");
var menuColor = document.getElementById("mobile-body-overly");
var menuStatus = false;

function menuToggle() {
  if (menuStatus === false) {
    menuMobile.style.left = "0";
    menuBtn.className = "lnr lnr-cross";
    menuColor.style.display = "block";
    menuStatus = true;
  } else if (menuStatus === true) {
    menuMobile.style.left = "-260px";
    menuBtn.className = "lnr lnr-menu";
    menuColor.style.display = "none";
    menuStatus = false;
  }
}

menuBtn.addEventListener("click", menuToggle);
menuColor.addEventListener("click", () => {
  menuMobile.style.left = "-260px";
  menuBtn.className = "lnr lnr-menu";
  menuColor.style.display = "none";
  menuStatus = false;
});

// load data json

loadDoc(
  "https://gnews.io/api/v4/top-headlines?token=294d10570d4c4636dbf27a76776e489f&lang=en",
  myFunction
);
var request;

function loadDoc(url, cFunction) {
  request = new XMLHttpRequest();
  request.onload = function () {
    cFunction(this);
    // console.log(this);
  };
  request.open("GET", url);
  request.send();
}

function myFunction(request) {
  var jsonObj = JSON.parse(request.responseText); //JSON.parse() returns JSON object

  let arr = jsonObj.articles;
  for (let i = 0; i < arr.length; i++) {
    html += "<div class = 'new-page d-flex'>";
    html += "<div class = 'title-content'>";
    html +=
      "<h2><a target = '_blank' href='" +
      arr[i].url +
      "'>" +
      arr[i].title +
      "</a></h2>";
    html += "<p class = 'time-day'>" + arr[i].publishedAt + "</p>";
    html +=
      "<span class='description'><a target = '_blank' href='" +
      arr[i].url +
      "'>" +
      arr[i].description +
      "</a></span>";
    html += "</div>";
    html += "<div class = 'page-image'>";
    html += "<img src='" + arr[i].image + "' >";
    html += "</div>";
    html += "</div>";
  }
  demo.innerHTML = html;
}

//search for
// var searchField = document.getElementById("search").value;
// loadDoc(
//   "https://gnews.io/api/v4/search?q=${searchField}&token=651cb01a9c75d2abdd34eab3d9a6b257&lang=en",
//   searchFunction
// );

// function searchFunction(request) {
//   var jsonnObj = JSON.parse(request.responseText);

//   let arr = jsonObj.articles;
//   for (let i = 0; i < arr.length; i++) {
//     html += "<div class = 'new-page d-flex'>";
//     html += "<div class = 'title-content'>";
//     html +=
//       "<h2><a target = '_blank' href='" +
//       arr[i].url +
//       "'>" +
//       arr[i].title +
//       "</a></h2>";
//     html += "<p class = 'time-day'>" + arr[i].publishedAt + "</p>";
//     html +=
//       "<span class='description'><a target = '_blank' href='" +
//       arr[i].url +
//       "'>" +
//       arr[i].description +
//       "</a></span>";
//     html += "</div>";
//     html += "<div class = 'page-image'>";
//     html += "<img src='" + arr[i].image + "' >";
//     html += "</div>";
//     html += "</div>";
//   }
//   demo.innerHTML = html;

// }

$(document).ready(function () {
  $.ajaxSetup({ cache: false });
  $("#search").keyup(function () {
    $("#demo").html("");
    $("#state").val("");
    var searchField = $("#search").val();
    var expression = new RegExp(searchField, "i");
    $.getJSON(
      `https://gnews.io/api/v4/search?q=${searchField}&token=294d10570d4c4636dbf27a76776e489f

      &lang=en`,
      function (data) {
        console.log(data);

        $.each(data.articles, function (key, value) {
          $("#demo").append(
            "<div class = 'new-page d-flex'><div class = 'title-content'><h2><a target = '_blank' href='" +
              value.url +
              "'>" +
              value.title +
              "</a></h2><p class = 'time-day'>" +
              value.publishedAt +
              "</p><span class='description'><a target = '_blank' href='" +
              value.url +
              "'>" +
              value.description +
              "</a></span></div><div class = 'page-image'><img src='" +
              value.image +
              "' >"
          );
        });
      }
    );
  });

  $("#demo").on("click", "li", function () {
    var click_text = $(this).text().split("|");
    $("#search").val($.trim(click_text[0]));
    $("#demo").html("");
  });
});
