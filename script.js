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

// 🔴🔴🔴 NEW: 自动让“Can I still be your Valentine...?” 贴近图片（丝滑）
function adjustQuestionSpacing() {
  requestAnimationFrame(() => {
    const imgHeight = mainImage.offsetHeight;
    const spacing = Math.max(6, 28 - imgHeight * 0.03); // 数字可微调
    questionText.style.marginTop = `${spacing}px`;
  });
}

// 🔴🔴🔴 NEW: 每次图片加载完再调一次（防止切图后晚一拍）
mainImage.onload = adjustQuestionSpacing;

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
  // 🔴🔴🔴 NEW: 上移距离变小 + 给求求你6阶段继续放大
  const maxMoveUp = 60;
  let moveUp = Math.min(clickCount * 12, maxMoveUp);

  // 默认缩放
  let imgScale = 1;

  // 只缩 求求你5 / 求求你6（让它们别太大）
  if (clickCount === 4) imgScale = 0.78;
  if (clickCount >= 5) imgScale = 0.72;

  // 🔴🔴🔴 NEW: 到求求你6阶段（第6/7/8/9...次）继续变大
  if (clickCount >= 6) {
    imgScale = Math.min(0.72 + (clickCount - 5) * 0.06, 1.20); 
    // 0.06 越大变大越快；1.20 是上限避免顶出屏幕
  }

  // 合并 transform（丝滑）
  mainImage.style.transform = `translateY(-${moveUp}px) scale(${imgScale})`;
  questionText.style.transform = `translateY(-${moveUp}px)`;


  // No 文案变化（前 5 次变化）
  if (clickCount <= 5) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // 图片变化（前 5 次变化）
if (clickCount === 1) {
  mainImage.src = "images/求求你2.png";
  adjustQuestionSpacing();
}

if (clickCount === 2) {
  mainImage.src = "images/求求你3.png";
  adjustQuestionSpacing();
}

if (clickCount === 3) {
  mainImage.src = "images/求求你4.png";
  adjustQuestionSpacing();
}

if (clickCount === 4) {
  mainImage.src = "images/求求你5.png";
  adjustQuestionSpacing();
}

if (clickCount >= 5) {
  mainImage.src = "images/求求你6.png";
  adjustQuestionSpacing();
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














