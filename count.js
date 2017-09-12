//First we obtain the text of the website, and we make an array of top 100 common words + our "exceptions" array
(function analyzeText(){
    var common = [];
    var exceptions = ["is", "are", "was", "were"];
    var text = $("body").text();
    var strippedStr = text.replace(/[^\w\s]/gi, "").replace(/\(.*;?\;/g, "").replace(/\w{20}/ig, "").replace(/[0-9]/g, "").replace(/\s\s+/g, ' ').replace(/(\b(\w{1,1})\b(\W|$))/g, ""); 
    
    //obtain top 100 words
    $.get("https://en.wikipedia.org/wiki/Most_common_words_in_English", function(data){
        var response = $("<html />").html(data);
        var table = response.find("table.wikitable");
        var list = table.find("tr td:nth-child(2)"); 
        list.each(function(i, item){
            common.push($(item).text());              
        })
        common = exceptions.concat(common);
        var pageText = strippedStr.toLowerCase().split(/\s+/);
        
        results(pageText, common);
    });
})();

// A function to find the common words and their frequency
function results(pageText, common){
    var map = {};
    var topResults = [];
    // let's populate our map with the pageText
    for (var i = 0; i < pageText.length; i++){
        if (map[pageText[i]]){
            map[pageText[i]]+= 1;
        }
        else {
            map[pageText[i]] = 1;
        }
    }
    // let's remove the common words from the map!
    for (var j = 0; j < common.length; j++){
        if (map[common[j]]){
            delete map[common[j]];
        }  
    }
    // sort frequencies (descending)
    var counts = Object.keys(map); // create a counts array, an array of objects
    counts.sort(function(a, b){
        return map[b] - map[a]; //sort keys in descending order
    });
    // populate the top 25 words
    for (var k = 0; k < 26; k++){
        topResults.push(counts[k]);
    }
    
    // pass top 25 frequently used words to renderDOM
    renderDOM(topResults, map);
}

function renderDOM(results, map) {
  var DOM = $('body').html();
  //function to escape regex variables
  function escapeRegex(value) {
    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }
  for (var i = 0; i < results.length; i++) {
    DOM = DOM.replace(new RegExp("\\b"+escapeRegex(results[i])+"\\b","ig"), map[results[i]]);
  }

  // render a new DOM 
  $('body').html(DOM);
}








