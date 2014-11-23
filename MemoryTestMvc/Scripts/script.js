var btn0;
var btn1;
var btn2;
var btn3;
var btn4;
var btnsList;
var btnStart;
var randomNumbers = [];
var userNumbers = [];
var numberTrys = 0;
var result;
var interval = 1000;

$("document").ready(function () {
    var btnPlay = $("#btnPlay");
    var btnSet = $("#set");
    result = $("#result");
    var bntGetNums = $("#btnGetNums");
    var randomNumbersList = [];
    btnStart = $("#btnStart");

    btnPlay.button();

    bntGetNums.click(function () { //sample for check random location function
        var text = "x";

        for (var i = 0; i < 5; i++) {
            text += userNumbers[i];
        }

        test.val(text);
    });

    btnStart.click(function () { //set new random numbers and location on exists buttons
        var locationList = GetRandomLocation();
        SetRandomNumbers();
        result.val("");

        btnStart.button("option", "disabled", true);

        btnsList = [btn0, btn1, btn2, btn3, btn4];

        SetLocationAndNumbers(locationList, false);
    });

    btnPlay.click(function () { //get buttons from server and set random numbers and location
        $("#content").load('Home/StartGame', null, function () {
            var locationList = GetRandomLocation();
            SetRandomNumbers();
            numberTrys = 0;

            btnPlay.hide();



            btnStart.show();
            btnStart.button();
            btnStart.button("option", "disabled", true);

            btn0 = $("#btn0");
            btn1 = $("#btn1");
            btn2 = $("#btn2");
            btn3 = $("#btn3");
            btn4 = $("#btn4");

            btnsList = [btn0, btn1, btn2, btn3, btn4];

            SetLocationAndNumbers(locationList, true);

            btn0.click(function () {
                userNumbers.push(this.value);
                btn0.button("disable");
                numberTrys++;
                Check();
            });

            btn1.click(function () {
                userNumbers.push(this.value);
                btn1.button("disable");
                numberTrys++;
                Check();
            });

            btn2.click(function () {
                userNumbers.push(this.value);
                btn2.button("disable");
                numberTrys++;
                Check();
            });

            btn3.click(function () {
                userNumbers.push(this.value);
                btn3.button("disable");
                numberTrys++;
                Check();
            });

            btn4.click(function () {
                userNumbers.push(this.value);
                btn4.button("disable");
                numberTrys++;
                Check();
            });
        });
    });

    $("#setInterval").click(function () {
        interval = $("#interval").value.toNumber();
    });
});

function SetLocationAndNumbers(locationList, first) { //resets location and numbers
    for (var i = 0; i < locationList.length; i++) {
        btnsList[i].css({ "color" : "darkgreen", "top": locationList[i][0], "left": locationList[i][1], "padding" : "0" });
        btnsList[i].val(randomNumbers[i]);

        if (first) { btnsList[i].button(); } else { btnsList[i].button("destroy"); btnsList[i].button(); }

        if (btnsList[i].button("option", "disabled")) {
            btnsList[i].button("refresh");
            btnsList[i].button("enable");
        }
    }

    setTimeout(function () {
        for (var i = 0; i < 5; i++) {
            btnsList[i].css("color", "transparent");
        }
    }, interval);
}

function Check() { // compare users and random lists and shows the result
    var isTrue = true;

    if (numberTrys === 5) {
        randomNumbers.sort();

        for (var i = 0; i < 5; i++) {
            if (randomNumbers[i] != userNumbers[i]) { isTrue = false; }
        }

        if (isTrue) { result.val("RIGHT"); result.css("color", "green"); } else { result.val("WRONG"); result.css("color", "red"); }

        btnStart.button("option", "disabled", false);
    }
}

function SetRandomNumbers() { //sets list with random numbers
    randomNumbers.length = 0;
    userNumbers.length = 0;
    numberTrys = 0;

    for (var i = 0; i < 5; i++) {

        var randomNumber = Math.floor(Math.random() * 9) + 1;
        var isContain = true;

        for (var j = 0; j < randomNumbers.length; j++) {
            if (randomNumbers[j] === randomNumber) {
                isContain = false;
                i--;
            }
        }

        if (isContain) { randomNumbers.push(randomNumber); }
    }
}

function GetRandomLocation() { //returns list with random location
    var locationList = [];

    while (locationList.length < 5) {
        var position = [];

        var number = Math.floor(Math.random() * 8);
        position.push(number * 50 + 50);

        number = Math.floor(Math.random() * 8);
        position.push(number * 50 + 50);

        var repeat = true;

        for (var i = 0; i < locationList.length; i++) {
            if ((locationList[i][0] === position[0]) & (locationList[i][1] === position[1])) { repeat = false; }
        }

        if (repeat) {
            locationList.push(position);
        }
    }

    return locationList;
}