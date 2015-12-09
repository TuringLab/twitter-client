
// Update with new data from server
function update(query) {
  var url = 'https://turing-twitter.herokuapp.com/' + query;

  // Create temp data
  url = '/data.json';

  $.get(url,function(data){

    createList(data.tweets);
    // showRaw(data);

  })
}

function showRaw(data){
  var string = JSON.stringify(data,null,2)
  $('#results').html(string).show();
}

// Create a list of tweets
function createList(tweets) {
  var list = $('#list');
  for (var i in tweets){
    addLine(list,tweets[i].text);
  }
  list.show();
}

function addLine(list, html) {
  var line = $(document.createElement('li'));
  line.html(html);
  list.append(line);
}

// When document loaded update data
$(function(){
    update('turinglab');
});