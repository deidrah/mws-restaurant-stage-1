let restaurants;
let neighborhoods
let cuisines
let map;
let markers = [];

/**
 * Set neighborhoods HTML.
 */
const fillNeighborhoodsHTML = (value = neighborhoods) => {
  const select = document.querySelector('[data-neighborhoods-select]');

  value.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
 * Fetch all neighborhoods and set their HTML.
 */
const fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, value) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      neighborhoods = value;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
const fillCuisinesHTML = (value = cuisines) => {
  const select = document.querySelector('[data-cuisines-select]');

  value.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
const fetchCuisines = () => {
  DBHelper.fetchCuisines((error, value) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      cuisines = value;
      fillCuisinesHTML();
    }
  });
}

/**
 * Create restaurant HTML.
 */
const createRestaurantHTML = (restaurant) => {
  const article = document.createElement('article');
  article.className = 'item';

  const img = document.createElement('div');
  img.className = 'img';
  img.style.backgroundImage = `url(${DBHelper.imageUrlForRestaurant(restaurant)})`;
  article.append(img);

  const name = document.createElement('h5');
  name.innerHTML = restaurant.name;
  article.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  article.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  article.append(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);
  article.append(more)

  return article;
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
const resetRestaurants = (value) => {
  // Remove all restaurants
  restaurants = [];
  const div = document.getElementById('results');
  div.innerHTML = '';

  // Remove all map markers
  markers.forEach(marker => marker.setMap(null));
  markers = [];
  restaurants = value;
}

/**
 * Add markers for current restaurants to the map.
 */
const addMarkersToMap = (value = restaurants) => {
  value.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, map);

    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });

    markers.push(marker);
  });
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
const fillRestaurantsHTML = (value = restaurants) => {
  const div = document.getElementById('results');

  value.forEach(restaurant => div.append(createRestaurantHTML(restaurant)));

  addMarkersToMap();
}

/**
 * Update page and map for current restaurants.
 */
const updateRestaurants = () => {
  const { value: cuisine } = document.querySelector('[data-cuisines-select]');
  const { value: neighborhood } = document.querySelector('[data-neighborhoods-select]');

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) {
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: 40.722216,
      lng: -73.987501
    },
    scrollwheel: false
  });

  updateRestaurants();
}

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  fetchNeighborhoods();
  fetchCuisines();
});