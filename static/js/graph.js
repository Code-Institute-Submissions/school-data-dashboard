queue()
    .defer(d3.csv, "data/schoolexamdata.csv")
    .await(makeGraphs);
    
function makeGraphs(error, schoolexamdata) {
    var ndx = crossfilter(schoolexamdata);
    
    show_cohort_selector(ndx);
    
    show_gender_balance(ndx);
    
    show_english_grade_distribution(ndx);
    
    show_math_grade_distribution(ndx);
    
    dc.renderAll(); 
} 

// code for cohort selector showing how different cohorts are represented  by gender in the data //

function show_cohort_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('cohort'));
    var group = dim.group();
    
    dc.selectMenu("#cohort-selector")
        .dimension(dim)
        .group(group);
    
}

//code for gender balance bargraph//

function show_gender_balance(ndx) {
    var dim = ndx.dimension(dc.pluck('gender'));
    var group = dim.group();
    
    dc.barChart("#gender-balance")
        .width(300)
        .height(400)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)//
        .elasticY(true)//
        .xAxisLabel("Gender")
        .yAxis().ticks(20);
        
   
} 

//code for achievement by English grade stacked bar chart//

        
        function show_english_grade_distribution(ndx) {
    
    function gradeByGender(dimension, enggrade) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.enggrade == enggrade) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.enggrade == enggrade) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
    }
    
    var dim = ndx.dimension(dc.pluck("gender"));
    var gradeOne = gradeByGender(dim, "1");
    var gradeTwo = gradeByGender(dim, "2");
    var gradeThree = gradeByGender(dim, "3");
    var gradeFour = gradeByGender(dim, "4");
    var gradeFive = gradeByGender(dim, "5");
    var gradeSix = gradeByGender(dim, "6");
    var gradeSeven = gradeByGender(dim, "7");
    var gradeEight = gradeByGender(dim, "8");
    var gradeNine = gradeByGender(dim, "9");
    
    
    dc.barChart("#english_grade-distribution")
        .width(400)
        .height(300)
        .dimension(dim)
        .group(gradeOne, "1")
        .stack(gradeTwo, "2")
        .stack(gradeThree, "3")
        .stack(gradeFour, "4")
        .stack(gradeFive, "5")
        .stack(gradeSix, "6")
        .stack(gradeSeven, "7")
        .stack(gradeEight, "8")
        .stack(gradeNine, "9")
        
        
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total) * 100;
            } else {
                return 0;
            }
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .legend(dc.legend().x(320).y(20).itemHeight(15).gap(5))
        .margins({top: 10, right: 100, bottom: 30, left: 30});
}
   
 //code for maths grade distribution //
 
        function show_math_grade_distribution(ndx) {
    
    function gradeByGender(dimension, mathgrade) {
        return dimension.group().reduce(
            function (s, t) {
                s.total++;
                if(t.mathgrade == mathgrade) {
                    s.match++;
                }
                return s;
            },
            function (s, t) {
                s.total--;
                if(t.mathgrade == mathgrade) {
                    s.match--;
                }
                return ;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
    }
    
    var dim = ndx.dimension(dc.pluck("gender"));
    var gradeOne = gradeByGender(dim, "1");
    var gradeTwo = gradeByGender(dim, "2");
    var gradeThree = gradeByGender(dim, "3");
    var gradeFour = gradeByGender(dim, "4");
    var gradeFive = gradeByGender(dim, "5");
    var gradeSix = gradeByGender(dim, "6");
    var gradeSeven = gradeByGender(dim, "7");
    var gradeEight = gradeByGender(dim, "8");
    var gradeNine = gradeByGender(dim, "9");
    
    
    dc.barChart("#math_grade_distribution")
        .width(400)
        .height(300)
        .dimension(dim)
        .group(gradeOne, "1")
        .stack(gradeTwo, "2")
        .stack(gradeThree, "3")
        .stack(gradeFour, "4")
        .stack(gradeFive, "5")
        .stack(gradeSix, "6")
        .stack(gradeSeven, "7")
        .stack(gradeEight, "8")
        .stack(gradeNine, "9")
        
        
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total) * 100;
            } else {
                return 0;
            }
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .legend(dc.legend().x(320).y(20).itemHeight(15).gap(5))
        .margins({top: 10, right: 100, bottom: 30, left: 30});
}

