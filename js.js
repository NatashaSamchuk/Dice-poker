let dice = document.querySelector(".conteiner-dice");

dice.addEventListener("click", function(e){
    if(e.target.alt == "0"){
        alert("Необходимо бросить кости")
    }
    else{
        if(e.target.tagName == "IMG"){
            if(e.target.style.border == "4px solid green"){
                e.target.style.border = "";
            }
            else{
                e.target.style.border = "4px solid green";
            }
        }
    }
});

let arrayDice = ["img/dado-1.svg", "img/dado-2.svg", "img/dado-3.svg", "img/dado-4.svg", "img/dado-5.svg", "img/dado-6.svg"];


let imgs = document.querySelectorAll("img");
let index = 0; //счетчик хода

document.querySelector("#cast").addEventListener("click", castAllDice);

function castAllDice(){
    ++index;
    if(index <=3){
        for(const img of imgs){
            if(img.style.border != "4px solid green"){
                let i = Math.floor(Math.random() * 6);;
                img.src = arrayDice[i];
                img.alt = i+1;
            }
        }
    }
    else{
        alert("Уже сделано 3 броска. Сделайте выбор комбинации для записи результата");
    }
}

function result(){
    let arrayResult = [];
    for(const img of imgs){
        arrayResult.push(Number(img.alt));
    }
    return arrayResult
}

let trs1 = document.querySelectorAll("[data-player='player1']");
let table1 = document.querySelector("[data-table-player='player1']");

let trs2 = document.querySelectorAll("[data-player='player2']");
let table2 = document.querySelector("[data-table-player='player2']");

let trsNotSchoolTable1 = table1.querySelectorAll("[data-player1='notschool']");
let trsNotSchoolTable2 = table2.querySelectorAll("[data-player2='notschool']");

table1.addEventListener("click", function(e){
    trColor(e, trs1, "player1");
});
table2.addEventListener("click", function(e){
    trColor(e, trs2, "player2");
});

function trColor(event, array, attributeValue){
    if(attributeValue.slice(-1) == document.querySelector("h2").textContent.slice(-1)){
        for(const tr of array){
            tr.classList.remove("select");
        }
        if(event.target.parentElement.dataset.player == attributeValue){
            if(event.target.parentElement.classList.contains("combination")){
                alert("Эта комбинация уже заполнена");
            }
            else if(event.target.parentElement.classList.contains("select")){
                event.target.parentElement.classList.remove("select");
            }
            else{
                event.target.parentElement.classList.add("select");
            }
        }
    }
    else{
        alert('Сейчас играет ' + document.querySelector("h2").textContent);
    }
}

document.querySelector("#record").addEventListener("click", addPoints);


let i = 0;

function examinationI(i){
    console.log(table1.querySelector("[data-sum = 'allSum']").textContent)
    if(i == 34){
        if(table1.querySelector("[data-sum = 'allSum']").textContent > table2.querySelector("[data-sum = 'allSum']").textContent){
            alert("победил игрок1")
        }else if(table1.querySelector("[data-sum = 'allSum']").textContent < table2.querySelector("[data-sum = 'allSum']").textContent){
            alert("победил игрок2")
        }else{
            alert("ничья")
        }
    }
}

function addPoints(){
    let player = "player" + document.querySelector("h2").textContent.slice(-1);
    let selectTr = document.querySelector(".select");
    let resArr = result();
    let quantity = arrayOfInclusions(resArr);
    if(selectTr){
        i+=1;
        let combination = selectTr.children[0].textContent;
        if(Number(combination) == 1 || Number(combination) == 2 || Number(combination) == 3 || Number(combination) == 4 || Number(combination) == 5 || Number(combination) == 6){
            schoolPoints(combination, selectTr, resArr, quantity);
        }
        else{
            anotherCombinationPoints(selectTr, resArr, quantity);
        }
        table1.querySelector(".sumSchool").children[1].textContent = sumSchool(trs1);
        table2.querySelector(".sumSchool").children[1].textContent = sumSchool(trs2);
        table1.querySelector("[data-sum = 'allSum']").textContent = sumAllPoints (trs1, trsNotSchoolTable1);
        table2.querySelector("[data-sum = 'allSum']").textContent = sumAllPoints (trs2, trsNotSchoolTable2);
        examinationI(i);
    }
    else{
        if(imgs[0].alt == "0"){
            alert("Необходимо бросить кости")
        }
        else{
            alert("Выберите подходящую комбинацию для записи результата");
        }
    }
}

