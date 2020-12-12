const colors = {
  "#04253A": 0,
  "#677DCD" : 1,
  "#E1DDBF" : 2,
  "#E4BC6D" : 3,
  "#87CCC1" : 4,
  "#F2655C" : 5,
  "#94E28D" : 6,
  "#BA87E1" : 7,
  "#048D97" : 8,
  "#F18AA3" : 9
};

// Making everything random
const topBgElements = document.querySelectorAll('.top-bg');
const bottomBgElements = document.querySelectorAll('.bottom-bg');
const randNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(function(a, b){return 0.5 - Math.random()});
let idx = 0;

topBgElements.forEach(topBgElement => {
  const randNum = randNumbers[idx++];
  topBgElement.setAttribute('data-color', Object.keys(colors).find(key => colors[key] === randNum));
  topBgElement.style.backgroundColor = Object.keys(colors).find(key => colors[key] === randNum);
})

bottomBgElements.forEach(bottomBgElement => {
  const randNum = randNumbers[idx++];
  bottomBgElement.setAttribute('data-color', Object.keys(colors).find(key => colors[key] === randNum));
  bottomBgElement.style.backgroundColor = Object.keys(colors).find(key => colors[key] === randNum);
})

const signInForm = document.querySelector('.sign-in-form');
const guiPassItems = document.querySelectorAll('.gui-pass-item');
const usernameInp = document.querySelector('.username');
const passwordInp = document.querySelector('.password');
const delCharBtn = document.querySelector('.del-char-btn');
const responseMsgContainer = document.querySelector('.response-msg-container');
let password = [];

guiPassItems.forEach(guiPassItem => {
  guiPassItem.addEventListener('click', () => {
    const topBg = guiPassItem.querySelector('.top-bg').getAttribute('data-color');
    const bottomBg = guiPassItem.querySelector('.bottom-bg').getAttribute('data-color');

    password.push(`(${colors[topBg]}|${colors[bottomBg]})`);
    passwordInp.value = `${passwordInp.value}*`;
    guiPassItem.classList.add('bordered');
    setTimeout(() => {
      guiPassItem.classList.remove('bordered')
    }, 250);
  })
})

delCharBtn.addEventListener('click', () => {
  password.pop();
  passwordInp.value = passwordInp.value.slice(0, -1);
})

const processLogin = data => {
  const inputUsername = usernameInp.value;
  let validLogin = false;

  data.forEach(eachUser => {
    const pattern = new RegExp(`^${password.join('')}$`);
    if(inputUsername == eachUser.username && pattern.test(eachUser.password)) {
      validLogin = true;
    }
  })

  if(validLogin) {
    responseMsgContainer.innerHTML = `<span class="response-msg success">Successfully logged in</span>`;
  } else {
    responseMsgContainer.innerHTML = `<span class="response-msg failure">Invalid username or password</span>`;
  }
}

signInForm.addEventListener('submit', e => {
  e.preventDefault();
  fetch('assets/json/users.json')
  .then(response => response.json())
  .then(data => processLogin(data))
})