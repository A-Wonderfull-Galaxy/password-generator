// Assignment code here
//the global data
var charPool = [];
var userData = {
  pswrdLength: 0,
  isUppercase: null,
  isLowercase: null,
  isNumeric: null,
  isSymbol: null,
};

//get length function
var getLength = function(){
  var length = window.prompt("How many characters would you like your password to have? Choose 8 to 128 characters long");
  length = parseInt(length);
  userData.pswrdLength = length;

  if (userData.pswrdLength < 8 || userData.pswrdLength > 128){
    window.alert("Your password can only be between 8 and 128 characters, please enter again")
    getLength();
  }
}

//get if user wants upper lower number and symbol in there password
var getUserCharSelect = function(){
  getLength();
  userData.isUppercase = window.confirm("Click ok if you would like your password to include: Uppercase characters?");
  userData.isLowercase = window.confirm("Click ok if you would like your password to include: Lowercase characters?");
  userData.isNumeric = window.confirm("Click ok if you would like your password to include: Numeric characters?");
  userData.isSymbol = window.confirm("Click ok if you would like your password to include: Special Symbols?");

  if (userData.isUppercase === false && userData.isLowercase === false && userData.isNumeric === false && userData.isSymbol === false){
    window.alert("You need to pick at least one condition, please try again.");
    getUserCharSelect();
  }
}

//random characters and push them to the character pool
var getRandomUpper = function(){
  var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",];
  var randomUpperCase = upperCase[Math.floor(Math.random() * upperCase.length)];
  charPool.push(randomUpperCase);
} 

var getRandomLower = function(){
  var lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",];
  var randomLowerCase = lowerCase[Math.floor(Math.random() * lowerCase.length)];
  charPool.push(randomLowerCase);
}

var getRandomNumber = function(){
  var number = [0, 1, 2, 3, 4, 5, 6, 7, 8,9,];
  var randomNumber = number[Math.floor(Math.random() * number.length)];
  charPool.push(randomNumber);
}

var getRandomSymbol = function(){
  var symbol = ["!", "@", "#", "$", "%", "^", "&", "*", "/", "-", "+", ",", ".",]
  var randomSymbol = symbol[Math.floor(Math.random() * symbol.length)];
  charPool.push(randomSymbol);
}

//generate global characters for the pool with enough characters to fit with the user request
var getAllChar = function(){
  while (charPool.length < userData.pswrdLength){
    if (userData.isUppercase === true){
      getRandomUpper();
    }
    if(userData.isLowercase === true){
      getRandomLower();
    }
    if(userData.isNumeric === true){
      getRandomNumber();
    }
    if(userData.isSymbol === true){
      getRandomSymbol();
    }
  }
}

//turn my pool array into password string to be sent to the DOM
var concatPassword = function(){
  var password = [];
  while(password.length < userData.pswrdLength) {
    var character = charPool[Math.floor(Math.random() * charPool.length)];
    var index = charPool.indexOf(character);
    if (index > -1){
      var singleChar = charPool.splice(index, 1);
      password.push(singleChar[0]);
    }
  }
  password = password.join('');
  return password;
}

//main function, fired on button click
var generatePassword = function(){
  getUserCharSelect();
  getAllChar();
  var finalPassword = concatPassword();

  //reset character pool for more passwords
  charPool = [];

  return finalPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
