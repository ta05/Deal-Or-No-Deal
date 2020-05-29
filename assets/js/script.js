var moneyList = [0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000];
var moneyValuesRemaining;
var totalCasesOpened;
var totalCases;
var remainingMoney;
var round;
var casesOpenedThisRound;
var numCasesOpenedPerRound = {
    1: 6,
    2: 5,
    3: 4,
    4: 3,
    5: 2,
    6: 1,
    7: 1,
    8: 1,
    9: 1
};
var gameState;
var hasPlayerSelectedCase;

initialize();

function gameFlow() {
    switch (gameState) {
        case 0:
            while (!hasPlayerSelectedCase) {
                $(".case").click(function () {
                    var $selectedCase = $(this);
                    pickMyCase($selectedCase);
                    hasPlayerSelectedCase = true;
                });
            }
            gameState = 1;
            gameFlow();
            break;
        case 1:
            while (casesOpenedThisRound < numCasesOpenedPerRound[round]) {
                $(".case").click(".not-clicked", function () {
                    var $selectedCase = $(this);
                    selectCase($selectedCase);
                });
            }
            gameState = 2;
            
    };
}

function initialize() {
    createMoneyTable();
    assignCaseAmounts();
    moneyValuesRemaining = moneyList.slice();
    gameState = 0;
    hasPlayerSelectedCase = false;
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
    totalCasesOpened = 0;
    totalCases = moneyList.length;
    remainingMoney = calcTotalMoneyAmount();

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
    round = 1;
}

function selectCase(el) {
    totalCasesOpened++;
    casesOpenedThisRound++;
    remainingMoney -= parseFloat($(el).val());
    moneyValuesRemaining.splice(moneyValuesRemaining.splice($(el).val(), 1));
    $(el).removeClass("not-clicked").addClass("selected-case");
}

function calcExpectedValue() {
    return remainingMoney / (totalCases - totalCasesOpened);
}

function calcEX2() {
    var ex2 = 0;
    for (var i = 0; i < moneyValuesRemaining.length; i++)
        ex2 += Math.pow(moneyValuesRemaining[i], 2);
    return ex2;
}

function calcStandardDeviation() {
    return Math.pow(calcExpectedValue(), 2) - calcEX2();
}

function calcTotalMoneyAmount() {
    var amount = 0;
    for (var i = 0; i < moneyList.length; i++)
        amount += moneyList[i];
    return amount;
}

function formatNumber(num) {
    if(num>1)
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num;
}
