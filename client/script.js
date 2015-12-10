currentChart = "list"
// Update with new data from server
function update() {

  var query = $('#query').val();
  var url = 'https://turing-twitter.herokuapp.com/' + query;

  var url = 'data.json';

  $.get(url,function(response){
    if (currentChart == "list") {
      showList(response);
    } else if (currentChart == "bar") {
      showBar(response);
    } else if (currentChart == "bubble"){
      showBubble(response);
    } else {
      showRaw(response);
    }
  })
}

function showBar(response) {

  var tweet;
  var tweets = response.tweets.sort((tweetA,tweetB) => tweetA.polarity - tweetB.polarity);
  var data = [];

  for (var i in tweets){
    tweet = tweets[i];

    if (tweet.polarity == 0) continue;

    data.push({
      text: tweet.text,
      y: tweet.polarity,
    });
  }

  var bar = new TuringBar('#bar',data);
  bar.axis({y:'Polarity'});
  bar.yLabels(function(){
    return `${Math.floor(this.value * 100)}%`
  })

}

function showBubble(response) {

  var tweet;
  var date;
  var data = [];

  for(var i in response.tweets){ 
    tweet = response.tweets[i];
    date = new Date(tweet.createdAt)

    data.push({
      text: tweet.text,
      x: tweet.polarity,
      y: new Date(tweet.createdAt),
      z: tweet.text.length,
    });

  };

  var bubble = new TuringBubble('#bubble',data);
  bubble.axis({x:'Polarity',y:'Time'});
  bubble.xLabels(function(){
    return `${Math.floor(this.value * 100)}%`
  })

}



// Display the raw data on the page
function showRaw(data){
  var string = JSON.stringify(data,null,2)
  $('#results').html(string).show();
}

// Create a list of tweets
function showList(response) {
    var list = new TuringList('#list',response.tweets);
    // list.formatter(function(tweet){
    //     var div = $(document.createElement('div'));
    //     if (tweet.polarity < 0){
    //         div.addClass('negative')
    //     }
    //     div.html(`${tweet.text} <strong>${tweet.username}</strong>`)
    //     return div;
    // });
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

// When document loaded update data
$(function(){
    update();
});