
// Update with new data from server
function update() {

  var query = $('#query').val();
  var url = 'https://turing-twitter.herokuapp.com/' + query;

  // var url = 'data.json';
  var display = $('#display').val();
  console.log(display);

  $.get(url,function(response){
    if (display == "list") {
      showList(response);
    } else if (display == "bar") {
      showBar(response);
    } else if (display == "bubble"){
      showBubble(response);
    } else {
      alert('No display selected');
    }
  })
}

// Create a list of tweets
function showList(response) {

  var list = new TuringList('#results',response.tweets);
  list.formatter(function(tweet){
    var text = '<span">' + tweet.text + '</span>'
    var user = '<strong style="float: right;">' + tweet.username + '</strong>'
    if (tweet.polarity < 0){
        return '<div class="negative">' + text + user + '</div>'
    }
    return '<div class="positive">' + text + user + '</div>'
  });
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

  var bar = new TuringBar('#results',data);
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

  var bubble = new TuringBubble('#results',data);
  bubble.axis({x:'Polarity',y:'Time'});
  bubble.xLabels(function(){
    return `${Math.floor(this.value * 100)}%`
  })
}

function select() {
  var display = $('#display').val();

  if (display == "bubble") {
    $('#list').hide();
    $('#bubble').show();
    $('#bar').hide();
  } else if (display == "bar") {
    $('#list').hide();
    $('#bubble').hide();
    $('#bar').show();
  } else if (display == "list")
    $('#list').show();
    $('#bubble').hide();
    $('#bar').hide();
  } else {
    $('#list').hide();
    $('#bubble').hide();
    $('#bar').hide();
  }
}

// When document loaded update data
$(function(){
    update();
});