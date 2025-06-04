const result = document.getElementById("result");
const submit = document.getElementById("submit");

let number = document.getElementById("number");
let lowercase = document.getElementById("lowercase");
let upercase = document.getElementById("upercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");


submit.onclick = function(){
    result.value = generate_password(number.value, lowercase.checked, upercase.checked, numbers.checked, symbols.checked)
}

function generate_password(numC, inLowercase, inUpercase, inNumbers, inSymbols){
    let password = "";
    let lower = ['a','b','d','e','f','g','h','i','j','k','l','m','o','p','q','r','s','t','u','v','x','y','z']
    let upper = ['A','B','D','E','F','G','H','I','J','K','L','M','O','P','Q','R','S','T','U','V','X','Y','Z']
    let numbers = ['1','2','3','4','5','6','7','8','9','0'];
    let symbolChars = ['!','@','#','$','%','^','&','*','(',')','-','_','=','+','[',']','{','}',';',':','"',"'","<",">",",",".","?","/","|","\\","~","`"];
    let charPool = [];
    if (inLowercase) charPool = charPool.concat(lower);
    if (inUpercase) charPool = charPool.concat(upper);
    if (inNumbers) charPool = charPool.concat(numbers);
    if (inSymbols) charPool = charPool.concat(symbolChars);
    if (charPool.length === 0) return "";
    console.log(charPool);
    for(let i = 0; i< numC; i++){
        let indice = Math.floor(Math.random() * charPool.length);
        console.log(indice);
        password += charPool[indice];
    }
    return password;
}