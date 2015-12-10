currentChart = "list"
// Update with new data from server
function update() {

  var query = $('#query').val();
  var url = 'https://turing-twitter.herokuapp.com/' + query;

  // var url = 'data.json';

  $.get(url,function(data){
    if (currentChart == "list") {
      showTweets(data.tweets);
    } else if (currentChart == "bar") {
      showBar(data);
    } else {
      showBubble(data);
    }
    // showRaw(data);
  })
}

function showBar(data) {
$(".result" ).html( data ); 
  console.log(data)
  var posPercent = 0;
  var data2 = [0,0]
  var data3 = []
  for(var i = 0; i < data.tweets.length; i++){
    if ( data.tweets[i].polarity > 0 ) {
      posPercent = posPercent + 1;
      data2[0] += 1;
    }
    else if ( data.tweets[i].polarity < 0 ){
      data2[1] += 1;
    }
    if (data.tweets[i].polarity != 0){
      data3.push(data.tweets[i].polarity)
    }
  }
  data3.sort()
  
  console.log(data3)
  posPercent /= data.tweets.length;
  posPercent = Math.ceil(100*posPercent)
  $(".percent").text(posPercent + "%").show();
  $(function () {  
    // Age categories
    var categories = [];
    $(document).ready(function () {
        $('#bar').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Positivity of Tweets'
            },
            subtitle: {
                text: 'test'
            },
            xAxis: [{
                reversed: false,
                labels:
                {
                  enabled: false
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                linkedTo: 0,
                labels: {
                  enabled: false
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.ceil(100*this.value) + '%';
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', tweet number ' + this.point.category + '</b><br/>' +
                        'Content: ' + data.tweets[this.point.index].text;
                }
            },

            series: [{
                name: 'Christmas',
                data: data3
            }]
        });
    });
  });
}

function showBubble(data) {

//var polarity = []
//var subjectivity = []
//var tweetLength = []
var allData = []
//var dateData = []

for(var i=0;i<data.tweets.length;i++){ 
  var tweet = data.tweets[i];
  var pol = tweet.polarity;
  //var sub = tweet.subjectivity;
  var len = tweet.text.length;
  var date = new Date(tweet.createdAt);
  var dateSince = date.getTime();
  console.log("date", date.getTime());
  
  //polarity.push(pol);
  //subjectivity.push(sub); 
  //tweetLength.push(len);
  //dateData.push(dateSince);
  allData.push([pol,dateSince,len])
};

console.log(allData);


$(function () {
    $('#bubble').highcharts({

        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },
      
        tooltip: {
          formatter: function() {
                var s = '<b>' + data.tweets[this.point.index].text + '</b>';
              console.log("point", this.point);
                return s;
          }
        },

        title: {
            text: 'Twitter Analysis'
        },

        xAxis: {
            gridLineWidth: 1,
            title: {
              text:  "positivity"
            }
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            type: 'datetime',
            title: {
              text: "Date"
            }
        },

        series: [{
            name: 'Tweets',
            data: allData,
            color: '#99c957',
            negativeColor: '#0088FF'
        }]

    });
});
}

function handleRadio(selected) {
  if (selected.value == "bubble") {
    currentChart="bubble";
    $('#list').hide();
    $('#bubble').show();
    $('#bar').hide();
    update();
  } else if (selected.value == "bar") {
    currentChart="bar";
    $('#list').hide();
    $('#bubble').hide();
    $('#bar').show();
    update()
  } else {
    currentChart="list";
    $('#list').show();
    $('#bubble').hide();
    $('#bar').hide();
    update()
  }
}

// Display the raw data on the page
function showRaw(data){
  var string = JSON.stringify(data,null,2)
  $('#results').html(string).show();
}

// Create a list of tweets
function showTweets(tweets) {
  var list = $('#tweets');
  list.html('');

  // Loop through all tweets
  for (var i in tweets){

    // If the tweet has been retweeted then add a line to the list
    addTweet(list,tweets[i]);
  
  }

  // Show the list
  list.show();
}

// Add an individual tweet to the page
function addTweet(list, tweet) {

  // Create a new line element
  var line = $(document.createElement('li'));

  // Set the inner html of the line
  line.html(`${tweet.text} - <strong>${tweet.username}</strong>`);

  // Change the style of the tweet depending on polarity
  if (tweet.polarity < 0){
    line.addClass('negative tweet')
  } else {
    line.addClass('positive tweet')
  }

  var date = new Date(tweet.createdAt);
  console.log(date.getFullYear());

  // Add the line to the list
  list.append(line);
}

// When document loaded update data
// $(function(){
//     update('branding');
// });