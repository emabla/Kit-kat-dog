const board = document.querySelector(".board")
const results = document.querySelector(".result")
const restart = document.querySelector("#restart")
const reset = document.querySelector("#reset")
const catCount = document.querySelector(".catNumber")
const dogCount = document.querySelector(".dogNumber")

let start= "cat"
results.textContent=""
let catWinns = 0
let dogWinns = 0
let numberOfMoves = 0

function appendFields() {
    for (let i = 0; i < 9; i++) {
        const field = document.createElement("div");
        field.className ="field";
        field.id = "field" + (i+ 1)
        field.addEventListener("click",addCharacter)
        board.append(field)
        }
    }

appendFields()

function addCharacter (e) {
    const addCharacterToClickedField = e.target
    const div = document.createElement("div");
    addCharacterToClickedField.append(div)
    div.className=start
    start = start === "cat" ? "dog" : "cat"
    addCharacterToClickedField.removeEventListener("click", addCharacter)
    checkScore()
    }

const allFields = document.querySelectorAll(".field")

function checkScore() {
    const winingCombinations = [
        [1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9], [3,5,7]
    ]

    winingCombinations.forEach(combination => {
        const catWinngCombination = combination.every(cell => allFields[cell-1].firstChild?.classList.contains("cat") )
        const dogWiningCombination = combination.every(cell => allFields[cell-1].firstChild?.classList.contains("dog"))

        if(catWinngCombination ) {
            results.textContent="Cat wins!"
            allFields.forEach(field => {
                field.removeEventListener("click", addCharacter)})
            catWinns++;
            catCount.textContent = catWinns;
            }
        if(dogWiningCombination) {
            results.textContent="Dog wins!"
            allFields.forEach(field => {
                field.removeEventListener("click", addCharacter)})
            dogWinns++;
            dogCount.textContent = dogWinns;
            }
        })
        numberOfMoves++ 
        if (results.textContent === "" && numberOfMoves === 9) {
            results.textContent = "Tie!";
        }
            }


restart.addEventListener("click",restartTable)
    function restartTable() {
        allFields.forEach(field => {
            results.textContent=""
            field.innerHTML= "";
               field.addEventListener("click", addCharacter); 
             numberOfMoves=0
        })
    }

reset.addEventListener("click", resetTable)
    function resetTable () {
        allFields.forEach(field => {
            field.innerHTML= "";
            field.addEventListener("click", addCharacter);
            results.textContent=""
            catWinns = 0
            dogWinns = 0
            catCount.textContent = catWinns
            dogCount.textContent = dogWinns
            numberOfMoves=0
        })
    }

