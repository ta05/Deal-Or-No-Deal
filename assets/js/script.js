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
]

for (var i = 0; i < 13; i++){
    var rowEl = $("<tr>").addClass("row");

    var divOne = $("<td>").text("$" + formatNumber(moneyList[i])).val(moneyList[i]);
    var divTwo = $("<td>").text("$" + formatNumber(moneyList[i + 13])).val(moneyList[i+13]);
    
    rowEl.append(divOne, divTwo);
    $("tbody").append(rowEl);
}

function formatNumber(num) {
    if(num>1)
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num;
}
