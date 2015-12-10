
function TuringChart(identifier,axis,data){

    this.element = $(identifier);
    this.chart = this.element.highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: this.element.attr('name')
        },
        legend: {
            enabled: false
        },
        xAxis: {
            title: {
                text: axis.y
            }
        },
        yAxis: {
            title: {
                text: axis.x
            },
            // labels: {
            //     formatter: function () {
            //         return Math.ceil(100*this.value) + '%';
            //     }
            // }
        },

        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },

        // tooltip: {
        //     formatter: function (test) {
        //         console.log(test);
        //         return '<b>' + this.series.name + ', tweet number ' + this.point.category + '</b><br/>' +
        //             'Content: ' + data.tweets[this.point.index].text;
        //     }
        // },

        series: [{
            // name: this.element.attr('name'),
            data: data
        }]
    });

    this.log = function() {
        console.log(this);
    } 

};

$(function(){
    var chart = new TuringChart('#bar',{x:'Percentage',y:'Product'},[{name:'ballballs',y:-2},{name:'Christmas',y:20}]);
    chart.log()
});
