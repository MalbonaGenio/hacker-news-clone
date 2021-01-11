import Story from "../components/Story.js"
import store from "../store.js"
import baseUrl from "../utils/baseUrl.js"
import checkFavorite from "../utils/checkFavorite.js"
import view from "../utils/view.js"

export default async function Stories(path) {
  //get the state from the store to get the array with the favorites. As we only need the favorites we can deconstruct the object.
  const { favorites } = store.getState()
  //need also to wait for  getStories to run before we display any content.
  const stories = await getStories(path)
  const hasStories = stories.length > 0

  view.innerHTML = `<div>
      ${
        hasStories
          ? //we call the Story component function that will format all the data from the api into the html
            stories
              //isFavorite will be true or false. If id inside the array of favorites (state) matches the id of one of the stories it will be true. Using that we will dispaly add or remove from favorites in the Story.js
              .map((story, i) =>
                Story({
                  ...story,
                  index: i + 1,
                  isFavorite: checkFavorite(favorites, story)
                })
              )
              .join("")
          : "No stories"
      } </div>`

  document.querySelectorAll(".favorite").forEach((favoriteButton) => {
    favoriteButton.addEventListener("click", async function () {
      //get the data story stored in the data-story. It's in string form so we need to parse it.
      const story = JSON.parse(this.dataset.story)
      const isFavorited = checkFavorite(favorites, story)
      store.dispatch({
        type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
        payload: { favorite: story }
      })
      await Stories(path)
    })
  })
}

//take the path argument from Stories and use it to match to the route we want to fetch in the HN api
async function getStories(path) {
  /*
  The routes and endpoint we need to use are:
     / (Top) -> /news
     /new (New) -> /newest
     This two have the same name so we don't need to add a conditional for them. They can be assigend to the fetch directly.
     /ask (Ask) -> /ask
     /show (Show) -> /show 
  */
  const isHomeRoute = path === "/"
  const isNewRoute = path === "/new"
  if (isHomeRoute) {
    path = "/news"
  } else if (isNewRoute) {
    path = "/newest"
  }
  const response = await fetch(`${baseUrl}${path}`)
  const stories = await response.json()
  return stories
}
