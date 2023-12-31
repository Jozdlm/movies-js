import { API_URL } from "./constants.js";
import { addToLikedList } from "./liked.service.js";

export const getMovies = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.movies;
  } catch (err) {
    throw new Error(err);
  }
};

export const getMovieById = async (movieId) => {
  const movies = await getMovies();
  return movies.filter((item) => item.id === movieId)[0];
}

export const renderMovies = (movies, wrapper) => {
  const fragment = document.createDocumentFragment();

  movies.forEach((item) => {
    const movie = `
      <div class="movie">
        <div class="movie__header">
          <p class="movie__thumb">${item.thumbnail}</p>
          <div class="movie__buttons">
            <button>Liked</button>
            <button>Add</button>
          </div>
        </div>
        <div class="movie__info">
          <p class="movie__title">${item.name}</p>
          <p class="movie__rating">${item.rating}</p>
        </div>
      </div>
    `;

    const element = new DOMParser().parseFromString(movie, 'text/html');

    const buttons = element.body.getElementsByTagName('button');
    buttons[0].onclick = () => addToLikedList(item.id);

    // TODO: Add the onclick envent to collection button

    fragment.appendChild(element.body.firstChild);
  });

  wrapper.innerHTML = "";
  wrapper.appendChild(fragment);
};
