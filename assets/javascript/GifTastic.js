$(document).ready(function() {

var topics = ["Soccer", "Baseball", "Surfing", "Tennis", "Golf"];
  // Function for displaying topics data
function renderButtons() {
        // Deleting the topic buttons prior to adding new topic buttons
        // (this is necessary otherwise we will have repeat buttons)
  $("#topics-view").empty();
        // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    $('#topics-view').append("<button class='sports' data-sport=" + topics[i] + ">" + topics[i] + "</button>");
    }
};
  $("#add-topic").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
        // This line will grab the text from the input box
    var topic = $("#topic-input").val().trim();
        // The topic from the textbox is then added to our array
    topics.push(topic);
        // calling renderButtons which handles the processing of our topic array
    renderButtons();
  });
  renderButtons();
  $("button").on("click", function() {
    var x =  $(this).data("sport");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({url:queryURL, method: "GET"})
    .done(function(response){
      for(var i=0; i<response.data.length; i++){
        var sportDiv = $('<div>');
        var p = $('<p>').text("Rating: "+response.data[i].rating);
        var sportImage = $('<img>');
        sportImage.attr('src',response.data[i].images.fixed_height.url);
        sportDiv.append(p);
        sportDiv.append(sportImage);
        $('#gifsGoHere').append(sportDiv);
      }
    });
  })
})

