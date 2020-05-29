var moneyList = [0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000];
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

var bankersOfferMeanSD = {
    1: [22.485, 8.385],
    2: [33.685,11.232],
    3: [44.87, 8.740],
    4: [52.46, 13.50],
    5: [63.745, 14.002],
    6: [72.75, 12.719],
    7: [74.98, 17.622],
    8: [80.92, 17.260],
    9: [78.88, 15.321]
};

var moneyValuesRemaining;
var totalCasesOpened;
var totalCases;
var remainingMoney;
var round;
var casesOpenedThisRound;
var hasPlayerSelectedCase;
var offer;
var counterOffer;
var winnings;

initialize();


function initialize() {
    createMoneyTable();
    assignVariables();
    assignCaseAmounts();
    createDealButtons();

    selectPlayersCase();
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

function assignVariables() {
    moneyValuesRemaining = moneyList.slice();
    totalCasesOpened = 0;
    totalCases = moneyList.length;
    remainingMoney = calcTotalMoneyAmount();
    round = 0;
    casesOpenedThisRound = 0;
    hasPlayerSelectedCase = false;
}

function assignCaseAmounts() {
    var values = moneyList.slice();
    for (var i = 26; i >= 1; i--){
        var randNum = Math.floor(Math.random() * values.length);
        var caseValue = values[randNum];

        $("#case-" + (i)).val(caseValue);

        values.splice(values.indexOf(caseValue), 1);
    }
}

function createDealButtons() {
    var dealEl = $("<button>").attr({ "id": "deal-btn", "data-offer": "no"}).text("DEAL");
    var noDealEl = $("<button>").attr({ "id": "no-deal-btn", "data-offer": "no" }).text("NO DEAL");
    var counterInput = $("<input>").attr("id", "counter-offer").text("Enter counteroffer");
    var counterEl = $("<button>").attr({ "id": "counter-btn", "data-offer": "no"}).text("COUNTER");
    $("#bankerInfo").append(dealEl, noDealEl, counterInput, counterEl);
}

function displayMyCase(el) {
    $("#your-case").addClass("chosen-case").text($(el).text()).val($(el).val());
    $(el).removeClass("not-clicked").addClass("players-case");
}

function removeSelectedCase(el) {
    totalCasesOpened++;
    casesOpenedThisRound++;
    remainingMoney -= parseFloat($(el).val());
    moneyValuesRemaining.splice(moneyValuesRemaining.indexOf(parseFloat($(el).val())), 1);
    console.log("Case Opened: " + $(el).text());
    console.log("Value: $" + formatNumber(parseFloat($(el).val())));
    $(el).removeClass("not-clicked").addClass("selected-case");
}

function selectPlayersCase() {
    $(".case").click(function () {
        if (!hasPlayerSelectedCase) {
            var $selectedCase = $(this);
            displayMyCase($selectedCase);
            hasPlayerSelectedCase = true;
            newRound();
        }
    });
}

function openCase(thisRound) {
    console.log("Round " + round);
    $(".case").click("not-clicked", function () {
        if (casesOpenedThisRound < numCasesOpenedPerRound[round] && thisRound === round) {
            var $selectedCase = $(this);
            removeSelectedCase($selectedCase);
            console.log("Number of Cases Opened This Round: " + casesOpenedThisRound);
            if (casesOpenedThisRound === numCasesOpenedPerRound[round])
                bankersOffer();
        }
    });
}

function bankersOffer() {
    var mean = bankersOfferMeanSD[round][0];
    var sd = bankersOfferMeanSD[round][1];

    var pvalue = Math.random() * 0.95 - 0.475;
    var z = percentile_z(pvalue);
    var ex = calcExpectedValue();
    var pi = ((z * sd) + mean);

    offer = Math.round((0.01*pi * ex) / 1000) * 1000;

    console.log("P-value: " + pvalue);
    console.log("z: " + z);
    console.log("Expected Value: $" + formatNumber(Math.round(ex)));
    console.log("Pi: " + pi);

    console.log("Banker's Offer: $" + formatNumber(offer));

    offerDeal(round);
}

function counterOffer(counter) {
    
}

function offerDeal(thisRound) {
    $("#deal-btn").attr("data-offer", "yes");
    $("#no-deal-btn").attr("data-offer", "yes");

    $("#deal-btn").click(function () {
        if (thisRound === round) {
            $("#deal-btn").attr("data-offer", "no");
            $("#no-deal-btn").attr("data-offer", "no");

            winnings = offer;
            console.log("Winnings: $" + formatNumber(winnings));
        }
    });

    $("#no-deal-btn").click(function () {
        if (thisRound === round) {
            $("#deal-btn").attr("data-offer", "no");
            $("#no-deal-btn").attr("data-offer", "no");

            newRound();
        }
    });

    $("#counter-btn").click(function() {
        if (thisRound === round) {
            
        }
    });
}

function selectFinalCase(thisRound) {
    console.log("Select your Final Case to take Home");
    $(".case").click(function () {
        if (thisRound === round) {
            winnings = parseFloat($(this).val());
            console.log("Case Opened: " + $(this).text());
            console.log("Winnings: $" + formatNumber(winnings));
        }
    });
}

function newRound() {
    console.log("New Round Called");
    round++;
    casesOpenedThisRound = 0;
    if (round <= 9)
        openCase(round);
    else
        selectFinalCase(round);
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
    return Math.sqrt(Math.pow(calcExpectedValue(), 2) - calcEX2());
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


function percentile_z(p) {
    var a0= 2.5066282,  a1=-18.6150006,  a2= 41.3911977,   a3=-25.4410605,
        b1=-8.4735109,  b2= 23.0833674,  b3=-21.0622410,   b4=  3.1308291,
        c0=-2.7871893,  c1= -2.2979648,  c2=  4.8501413,   c3=  2.3212128,
        d1= 3.5438892,  d2=  1.6370678, r, z;

    if (p>0.42) {
        r=Math.sqrt(-Math.log(0.5-p));
        z=(((c3*r+c2)*r+c1)*r+c0)/((d2*r+d1)*r+1);
    } else {
        r=p*p;
        z=p*(((a3*r+a2)*r+a1)*r+a0)/((((b4*r+b3)*r+b2)*r+b1)*r+1);
    }
    return z;
}

