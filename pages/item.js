import Comment from "../components/Comment.js"
import Story from "../components/Story.js"
import baseUrl from "../utils/baseUrl.js"
import view from "../utils/view.js"

export default async function Item() {
  //need to set up the variables as let bc if we use a const inside the try/catch they will be out of scope.
  let story = null
  let hasComments = false
  let hasError = false

  try {
    story = await getStory()
    hasComments = story.comments.length > 0
  } catch (error) {
    hasError = true
    console.log(error)
  }

  if (hasError) {
    view.innerHTML = `
    <div class="error">
      Error fetching story
    </div>
    `
  }

  view.innerHTML = `
    <div>
    <!-- use the Story function to show only the info of that particular new in the same format that in stories page but without the index element -->
      ${Story(story)}
    </div>
    <hr/>
    <!-- If there is any comments we take the array of objects and convert to string each index -->
    ${
      hasComments
        ? story.comments.map((comment) => Comment(comment))
        : "No comments"
    }`
}

async function getStory() {
  const storyId = window.location.hash.split("?id=")[1]
  const response = await fetch(`${baseUrl}/item/${storyId}`)
  const story = response.json()
  return story
}
