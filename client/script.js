
// Update with new data from server
function update() {

  var query = $('#query').val();
  var url = 'https://turing-twitter.herokuapp.com/' + query;

  // var url = 'data.json';

  $.get(url,function(data){
    showTweets(data.tweets);
    // showRaw(data);
  })
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
    line.addClass('negative')
  } else {
    line.addClass('positive')
  }

  var date = new Date(tweet.createdAt);
  console.log(date.getFullYear());

  // Add the line to the list
  list.append(line);
}

// When document loaded update data
$(function(){
    update('branding');
});