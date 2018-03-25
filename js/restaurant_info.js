let restaurant;
let map;

/**
 * Get a parameter by name from page URL.
 */
const getParameterByName = (name, url) => {
  if (!url) {
    url = window.location.href;
  }

  name = name.replace(/[\[\]]/g, '\\$&');

  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Get current restaurant from page URL.
 */
const fetchRestaurantFromURL = (callback) => {
  if (restaurant) { // restaurant already fetched!
    callback(null, restaurant)
    return;
  }

  const id = getParameterByName('id');

  if (!id) { // no id found in URL
    callback('No restaurant id in URL', null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, value) => {
      restaurant = value;

      if (!restaurant) {
        console.error(error);
        return;
      }

      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
const fillRestaurantHoursHTML = (operatingHours = restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');

  for (let key in operatingHours) {
    const row = document.createElement('tr');
    const day = document.createElement('td');
    const time = document.createElement('td');

    day.innerHTML = key;
    time.innerHTML = operatingHours[key];

    row.appendChild(day);
    row.appendChild(time);
    hours.appendChild(row);
  }
}

/**
 * Create review HTML and add it to the webpage.
 */
const createReviewHTML = (review) => {
  const article = document.createElement('article');
  const span = () => document.createElement('span');
  const info = document.createElement('p');
  const author = document.createElement('strong');
  const comments = document.createElement('p');
  const rating = span();
  const date = span();

  article.className = 'item';
  rating.className = 'rating';
  info.className = 'info';
  author.innerHTML = review.name;
  date.innerHTML = ` (${review.date}) `;
  rating.innerHTML = `${review.rating} ★`;
  comments.innerHTML = review.comments;

  info.appendChild(author);
  info.appendChild(date);
  info.appendChild(rating);
  article.appendChild(info);
  article.appendChild(comments);

  return article;
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
const fillReviewsHTML = (reviews = restaurant.reviews) => {
  const container = document.getElementById('reviews');
  const title = document.createElement('h2');

  title.innerHTML = 'Reviews';

  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');

    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);

    return;
  }

  reviews.forEach(review => container.appendChild(createReviewHTML(review)));
}

/**
 * Create restaurant HTML and add it to the webpage
 */
const fillRestaurantHTML = (value = restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = value.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = value.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img'
  image.src = DBHelper.imageUrlForRestaurant(value);

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = value.cuisine_type;

  // fill operating hours
  if (value.operating_hours) {
    fillRestaurantHoursHTML();
  }

  // fill reviews
  fillReviewsHTML();
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
const fillBreadcrumbs = (value = restaurant) => {
  const breadcrumbs = document.getElementById('breadcrumbs');
  const span = () => document.createElement('span');
  const name = span();
  const separator = span();

  name.innerHTML = value.name;
  separator.className = 'separator';

  breadcrumbs.appendChild(separator);
  breadcrumbs.appendChild(name);
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });

      fillBreadcrumbs();

      DBHelper.mapMarkerForRestaurant(restaurant, map);
    }
  });
}