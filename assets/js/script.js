var moneyList = [
    0.01,
    1,
    5,
    10,
    25,
    50,
    75,
    100,
    200,
    300,
    400,
    500,
    750,
    1000,
    5000,
    10000,
    25000,
    50000,
    75000,
    100000,
    200000,
    300000,
    400000,
    500000,
    750000,
    1000000
];

for (var i = 0; i < 13; i++){
    var rowEl = $("<div>").addClass("row");

    var divOne = $("<div>").text("$" + formatNumber(moneyList[i])).val(moneyList[i]).addClass("col");
    var divTwo = $("<div>").text("$" + formatNumber(moneyList[i + 13])).val(moneyList[i+13]).addClass("col");
    
    rowEl.append(divOne, divTwo);
    $("#money-table").append(rowEl);
}

function formatNumber(num) {
    if(num>1)
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num;
}