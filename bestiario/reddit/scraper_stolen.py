require(jsonlite)
require(dplyr)

getAllPosts <- function() {
    url <- "https://www.reddit.com/r/bitcoin/search.json?q=timestamp%3A1414800000..1446335999&sort=new&restrict_sr=on&rank=title&syntax=cloudsearch&limit=100"
    extract <- fromJSON(url)
    posts <- extract$data$children$data %>% dplyr::select(name, author,   num_comments, created_utc,
                                             title, selftext)
    after <- posts[nrow(posts),1]
    url.next <- paste0("https://www.reddit.com/r/bitcoin/search.json?q=timestamp%3A1414800000..1446335999&sort=new&restrict_sr=on&rank=title&syntax=cloudsearch&after=",after,"&limit=100")
    extract.next <- fromJSON(url.next)
    posts.next <- extract.next$data$children$data

    # execute while loop as long as there are any rows in the data frame
    while (!is.null(nrow(posts.next))) {
        posts.next <- posts.next %>% dplyr::select(name, author, num_comments, created_utc,
                                    title, selftext)
        posts <- rbind(posts, posts.next)
        after <- posts[nrow(posts),1]
        url.next <- paste0("https://www.reddit.com/r/bitcoin/search.json?q=timestamp%3A1414800000..1446335999&sort=new&restrict_sr=on&rank=title&syntax=cloudsearch&after=",after,"&limit=100")
        Sys.sleep(15)
        extract <- fromJSON(url.next)
        posts.next <- extract$data$children$data
    }
    posts$created_utc <- as.POSIXct(posts$created_utc, origin="1970-01-01")
    return(posts)
}

posts <- getAllPosts()