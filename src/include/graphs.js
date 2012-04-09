window.onload = function () {
    //drawClassGradeBreakdown();
    drawStudentsClassStanding();
    menu();
    bindingsMenu();
	$("#classbreakdown").css("display","none");
    $("#otherBreakdown").css("display","none");

};

function menu() {
    $( "#menu" ).buttonset();
}

function bindingsMenu() {


    $("input[name='menu']").change(function(){
        if ($("input[name='menu']:checked").val() == 'yb') {
            $("#yourbreakdown").css("display","inline-block");
            $("#classbreakdown").css("display","none");
            $("#otherBreakdown").css("display","none");
        }
        // Code for handling value 'a'
        else if ($("input[name='menu']:checked").val() == 'cb') {
            $("#yourbreakdown").css("display","none");
            $("#classbreakdown").css("display","inline-block");
            $("#otherBreakdown").css("display","none");
        }
        // Code for handling value 'b'
        else {
            $("#yourbreakdown").css("display","none");
            $("#classbreakdown").css("display","none");
            $("#otherBreakdown").css("display","inline-block");
        }
        // Code for handling 'c'
    });
}

function filterClassTotalGrades(data) {
    var barData = [0,0,0,0,0,0,0,0,0,0];
    for(var score in data) {
        lscore = parseInt(data[score]);
        console.log(lscore);
        if(lscore < 10) {
            barData[0]++;
        }
        else if(lscore < 20) {
            barData[1]++;
        }
        else if(lscore < 30) {
            barData[2]++;
        }
        else if(lscore < 40) {
            barData[3]++;
        }
        else if(lscore < 50) {
            barData[4]++;
        }
        else if(lscore < 60) {
            barData[5]++;
        }
        else if(lscore < 70) {
            barData[6]++;
        }
        else if(lscore < 80) {
            barData[7]++;
        }
        else if(lscore < 90) {
            barData[8]++;
        }
        else {
            barData[9]++;
        }
    }
    return barData;
}

function drawOtherGradeBreakdown(data) {
    var r = Raphael("otherStanding"),
        pie = r.piechart(200, 200, 100, data, { legend: ["%%.%% 90-100", "%%.%% 80-89", "%%.%% 70-79", "%%.%% 60-69", "%%.%% 50-59", "%%.%% 40-49", "%%.%% 30-39", "%%.%% 20-29", "%%.%% 10-19", "%%.%% 0-9"], legendpos: "east"});

    r.text(260, 50, "Class Grade Breakdown").attr({ font: "20px sans-serif" });
    pie.hover(function () {
        this.sector.stop();
        this.sector.scale(1.1, 1.1, this.cx, this.cy);

        if (this.label) {
            this.label[0].stop();
            this.label[0].attr({ r: 7.5 });
            this.label[1].attr({ "font-weight": 800 });
        }
    }, function () {
        this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

        if (this.label) {
            this.label[0].animate({ r: 5 }, 500, "bounce");
            this.label[1].attr({ "font-weight": 400 });
        }
    });
}

function drawClassGradeBreakdown(data) {
    var r = Raphael("classStanding"),
        fin = function () {
            this.flag = r.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
        },
        fout = function () {
            this.flag.animate({opacity: 0}, 300, function () {this.remove();});
        },
        txtattr = { font: "12px sans-serif" };
        txtattr2 = { font: "16px sans-serif"};

    r.text(230,50, "Class Grade Breakdown").attr(txtattr2);
    r.text(50,317, "0-9%").attr(txtattr);
    r.text(89,317, "10%").attr(txtattr);
    r.text(128,317, "20%").attr(txtattr);
    r.text(167,317, "30%").attr(txtattr);
    r.text(206,317, "40%").attr(txtattr);
    r.text(245,317, "50%").attr(txtattr);
    r.text(284,317, "60%").attr(txtattr);
    r.text(323,317, "70%").attr(txtattr);
    r.text(362,317, "80%").attr(txtattr);
    r.text(406,317, "90-100%").attr(txtattr);

    r.barchart(25,50,400,280, data).hover(fin,fout);
}

function drawStudentsClassStanding() {
    var r = Raphael("yourStanding",420,1000),
        fin = function () {
            this.flag = r.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
        },
        fout = function () {
            this.flag.animate({opacity: 0}, 300, function () {this.remove();});
        },
        fin2 = function () {
            var y = [], res = [];
            for (var i = this.bars.length; i--;) {
                y.push(this.bars[i].y);
                res.push(this.bars[i].value || "0");
            }
            this.flag = r.popup(this.bars[0].x, Math.min.apply(Math, y), res.join(", ")).insertBefore(this);
        },
        fout2 = function () {
            this.flag.animate({opacity: 0}, 300, function () {this.remove();});
        },
        txtattr = { font: "12px sans-serif" };

    r.text(160, 10, "Single Series Chart").attr(txtattr);
    r.text(160, 250, "Multiline Series Stacked Chart").attr(txtattr);
    r.text(160, 500, "Multiple Series Chart").attr(txtattr);
    r.text(160, 750, "Multiline Series Stacked Chart\nColumn Hover").attr(txtattr);

    r.barchart(25, 10, 410, 220, [[55, 20, 13, 32, 5, 1, 2, 10]]).hover(fin, fout);
    r.hbarchart(25, 250, 410, 220, [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55]], {stacked: true}).hover(fin, fout);
    r.hbarchart(25, 500, 410, 220, [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55]]).hover(fin, fout);
    var c = r.barchart(25, 750, 410, 220, [[13, 11, 12, 5, 7, 6, 3, 10,12,14,14],[2, 4, 3, 10, 8, 9, 12, 5, 3, 1, 1]], {stacked: true, type: "soft"}).hoverColumn(fin2, fout2);
}