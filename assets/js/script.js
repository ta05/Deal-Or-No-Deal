var moneyList = [0.01,1,5,10,25,50,75,100,200,300,400,500,750,1000,5000,10000,25000,50000,75000,100000,200000,300000,400000,500000,750000, 1000000];
var casesOpened;
var totalMoneyRemaining;
var roundNum;
var numCasesPerRound = [6, 5, 4, 3, 2, 1, 1, 1, 1];

initialize();


function initialize() {
    createMoneyTable();
    assignCaseAmounts();
}

function createMoneyTable() {
    for (var i = 0; i < 13; i++) {
        var rowEl = $("<div>").addClass("row");

        var divOne = $("<div>").text("$" + formatNumber(moneyList[i])).val(moneyList[i]).addClass("col");
        var divTwo = $("<div>").text("$" + formatNumber(moneyList[i + 13])).val(moneyList[i + 13]).addClass("col");
    
        rowEl.append(divOne, divTwo);
        $("#money-table").append(rowEl);
    }
}

function assignCaseAmounts() {
    var values = moneyList.slice();
    for (var i = 26; i >= 1; i--){
        var randNum = Math.floor(Math.random() * values.length);
        var caseValue = values[randNum];

        $("#case-" + (i)).attr("value", caseValue);

        values.splice(values.indexOf(caseValue), 1);
    }
}

function pickMyCase(el) {
    $("#your-case").addClass("chosen-case").text($(el).text()).val($(el).val());
    $(el).removeClass("not-clicked").addClass("players-case");
}

function selectCase(el) {
    casesOpened--;
    remainingMoney -= parseFloat($(el).val());
    $(el).removeClass("not-clicked").addClass("selected-case");
}

function formatNumber(num) {
    if(num>1)
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num;
}