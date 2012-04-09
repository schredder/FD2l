window.onload = function () {
    drawClassGradeBreakdown();
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

function drawClassGradeBreakdown() {
    var r = Raphael("classStanding"),
        pie = r.piechart(200, 200, 100, [10, 20, 13, 32, 5], { legend: ["%%.%% A", "%%.%% B", "%%.%% C", "%%.%% D", "%%.%% F"], legendpos: "east"});

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

function drawStudentsClassStanding() {
    var r = Raphael("yourStanding"),
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
    r.text(480, 10, "Multiline Series Stacked Chart").attr(txtattr);
    r.text(160, 250, "Multiple Series Chart").attr(txtattr);
    r.text(480, 250, "Multiline Series Stacked Chart\nColumn Hover").attr(txtattr);

    r.barchart(10, 10, 300, 220, [[55, 20, 13, 32, 5, 1, 2, 10]]).hover(fin, fout);
    r.hbarchart(330, 10, 300, 220, [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55]], {stacked: true}).hover(fin, fout);
    r.hbarchart(10, 250, 300, 220, [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55]]).hover(fin, fout);
    var c = r.barchart(330, 250, 300, 220, [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55]], {stacked: true, type: "soft"}).hoverColumn(fin2, fout2);
}