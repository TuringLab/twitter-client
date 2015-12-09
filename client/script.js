
function update(query) {
  var url = 'https://turing-twitter.herokuapp.com/' + query;

  $.get(url,function(data){
    var string = JSON.stringify(data,null,2)
    $('#results').html(string).show();
  })
}

// When document loaded update data
$(function(){
    update();
});