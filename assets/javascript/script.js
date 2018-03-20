$(document).ready(function(){

    let searchTerms = "space";

    $("#search-button").on("click", function() {

        searchTerms = $("#search-term").val()

        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json"

        url += '?' + $.param({
        'api-key': "bcced6ed17d54c78991a3ab69726bbba",
        "q": searchTerms
        });

        $.ajax({
            url: url,
            method: 'GET',
        }).then(function (result) {

            let numOfArticles = result.response.docs.length

            for (let i = 0; i < numOfArticles; i++) {

                let currentArticle = result.response.docs[i]

                let newArticle = $("<div>")

                newArticle.attr("class", "article-div left-align")

                let linkElement = $("<a>")

                linkElement.attr("href", currentArticle.web_url)

                let headline = $("<h5>")

                headline.text(currentArticle.headline.main)
                
                let author = $("<p>")

                if (currentArticle.byline === undefined) {
                    author.text("Unknown")
                } else {
                    author.text(currentArticle.byline.original)
                }

                linkElement.append(headline, author)

                newArticle.append(linkElement)

                $("#article-dump").append(newArticle)

            }

        })
    })

})