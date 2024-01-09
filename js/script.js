var tr =  $('tbody tr');
var ageIndex = 3;
var heightIndex = 4;
var statusIndex = 5;

function styleTableContent(tableContentShow){
    var arrayContentShow = [];
    for(var i = 0; i < tableContentShow.length; i++){
        if(tableContentShow[i].style.display != 'none'){
            arrayContentShow.push(tableContentShow[i]);
            for(var arr in arrayContentShow){
                if(arr%2 == 0){
                    arrayContentShow[arr].style.background = "#fff";
                }
                else{
                    arrayContentShow[arr].style.background = "#40513b14";
                }

            }
        }
    }
}

function showTr(tr , flag){
    if(flag){
        tr.style.display = "table-row";
        $('table thead ').show();
    }else{
        tr.style.display = "none";
        $('table thead  ').show();
    }
}

function getDataTable(){
    var arr = [];
    var table_content = [];
    if($("#Status").prop('checked')) {
        for(var i = 0; i < tr.length; i++){
            var text_addition = tr[i].getElementsByTagName('td')[statusIndex].textContent;
            if(text_addition == "Active"){
                arr.push(tr[i])
                table_content = arr;
                showTr(tr[i] , true)
            }else{
                showTr(tr[i] , false)
            }
        }
        arr = []
    }else{
        table_content =  tr;
    }
    styleTableContent(table_content)
    return table_content
}

function checkRangeDataTable(){
    var table_content =  getDataTable();
    for(var i = 0; i < table_content.length; i++){
        var ageContent =  table_content[i].getElementsByTagName('td')[ageIndex].textContent;
        var heightContent =  table_content[i].getElementsByTagName('td')[heightIndex].textContent;
        var minAge = $( "#min-age" ).val();
        var maxAge = $( "#max-age" ).val();
        var minheight = $( "#min-height" ).val();
        var maxheight = $( "#max-height" ).val();
        if(parseInt(ageContent) >= parseInt(minAge) && parseInt(ageContent) <= parseInt(maxAge)  && parseInt(heightContent) >= parseInt(minheight) && parseInt(heightContent) <= parseInt(maxheight)){
            showTr(table_content[i] , true)
        }else{
            showTr(table_content[i] , false)
        }
    }
    styleTableContent(table_content)
}



$("#Status").change(function() {
    checkRangeDataTable();
});

$( "#slider-range-age" ).slider({
    range: true,
    min: 0.0,
    max: 120.0,
    step: 1,
    values: [ 0.0, 120.0 ],

    slide: function( event, ui ) {
        $( "#min-age" ).val( ui.values[ 0 ]);
        $( "#max-age" ).val( ui.values[ 1 ]);
        checkRangeDataTable();
    }
});
$( "#min-age" ).val($( "#slider-range-age" ).slider( "values", 0 ));
$( "#max-age" ).val($( "#slider-range-age" ).slider( "values", 1 ));
$("#min-age").keyup(function() {
    $("#slider-range-age").slider('values',0,$(this).val());
    checkRangeDataTable();
});
$("#max-age").keyup(function() {
    $("#slider-range-age").slider('values',1,$(this).val());
    checkRangeDataTable();
});

$( "#slider-range-height" ).slider({
    range: true,
    min: 100.0,
    max: 200.0,
    step: 1,
    values: [ 100.0, 200.0 ],
    slide: function( event, ui ) {
        $( "#min-height" ).val( ui.values[ 0 ]);
        $( "#max-height" ).val( ui.values[ 1 ]);
        checkRangeDataTable();
    }
});
$( "#min-height" ).val($( "#slider-range-height" ).slider( "values", 0 ));
$( "#max-height" ).val($( "#slider-range-height" ).slider( "values", 1 ));
$("#min-height").keyup(function() {
    $("#slider-range-height").slider('values',0,$(this).val());
    checkRangeDataTable();
});
$("#max-height").keyup(function() {
    $("#slider-range-height").slider('values',1,$(this).val());
    checkRangeDataTable();
});

$("table").tablesorter({ sortList: [[0,0], [1,0] , [2,0], [3,0] , [4,0]] });
