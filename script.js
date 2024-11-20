// $('.Search-button').on('click', function() {
//     $.ajax({
//       url: 'http://www.omdbapi.com/?apikey=d7d8f589&s=' + $('.input-keyword').val(),
//       success: function(results) {
//         const movies = results.Search;
//         const cards = movies.map(showCard).join('');
//         $('.movie-container').html(cards);
//       },
//       error: function(e) {
//         console.log(e.responseText);
//       }
//     });
//   });
  
//   $('.movie-container').on('click', '.modal-detail-button', function() {
//     const movieId = $(this).data('id');
//     $.ajax({
//       url: 'http://www.omdbapi.com/?apikey=d7d8f589&i=' + movieId,
//       success: function(movie) {
//         const movieDetail = showMovieDetail(movie);
//         $('.modal-body').html(movieDetail);
//       },
//       error: function(e) {
//         console.log(e.responseText);
//       }
//     });
//   });



// fetch
// const searchButton = document.querySelector('.Search-button');
// searchButton.addEventListener('click', function() {
//   const inputKeyword = document.querySelector('.input-keyword');
//   fetch('http://www.omdbapi.com/?apikey=d7d8f589&s=' + inputKeyword.value)
//     .then(response => response.json())
//      .then(response => {
//       const movies = response.Search;
//       let card = '';
//       movies.forEach(movie => card += showCard(movie));
//       const movieContainer = document.querySelector('.movie-container');
//       movieContainer.innerHTML = card;
//      });
// });

// const modalDetailButtons = document.querySelectorAll('.modal-detail-button');
// modalDetailButtons.forEach(button => 
//   button.addEventListener('click', function(){
//     const movieId = this.dataset.id;
//     fetch('http://www.omdbapi.com/?apikey=d7d8f589&i=' + movieId)
//       .then(response => response.json())
//       .then(m => {
//         const movieDetail = showMovieDetail(m);
//         const modalBody = document.querySelector('.modal-body');
//         modalBody.innerHTML = movieDetail;
//       });
//   })
// );

// fecth 2
// search
// const searchButton = document.querySelector('.Search-button');
// searchButton.addEventListener('click', async function() {
//   try {
//     const inputKeyword = document.querySelector('.input-keyword');
//     console.log('Searching for:', inputKeyword.value); // Logging input
//     const movies = await getMovies(inputKeyword.value);
//     updateUI(movies);
//   } catch (err) {
//     console.error('Error occurred:', err); // Logging error
//     alert(err);
//   }
// });

// function getMovies(keyword) {
//   return fetch('http://www.omdbapi.com/?apikey=d7d8f589&s=' + keyword)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     })
//     .then(response => {
//       if (response.Response === "False") {
//         throw new Error(response.Error);
//       }
//       return response.Search;
//     });
// }

// function getMovieDetail(movieId) {
//   return fetch('http://www.omdbapi.com/?apikey=d7d8f589&i=' + movieId)
//     .then(response => response.json());
// }

// function updateDetailMovie(movie) {
//   const movieDetail = showMovieDetail(movie);
//   const modalBody = document.querySelector('.modal-body');
//   modalBody.innerHTML = movieDetail;
// }

// function updateUI(movies) {
//   let card = '';
//   movies.forEach(movie => card += showCard(movie));
//   const movieContainer = document.querySelector('.movie-container');
//   movieContainer.innerHTML = card;
// }

// document.addEventListener('click', async function(e) {
//   if (e.target.classList.contains('modal-detail-button')) {
//     const movieId = e.target.dataset.id;
//     const movie = await getMovieDetail(movieId);
//     updateDetailMovie(movie);
//   }
// });

const searchButton = document.querySelector('.Search-button');
searchButton.addEventListener('click', async function() {
  try {
    const inputKeyword = document.querySelector('.input-keyword');
    console.log('Searching for:', inputKeyword.value); // Logging input
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (err) {
    console.error('Error occurred:', err); // Logging error
    alert(err);
  }
});

function getMovies(keyword) {
  return fetch('http://www.omdbapi.com/?apikey=d7d8f589&s=' + keyword)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(response => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function getMovieDetail(movieId) {
  return fetch('http://www.omdbapi.com/?apikey=d7d8f589&i=' + movieId)
    .then(response => response.json());
}

function updateDetailMovie(movie) {
  const movieDetail = showMovieDetail(movie);
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = movieDetail;
}

function updateUI(movies) {
  let card = '';
  movies.forEach(movie => card += showCard(movie));
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = card;
}

document.addEventListener('click', async function(e) {
  if (e.target.classList.contains('modal-detail-button')) {
    const movieId = e.target.dataset.id;
    const movie = await getMovieDetail(movieId);
    updateDetailMovie(movie);
  }
});



function showCard(movie) {
  return `
    <div class="col-md-3 my-4 ms-5 ">
      <div class="card">
        <img src="${movie.Poster}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" 
             data-bs-target="#exampleModal" data-id="${movie.imdbID}">Show detail</a>
        </div>
      </div>
    </div>
  `;
}

function showMovieDetail(movie) {
  return `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <img src="${movie.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
          <ul class="list-group">
            <li class="list-group-item"><h4>${movie.Title} ${movie.Year}</h4></li>
            <li class="list-group-item"><strong>Director : </strong>${movie.Director}</li>
            <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
            <li class="list-group-item"><strong>Writer :</strong>${movie.Writer}</li>
            <li class="list-group-item"><strong>Plot :</strong>${movie.Plot}</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}
