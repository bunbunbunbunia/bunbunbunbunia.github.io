let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

const params = new URLSearchParams(window.location.search);
let username = params.get("name");

// 限制用户名长度，避免页面样式崩坏
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "???";

// 防止 `null` 变成 `"null"`
if (username) {
  questionText.innerText = questionText.innerText + safeUsername;
}

const preloadImages = [
  "./images/求求你2.png",
  "./images/求求你3.png",
  "./images/求求你4.png",
  "./images/求求你5.png",
  "./images/求求你6.png",
];

preloadImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});


let clickCount = 0; // 记录点击 No 的次数

// No 
const noTexts = [
  "leave me alone bitch",
  "nop😒",
  "i’m not ready to forgive you😒",
  "hmm say sorry one more time?",
  "fine i guess i miss you a little too🙄",
];

// No 按钮点击事件
noButton.addEventListener("click", function () {
  clickCount++;

  // 让 Yes 变大，每次放大 2 倍
  let yesSize = 1 + clickCount * 1.2;
  yesButton.style.transform = `scale(${yesSize})`;

  // 挤压 No 按钮，每次右移 50px
  let noOffset = clickCount * 50;
  noButton.style.transform = `translateX(${noOffset}px)`;

  // 让图片和文字往上移动
  const maxMoveUp = 120;
 let moveUp = Math.min(clickCount * 25, maxMoveUp);
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;

  // No 文案变化（前 5 次变化）
  if (clickCount <= 5) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // 图片变化（前 5 次变化）
if (clickCount === 1) {
  mainImage.src = "images/求求你2.png";
  questionText.style.marginTop = "20px";
  mainImage.style.scale = "1";
}

if (clickCount === 2) {
  mainImage.src = "images/求求你3.png";
  questionText.style.marginTop = "20px";
  mainImage.style.scale = "1";
}

if (clickCount === 3) {
  mainImage.src = "images/求求你4.png";
  questionText.style.marginTop = "20px";
  mainImage.style.scale = "1";
}

if (clickCount === 4) {
  mainImage.src = "images/求求你5.png";
  questionText.style.marginTop = "8px";
  mainImage.style.scale = "0.78";   // ← 只缩这张
}

if (clickCount >= 5) {
  mainImage.src = "images/求求你6.png";
  questionText.style.marginTop = "8px";
  mainImage.style.scale = "0.72";   // ← 只缩最后一张
}

});

// Yes 按钮点击后，进入表白成功页面
const loveTest = `咪天宏！！！<br>我爱你！！！！( >᎑<)♡︎ᐝ  ${
  username ? `${safeUsername}  ♡︎ᐝ(>᎑< )` : ""
}`;

yesButton.addEventListener("click", function () {
  // 先创建基础 HTML 结构
  document.body.innerHTML = `
        <div class="yes-screen">
            <img src="images/和好啦.png" alt="" class="yes-image">
            <h1 class="yes-text"></h1>
        </div>
    `;

  // 确保用户名安全地插入
  document.querySelector(".yes-text").innerHTML = loveTest;


  // 禁止滚动，保持页面美观
  document.body.style.overflow = "hidden";

});













