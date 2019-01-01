queue()
    .defer(d3.csv, "data/schoolexamdata.csv")
    .await(makeGraphs);
    
function makeGraphs(error, schoolexamdata) {
    var ndx = crossfilter(schoolexamdata);
    
    schoolexamdata.forEach(function(d){
        d.enggrade = parseInt(d.enggrade);
        d.mathgrade= parseInt(d.mathgrade);
        d.scigrade= parseInt(d.scigrade);
        d.attendance= parseInt(d.attendance);
        
        
    })
    
    show_cohort_selector(ndx);
    
    show_gender_balance(ndx);
    
    show_english_grade_distribution(ndx);
    
    show_math_grade_distribution(ndx);
    
    show_age_to_english_grade_correlation(ndx);
    
    show_attendance_to_maths_grade_correlation(ndx);
    
    show_science_grade_distribution(ndx);
    
    show_history_grade_distribution(ndx);
    
    show_computing_grade_distribution(ndx);
    
    show_art_grade_distribution(ndx);
    
    show_food_grade_distribution(ndx); 
    
    dc.renderAll(); 
} 


// code for cohort selector showing how different cohorts are represented  by gender in the data //

function show_cohort_selector(ndx) {
    dim = ndx.dimension(dc.pluck('cohort'));
    group = dim.group();
    
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
        .xUnits(dc.units.ordinal)
        
        .xAxisLabel("Gender") 
        .yAxis().ticks(10);
        
   
} 

//code for achievement by English grade stacked bar chart//

        
function show_english_grade_distribution(ndx) {
    
    var dim = ndx.dimension(dc.pluck("gender"));
    
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
   
 //code for maths grade distribution stacked bar chart //
 
function show_math_grade_distribution(ndx) {
    
    var dim = ndx.dimension(dc.pluck("gender"));
    
    function gradeByGender(dimension, mathgrade) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.mathgrade == mathgrade) {
                    p.match++;
                }
                return p;
            },
    function (p, v) {
         p.total--;
                if(v.mathgrade == mathgrade) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
    }
    
    
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

//code for scatter diagram comparing english grade to age in weeks

function show_age_to_english_grade_correlation(ndx) {
    
    var genderColors = d3.scale.ordinal()
        .domain(["F", "M"])
        .range(["pink", "blue"]);
    
    var ageDim = ndx.dimension(dc.pluck("examage"));
    var gradeDim = ndx.dimension(function(d) {
       return [d.examage, d.enggrade, d.initials, d.gender];
    });
    
    
    var englishGradeGroup = gradeDim.group();
    
    var minAge = ageDim.bottom(1)[0].examage;
    var maxAge = ageDim.top(1)[0].examage;
    
    dc.scatterPlot("#age_to_english_grade_correlation")
        .width(600)
        .height(400)
        .x(d3.scale.linear().domain([minAge, maxAge]))
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10)
        .xAxisLabel("Exam age in years")
        .yAxisLabel("English Grade")
        .title(function(d) {
            return d.key[2];
        })
       .colorAccessor(function (d) {
            return d.key[3];
        })
        .colors(genderColors)
        .dimension(ageDim)
        .group(englishGradeGroup)
        .margins({top: 10, right: 50, bottom: 75, left: 75});
        
}

//code for scatter diagram comparing maths grade to attendance

function show_attendance_to_maths_grade_correlation(ndx) {
    
    var genderColors = d3.scale.ordinal()
        .domain(["F", "M"])
        .range(["pink", "blue"]);
    
    var attDim = ndx.dimension(dc.pluck("attendance"));
    var mathgradeDim = ndx.dimension(function(d) {
       return [d.attendance, d.mathgrade, d.initials, d.gender];
    });
    
    
    var mathGradeGroup = mathgradeDim.group();
    
    var minAtt = attDim.bottom(1)[0].attendance;
    var maxAtt = attDim.top(1)[0].attendance;
    
    dc.scatterPlot("#attendance_to_maths_grade_correlation")
        .width(600)
        .height(400)
        .x(d3.scale.linear().domain([minAtt, maxAtt]))
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10)
        .xAxisLabel("Attendance")
        .yAxisLabel("Math Grade")
        .title(function(d) {
            return d.key[2];
        })
       .colorAccessor(function (d) {
            return d.key[3];
        })
        .colors(genderColors)
        .dimension(attDim)
        .group(mathGradeGroup)
        .margins({top: 10, right: 50, bottom: 75, left: 75});
        
}

//science grades stacked bar chart

