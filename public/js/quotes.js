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
    $('#quote').prepend("'" + response.quoteText + "'");
    $('#author').prepend("-" + response.quoteAuthor);
    console.log(response);
  }
  
  function handleErr(jqxhr, textStatus, err) {
    console.log("AJAX API Call: " + textStatus + ", " + err);
  }