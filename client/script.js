
// Update with new data from server
function update(query) {
  var url = 'https://turing-twitter.herokuapp.com/' + query;

  // Create temp data
  url = '/data.json';

  $.get(url,function(data){
    console.log(data);
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

  // Loop through all tweets
  for (var i in tweets){

    // If the tweet has been retweeted then add a line to the list
    if (tweets[i].retweetCount > 0){
      addTweet(list,tweets[i]);
    }
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

  // Add the line to the list
  list.append(line);
}

// When document loaded update data
$(function(){
    update('branding');
});