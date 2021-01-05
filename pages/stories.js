import view from "../utils/view.js"
export default async function Stories(path) {
  //need also to wait for  getStories to run before we display any content.
  const stories = await getStories(path)
  const hasStories = stories.length > 0

  view.innerHTML = `<div>
      ${
        hasStories
          ? stories.map((story) => JSON.stringify(story))
          : "No stories"
      } </div>`
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
  const response = await fetch(`https://node-hnapi.herokuapp.com${path}`)
  const stories = await response.json()
  return stories
}
