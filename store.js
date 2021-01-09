//takes as a parameter favoritesReducer creating  a higer order function
function createStore(reducer) {
  //set to undefined so initial state will be used and an empty object for the action.
  let currentState = reducer(undefined, {})
  //returns two methods one to check the state and dispatch for passing an action.
  return {
    getState: () => currentState,
    dispatch: (action) => (currentState = reducer(currentState, action))
  }
}

const initialState = { favorites: [] }

function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_FAVORITE": {
      const addedFavorite = action.payload.favorite
      const favorites = [...state.favorites, addedFavorite]
      return { favorites }
    }
    case "REMOVE_FAVORITE": {
      const removedFavorite = action.payload.favorite
      const favorites = state.favorites.filter(
        (favorite) => favorite.id !== removedFavorite.id
      )
      return { favorites }
    }
    default:
      return state
  }
}

const store = createStore(favoritesReducer)
export default store
