queue()
    .defer(d3.csv, "data/schoolexamdata.csv")
    .await(makeGraphs);
    
function makeGraphs(error, schoolexamdata) {
    var ndx = crossfilter(schoolexamdata);
    
    show_cohort_selector(ndx);
    
    show_gender_balance(ndx);
    
    dc.renderAll(); 
} 

// code for my bargraph  and cohort selector showing how genders are represented in the data //

function show_cohort_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('cohort'));
    var group = dim.group();
    
    dc.selectMenu("#cohort-selector")
        .dimension(dim)
        .group(group);
    
}

function show_gender_balance(ndx) {
    var dim = ndx.dimension(dc.pluck('gender'));
    var group = dim.group();
    
    dc.barChart("#gender-balance")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Gender")
        .yAxis().ticks(20);
} 