function show_science_grade_distribution(ndx) {
    
    var dim = ndx.dimension(dc.pluck("gender"));
    
    function gradeByGender(dimension, scigrade) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.scigrade == scigrade) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.scigrade == scigrade) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
    }
    
    
    var gradeOne = gradeByGender(dim, "1");
    var gradeTwo = gradeByGender(dim, "2");
    var gradeThree = gradeByGender(dim, "3");
    var gradeFour = gradeByGender(dim, "4");
    var gradeFive = gradeByGender(dim, "5");
    var gradeSix = gradeByGender(dim, "6");
    var gradeSeven = gradeByGender(dim, "7");
    var gradeEight = gradeByGender(dim, "8");
    var gradeNine = gradeByGender(dim, "9");
    
    
    dc.barChart("#science_grade_distribution")
        .width(300)
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

//History grades stacked bar chart

function show_history_grade_distribution(ndx) {
    
    var dim = ndx.dimension(dc.pluck("gender"));
    
    function gradeByGender(dimension, histgrade) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.histgrade == histgrade) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.histgrade == histgrade) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
    }
    
    
    var gradeOne = gradeByGender(dim, "1");
    var gradeTwo = gradeByGender(dim, "2");
    var gradeThree = gradeByGender(dim, "3");
    var gradeFour = gradeByGender(dim, "4");
    var gradeFive = gradeByGender(dim, "5");
    var gradeSix = gradeByGender(dim, "6");
    var gradeSeven = gradeByGender(dim, "7");
    var gradeEight = gradeByGender(dim, "8");
    var gradeNine = gradeByGender(dim, "9");
    
    
    dc.barChart("#history_grade_distribution")
        .width(300)
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

//Computer Science grades stacked bar chart

function show_computing_grade_distribution(ndx) {
    
    var dim = ndx.dimension(dc.pluck("gender"));
    
    function gradeByGender(dimension, csgrade) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.csgrade == csgrade) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.csgrade == csgrade) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
    }
    
    
    var gradeOne = gradeByGender(dim, "1");
    var gradeTwo = gradeByGender(dim, "2");
    var gradeThree = gradeByGender(dim, "3");
    var gradeFour = gradeByGender(dim, "4");
    var gradeFive = gradeByGender(dim, "5");
    var gradeSix = gradeByGender(dim, "6");
    var gradeSeven = gradeByGender(dim, "7");
    var gradeEight = gradeByGender(dim, "8");
    var gradeNine = gradeByGender(dim, "9");
    
    
    dc.barChart("#computing_grade_distribution")
        .width(300)
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

//Art grades stacked bar chart

function show_art_grade_distribution(ndx) {
    
    var dim = ndx.dimension(dc.pluck("gender"));
    
    function gradeByGender(dimension, artgrade) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.artgrade == artgrade) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.artgrade == artgrade) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
    }
    
    
    var gradeOne = gradeByGender(dim, "1");
    var gradeTwo = gradeByGender(dim, "2");
    var gradeThree = gradeByGender(dim, "3");
    var gradeFour = gradeByGender(dim, "4");
    var gradeFive = gradeByGender(dim, "5");
    var gradeSix = gradeByGender(dim, "6");
    var gradeSeven = gradeByGender(dim, "7");
    var gradeEight = gradeByGender(dim, "8");
    var gradeNine = gradeByGender(dim, "9");
    
    
    dc.barChart("#art_grade_distribution")
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

//Food Technology grades stacked bar chart

function show_food_grade_distribution(ndx) {
    
    var dim = ndx.dimension(dc.pluck("gender"));
    
    function gradeByGender(dimension, foodgrade) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.foodgrade == foodgrade) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.foodgrade == foodgrade) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
    }
    
    
    var gradeOne = gradeByGender(dim, "1");
    var gradeTwo = gradeByGender(dim, "2");
    var gradeThree = gradeByGender(dim, "3");
    var gradeFour = gradeByGender(dim, "4");
    var gradeFive = gradeByGender(dim, "5");
    var gradeSix = gradeByGender(dim, "6");
    var gradeSeven = gradeByGender(dim, "7");
    var gradeEight = gradeByGender(dim, "8");
    var gradeNine = gradeByGender(dim, "9");
    
    
    dc.barChart("#food_grade_distribution")
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

//code for chart of all students data

d3.text("data/schoolexamdata.csv", function(data) {
                var parsedCSV = d3.csv.parseRows(data);

                var container = d3.select("body")
                    .append("table")

                    .selectAll("tr")
                        .data(parsedCSV).enter()
                        .append("tr")

                    .selectAll("td")
                        .data(function(d) { return d; }).enter()
                        .append("td")
                        .text(function(d) { return d; })
                        .style("border", "1px black solid")
                        .style("padding", "5px")
                        .style("text-align","center")
                        .on("mouseover", function(){d3.select(this).style("background-color", "aliceblue")})
                        .on("mouseout", function(){d3.select(this).style("background-color", "white")})
                        .text(function(d){return d;})
                        .style("font-size", "12px");
            });