function schoolPoints(comb, tr, resArray, ar){
    let combinationNumber = Number(comb);
    if(resArray[0] == 0){
        return alert("Необходимо бросить кости");
    }
    else{
        let td = tr.children[1];
        td.textContent = (ar[combinationNumber-1] - 3) * combinationNumber;
        tr.classList.replace("select", "combination");
        zeroing ()
    }
}

function zeroing (){
    index = 0;
    if(Number(document.querySelector("h2").textContent.slice(-1)) == 1){
        document.querySelector("h2").textContent = "Игрок 2";
    }
    else{
        document.querySelector("h2").textContent = "Игрок 1";
    }
    for(const img of imgs){
        img.style.border = "none";
        img.alt = "0";
    }
}

function arrayOfInclusions(resArray){
    let arrOfInclusions = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < resArray.length; i++) {
        const element = resArray[i];
        arrOfInclusions[element-1] +=1;
    }
    return arrOfInclusions;
}

// selectTr - tr выделено желтым
//ar - количество по индексу
function anotherCombinationPoints(tr, resArray, ar){
    let points = 0;
    let maxPair = 0;
    let k = 1;
    let className = tr.dataset.typeCombination;
    if(resArray[0] == 0){
        return alert("Необходимо бросить кости");
    }
    else{
        switch (className) {

            case "pair":
                for (let i = 0; i < ar.length; i++) {
                    const element = ar[i];
                    if(element >=2){
                        maxPair = i +1;
                    }
                }
                points = 2 * maxPair;
                break;

            case "pair2":
                let arrayRepetitions = [];
                for (let i = 0; i < ar.length; i++) {
                    const element = ar[i];
                    if(element >= 4){
                        points = 4 * (i + 1);
                    }
                    else if(element >= 2){
                        arrayRepetitions.push(i + 1);
                    }
                }
                if(arrayRepetitions.length == 2){
                    points = 2 * (arrayRepetitions[0] + arrayRepetitions[1]);
                }
                break;

            case "triangle":
                for (let i = 0; i < ar.length; i++) {
                    const element = ar[i];
                    if(element >=3){
                        maxPair = i +1;
                    }
                }
                points = 3 * maxPair;
                break;

            case "quadrilateral":
                for (let i = 0; i < ar.length; i++) {
                    const element = ar[i];
                    if(element >=4){
                        maxPair = i +1;
                    }
                }
                points = 4 * maxPair;
                break;

            case "poker":
                for (let i = 0; i < ar.length; i++) {
                    const element = ar[i];
                    if(element == 5){
                        maxPair = i +1;
                    }
                }
                if(maxPair != 0){
                    points = 5 * maxPair + 50;
                }
                break;

            case "threeTwo":
                for(const element of ar){
                    if(element == 1){
                        k *= 0;
                    }
                }
                if(k == 1){
                    points = sum(resArray);
                }
                break;

            case "even":
                for(const res of resArray){
                    if(res%2 != 0){
                        k *= 0;
                    }
                }
                if(k == 1){
                    points = sum(resArray);
                }
                break;

            case "odd":
                for(const res of resArray){
                    if(res%2 != 1){
                        k *= 0;
                    }
                }
                if(k == 1){
                    points = sum(resArray);
                }
                break;

            case "bigStreet":
                for(let i = 1; i < ar.length; i++){
                    if(ar[i] != 1){
                        k *= 0;
                    }
                }
                if(k == 1){
                    points = 20;
                }
                break;

            case "littleStreet":
                for(let i = 0; i < ar.length-1; i++){
                    if(ar[i] != 1){
                        k *= 0;
                    }
                }
                if(k == 1){
                    points = 15;
                }
                break;

            case "chance":
                points = sum(resArray);
                break;
        }
        if(index == 1){
            points *= 2;
        }
        let td = tr.children[1];
        td.textContent = points;
        tr.classList.replace("select", "combination");
        zeroing ()
    }
}

function sum (arrayElements){
    let s = 0;
    for(const element of arrayElements){
        s += element;
    }
    return s;
}

function sumSchool(trs){
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        if(+trs[i].children[1].textContent != 0){
            sum += +trs[i].children[1].textContent;
        }
    }
    if(sum < 0){
        sum *= 10;
    }
    return sum
}

function sumAllPoints (trs, trsNotSchool){
    let sum = sumSchool(trs);
    for (let i = 0; i < trsNotSchool.length; i++) {
        if(+trsNotSchool[i].children[1].textContent != 0){
            sum += +trsNotSchool[i].children[1].textContent;
        }
    }
    return sum
}