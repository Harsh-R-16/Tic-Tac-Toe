let sec = document.querySelector("section");
let arr;
let c;
let h2 = document.querySelector("h2");
let hr1 = document.querySelector("#hr1");
let hr2 = document.querySelector("#hr2");
let a;
reset();
sec.addEventListener("mouseover", function (e) {
  let div = e.target;
  if (div.classList.contains("notFixed")) {
    if (c % 2) div.innerHTML = "X";
    else div.innerHTML = "O";
  }
});
sec.addEventListener("mouseout", function (e) {
  let div = e.target;
  if (div.classList.contains("notFixed")) {
    div.innerHTML = "";
  }
});

sec.addEventListener("click", function (e) {
  let div = e.target;
  if (div.classList.contains("notFixed")) {
    if (c % 2) div.innerHTML = "X";
    else div.innerHTML = "O";
    div.style.cursor = "not-allowed";
    arr[Math.floor(div.id / 3)][div.id % 3] = div.innerHTML;
    if (check(arr)) {
      h2.innerHTML = check(arr)[0] + " wins";
      document.querySelectorAll("div").forEach(function (div) {
        div.classList.remove("notFixed");
      });
      if (check(arr)[2] == "h") {
        hr1.style.top = `${i * 80 + 40}px`;
        hr1.style.display = "inherit";
      } else if (check(arr)[2] == "v") {
        hr1.style.transform = "rotate(90deg)";
        hr1.style.left = `${i * 80 + 40}px`;
        hr1.style.display = "inherit";
      } else if (check(arr)[2] == "d1") {
        hr1.style.transform = "rotate(45deg)";
        hr1.style.width = "140%";
        hr1.style.display = "inherit";
      } else {
        hr2.style.display = "inherit";
      }
      a = setTimeout(reset, 3000);
      console.log(a);
    }
    div.classList.remove("notFixed");
    c++;
  }
});

function check(arr) {
  let horizontal = [];
  let vertical = ["", "", ""];
  let dia1 = "";
  let dia2 = "";
  for (let i = 0; i < arr.length; i++) {
    horizontal[i] = arr[i].join("");
    for (let j = 0; j < arr.length; j++) {
      if (i == j) dia1 += arr[i][j];
      if (i + j == 2) dia2 += arr[i][j];
      vertical[j] = vertical[j] + arr[i][j];
    }
  }

  //   console.log(horizontal);
  //   console.log(vertical);
  //   console.log(dia1, dia2);
  for (i = 0; i < 3; i++) {
    if (horizontal[i] == "XXX" || horizontal[i] == "OOO") {
      return [horizontal[i][0], i, "h"];
    } else if (vertical[i] == "XXX" || vertical[i] == "OOO") {
      return [vertical[i][0], i, "v"];
    }
  }
  if (dia1 == "XXX" || dia1 == "OOO") {
    return [dia1[0], 1, "d1"];
  } else if (dia2 == "XXX" || dia2 == "OOO") {
    console.log("O wins");
    return [dia2[0]];
  }
  if (
    !arr
      .map((i) => i.join(""))
      .join("")
      .includes("-")
  ) {
    h2.innerHTML = "Game Draw!!!!";
    a = setTimeout(reset, 3000);
  }
}

function reset() {
  c = 1;
  //   console.log(c);
  clearTimeout(a);
  arr = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
  sec.innerHTML = "";
  hr1.style.display = "none";
  hr1.style.top = 0;
  hr1.style.left = 0;
  hr1.style.width = "100%";
  hr1.style.transform = "rotate(0deg)";
  hr1.style.transformOrigin = "0";
  hr2.style.display = "none";
  h2.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    sec.innerHTML += `<div class="notFixed" id=${i}></div>`;
  }
}

let h1 = document.querySelector("h1");
let span = document.querySelector("h1 > span");
span.addEventListener("click", function () {
  span.classList.toggle("span");
  h1.classList.toggle("h1");
  document.body.classList.toggle("body");
  sec.classList.toggle("sec");
  h2.classList.toggle("h2");
});

let btn = document.querySelector("button");
btn.addEventListener("click", reset);
