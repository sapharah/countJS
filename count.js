(function analyzeText(){
    common = [];
    exceptions = ["is", "are", "was", "were"];
    var text = $("body").text();
    var strippedStr = bodyText.replace(/[^\w\s]/gi, "").replace(/\(.*;?\;/g, "").replace(/\w{20}/ig, "").replace(/[0-9]/g, "").replace(/\s\s+/g, ' ').replace(/(\b(\w{1,1})\b(\W|$))/g, "");
    
    //obtain top 100 words
    $.get("https://en.wikipedia.org/wiki/Most_common_words_in_English", function(data){
        
    })
});