let firstValue = 0;
let secondValue = 0;
let calculationResult = 0;
let currentAnswer = 0;
let currentOperator = "";
let isSavingSecondValue = false;
let isContinuingCalculation = false;

const calculatorOperations = ["*","+","-","^","*","÷"];

let buttons = document.querySelectorAll('.calculator-button');
let calculatorQuestion = document.querySelector('#calculations-asked');
let calculatorAnswer = document.querySelector('#calculations-answer');

let addValues = () => {
    currentAnswer = firstValue + secondValue;
};
let subtractValues = () => {
    currentAnswer = firstValue - secondValue;

};
let multiplyValues = () => {
    currentAnswer = firstValue * secondValue;
};
let exponentCalulate = () => {
    currentAnswer = firstValue ** secondValue;
    
};
divideValues = () => {
    currentAnswer = firstValue/secondValue;
};

let updateAnswer = () => {
    secondValue = calculatorQuestion.textContent.slice(calculatorQuestion.textContent.indexOf(currentOperator) + 1,calculatorQuestion.textContent.length)
                secondValue = parseFloat(secondValue);
                if(currentOperator === "+"){
                    addValues();
                }
                if(currentOperator === "-"){
                    subtractValues();
                }
                if(currentOperator === "*"){
                    multiplyValues();
                }
                if(currentOperator === "÷"){
                    divideValues();
                }
                if(currentOperator === "^"){
                    exponentCalulate();
                }
                
                calculatorAnswer.textContent = currentAnswer.toString();
                isContinuingCalculation = true;
}

for (let button of buttons) {
    button.addEventListener('click', function () {
        button.classList.add('animation-add');

        setTimeout(() => {
            button.classList.remove('animation-add');
        },500)
        button.textContent = button.textContent.replace(/\s+/g, "");

        if (button.textContent === "AC"){
            calculatorQuestion.textContent = "";
            calculatorAnswer.textContent = "";
            firstValue = 0;
            secondValue = 0;
            isSavingSecondValue = false;
            isContinuingCalculation = false;
        }
        else if(button.textContent === "DEL"){
           // if(button.textContent.slice(-1) =)
           calculatorQuestion.textContent = calculatorQuestion.textContent.slice(0, -1);
           if(calculatorOperations.includes(calculatorQuestion.textContent.slice(-1))){
            firstValue = 0;
            isSavingSecondValue = false;
            isContinuingCalculation = false;
            calculatorAnswer.textContent = "";
           }
            
            if(isContinuingCalculation){
                updateAnswer();
            }
        }
        else if(button.textContent === "%"){
            calculatorQuestion.textContent = calculatorQuestion.textContent + button.textContent;
            
           
            if(isContinuingCalculation ){
                secondValue = calculatorQuestion.textContent.slice(calculatorQuestion.textContent.indexOf(currentOperator) + 1,calculatorQuestion.textContent.length)
                secondValue = parseFloat(secondValue)/100;
                calculatorQuestion.textContent = firstValue.toString() + currentOperator + secondValue.toString();
                updateAnswer();
            }
            else{
 firstValue = parseFloat(calculatorQuestion.textContent.slice(0,-1))/100;
 calculatorQuestion.textContent = firstValue.toString();
            }
            
            
        }
        else if(calculatorOperations.includes(button.textContent)){
            if(isContinuingCalculation){
                firstValue = currentAnswer;
                secondValue = 0;
                
                calculatorQuestion.textContent = currentAnswer.toString();
                
            }
            for (let i = 0; i < calculatorQuestion.textContent.length; i++) { 
                if(calculatorOperations.includes(calculatorQuestion.textContent[i])){
                    alert("Cannot have two operators consecutively!");
                    return;
                }
            };
            
            firstValue = parseFloat(calculatorQuestion.textContent);
            currentOperator = button.textContent;
            isSavingSecondValue = true;
            calculatorQuestion.textContent = calculatorQuestion.textContent + button.textContent;
            
           }

           else if(button.textContent === "="){
            calculatorAnswer.textContent = "";
            calculatorQuestion.textContent = currentAnswer.toString();
           }

           else{
            calculatorQuestion.textContent = calculatorQuestion.textContent + button.textContent;
            firstValue = parseFloat(calculatorQuestion.textContent);
            if(isSavingSecondValue){
                updateAnswer();
            }
           }
     
    })
}

        