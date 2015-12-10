
function TuringChart(handle,type,data){

    this.type = type;
    data = data || [];
    this.element = $(handle);

    this.options = {
        chart: {
            type: this.type
        },
        title: {
            text: this.element.attr('name')
        },
        legend: {
            enabled: false
        },
        xAxis: {
            title: {
                text: null
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
            data: data
        }],
        tooltip: {
            formatter: function(){
                var text = this.point.text || this.point.name || false;
                if (!text) return false;
                return '<p>' + text + '</p>';
            }
        }
    }

    this.draw = function(){
        this.chart = this.element.highcharts(this.options);   
    }

    this.data = function(data){
        this.options.series[0].data = data;
        this.draw();
    };

    this.axis = function(axis){
        this.options.xAxis.title.text = axis.x;
        this.options.yAxis.title.text = axis.y;
        this.draw();
    }

    this.labels = function(formatter){
        this.options.yAxis.labels = {
            formatter: formatter
        };
        this.draw();
    }

    this.tooltip = function(formatter){
        this.options.tooltip = {
            formatter: formatter
        };
        this.draw();
    }

    this.draw();

};

function TuringBar(handle,data){
    var type = 'bar';
    TuringChart.call(this,handle,type,data);
}

function TuringBubble(handle,data){
    var type = 'bubble';
    TuringChart.call(this,handle,type,data);
}

$(function(){
    var chart = new TuringBubble('#bar');

    // chart.data([[10,-1,1000],[5,-1,500],[10,20,1]])

    chart.data([{name:'ballballs',x:10,y:-2,z:1000},{name:'medium',x:10,y:10,z:500},{name:'Christmas',x:0,y:20,z:1}]);
    
    chart.axis({x:'Percentage',y:'Product'});

    // chart.labels(function() {
    //     return Math.ceil(100*this.value) + '%';
    // })

    // chart.tooltip(function() {
    //     return '<b>' + this.series.name + ', tweet number ' + this.point.category + '</b><br/>' +
    //         'Content: ' + this.tweets[this.point.index].text;
    // });

});
