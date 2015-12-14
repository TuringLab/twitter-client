
// Update with new data from server
function update() {

  // Obtain query string
  var query = $('#query').val();
  var url = 'https://turing-twitter.herokuapp.com/' + query;

  // Get data and update display
  $.get(url,display);

}

// Update the display
function display(response) {

  // Create a list of tweets
  var list = new TuringList('#list',response.tweets);
  list.formatter(function(tweet){
    var text = '<span">' + tweet.text + '</span>'
    var user = '<strong style="float: right;">' + tweet.username + '</strong>'
    if (tweet.polarity < 0){
        return '<div class="negative">' + text + user + '</div>'
    }
    return '<div class="positive">' + text + user + '</div>'
  });

  // Sort tweets by polarity
  response.tweets.sort(function(a, b){
    return a.polarity - b.polarity;
  })

  var bubbleData = [];
  var barData = [];

  // Loop through all tweets
  for (var i in response.tweets){
    var tweet = response.tweets[i];
    var date = new Date(tweet.createdAt);

    //Ignore neutral tweets
    if (tweet.polarity == 0) continue;

    // Ignore retweets
    if (tweet.text.contains('RT')) continue;

    // Add items to bar data
    barData.push({
      text: tweet.text,
      y: tweet.polarity
    })

    // Add items to bubble data
    bubbleData.push({
      name: tweet.text,
      x: tweet.polarity, 
      y: date,
      z: tweet.text.length
    })
  }

  // Create a bar chart
  var bar = new TuringBar('#bar',barData);
  bar.axis({y:'Polarity'})
  bar.yLabels(function(){
    return `${Math.floor(this.value * 100)}%`
  })

  // Create a bubble chart
  var bubble = new TuringBubble('#bubble',bubbleData);
  bubble.axis({x:'Polarity',y:'Time'})
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
    $('#help').hide();
  } else if (display == "bar") {
    $('#list').hide();
    $('#bubble').hide();
    $('#bar').show();
    $('#help').hide();
  } else {
    $('#list').show();
    $('#bubble').hide();
    $('#bar').hide();
    $('#help').hide();
  }
}

// When document loaded update data
$(function(){
    $('#display').change(select);
    update();
    select();
});