$('#generateQuote').click(function() {
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/",
        jsonp: "jsonp",
        dataType: "jsonp",
        data: {
          method: "getQuote",
          lang: "en",
          format: "jsonp"
        }
      })
      .done(update)
      .fail(handleErr);
});

function update(response) {
    $('#quote').empty();
    $('#author').empty();
    $('#quote').append("'" + response.quoteText + "'");
    $('#author').append("- " + response.quoteAuthor);
    console.log(response);
}
  
function handleErr(jqxhr, textStatus, err) {
    console.log("AJAX Quotes API Call: " + textStatus + ", " + err);
}


