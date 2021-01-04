import Stories from "./pages/stories.js"
// The constructor of the library accepts three arguments - root, useHash and hash. The first one is the main URL of your application.
// If useHash is set to true then the router uses an old routing approach with hash in the URL.
const router = new Navigo(null, true, "#")

export default class RouterHandler {
  constructor() {
    //the method we will use to create all the routes
    this.createRoutes()
  }

  createRoutes() {
    //stores the possible paths in an array of objects, path is going to indicate the path to the page so we can match it. And page the content of the page itself which is a JS file to display.
    const routes = [{ path: "/", page: Stories }]

    routes.forEach((route) => {
      //router.on(string, function) - adding a new route
      //with the first argument we define the path and on the function we will run the funtcion in the js file of that path so we call page like a funciton
      router
        .on(route.path, () => {
          route.page()
        })
        .resolve()
    })
  }
}
