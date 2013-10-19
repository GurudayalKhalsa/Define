

(function(){

    $("#searchText").livesearch({
        data:"files/words.json",
        maxResults:20,
        structure:"trie"
    });

    $("#search").on("submit", function()
    {
        define($("#searchText").val(), showResults);
        return false;
    });

    function showResults(data, response)
    {        
        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }

        var result = "<div><h2 id='word'>"+response.query.capitalize()+":</h2>";
        
        if($.isEmptyObject(data)) 
        {
            result += "<p>Sorry, no definition available.</p>";
            $("#results").html(result);
            return;
        }

        console.log(data)
        for(type in data)
        {

            result += "<h3>"+type+"</h3>";

            result += "<ol>";

            for(var i in data[type])
            {
                result += "<li><p>"+data[type][i]+".</p></li>";
            }

            result += "</ol>";
            

        }

        result += "</div>";

        $("#results").html(result);
    }

})();

