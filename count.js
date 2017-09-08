//First we obtain the text of the website, and we make an array of top 100 common words + our "exceptions" array
(function analyzeText(){
    var common = [];
    var exceptions = ["is", "are", "was", "were"];
    var text = $("body").text();
    var strippedStr = bodyText.replace(/[^\w\s]/gi, "").replace(/\(.*;?\;/g, "").replace(/\w{20}/ig, "").replace(/[0-9]/g, "").replace(/\s\s+/g, ' ').replace(/(\b(\w{1,1})\b(\W|$))/g, "");
    
    //obtain top 100 words
    $.get("https://en.wikipedia.org/wiki/Most_common_words_in_English", function(data){
        var response = $("<html />").html(data);
        var table = response.find("table.wikitable");
        var list = table.find("tr td:nth-child(2)"); // may need a jquery selector, use $("table.wikitable");
        list.each(function(i, item){
            common.push($(item).text());              
        })
        common = exceptions.concat(common);
        var pageText = strippedStr.toLowerCase().split(/\s/);
        results(pageText, common);
    });
});

// A function to find the common words and output their frequency
(function results(pageText, common){
    var map = {};
    var topResults = [];
    // let's populate our map!
    for (var i = 0; i < pageText.length; i++){
        if (map[pageText[i]]){
            map[pageText[i]]++;
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
    var counts = Object.keys(map); // create a counts array
    
    
})