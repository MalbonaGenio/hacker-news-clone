//remember that file directories with capital letters like this one are always modules.
export default function Story(story) {
  return `
  <div class="story">
    <div> 
      <!-- In the case we don't have a index value, which is the case of the item.js for the comments set to OR '' bc story.index will show an undefined -->
      <span class="gray">${story.index || ""}</span>
      <span class="upvote">▲</span>
      <a href="${story.url}">${story.title}</a>
      <span>(${story.domain})</span>
    </div>
    <div>
      <div class="gray">
        ${story.points} points by ${story.user} ${story.time_ago}
        |
        <a href="#/item?id=${story.id}">
          ${story.comments_count} comments
        </a>
        |
        <!-- All the story object will be stored in the data so we can gather it when adding or removing from favorites. Need to convert it to string first. -->
        <span class="favorite" data-story='${JSON.stringify(story)}'>
            <img class="heart" src="https://icon.now.sh/heart/ccc">
            ${story.isFavorite ? "Remove From Favorites" : "Add To Favorites"}
          </span>
      </div>
    </div>
  </div>
`
}
