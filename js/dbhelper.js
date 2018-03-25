/**
 * Common database helper functions.
 */
class DBHelper {
  
    /**
     * Database URL.
     * Change this to restaurants.json file location on your server.
     */
    static get DATABASE_URL() {
      return './data/restaurants.json';
    }
  
    /**
     * Fetch all restaurants.
     */
    static fetchRestaurants(callback) {
      const xhr = new XMLHttpRequest();
  
      xhr.open('GET', DBHelper.DATABASE_URL);
      xhr.onload = () => {
        if (xhr.status === 200) {
          const { restaurants } = JSON.parse(xhr.responseText);
  
          callback(null, restaurants);
        } else {
          callback(`Request failed. Returned status of ${xhr.status}`, null);
        }
      };
  
      xhr.send();
    }
  
    /**
     * Fetch a restaurant by its ID.
     */
    static fetchRestaurantById(id, callback) {
      // fetch all restaurants with proper error handling.
      DBHelper.fetchRestaurants((error, restaurants) => {
        if (error) {
          callback(error, null);
        } else {
          const restaurant = restaurants.find(r => r.id == id);
  
          if (restaurant) {
            callback(null, restaurant);
          } else {
            callback('Restaurant does not exist', null);
          }
        }
      });
    }
  
    /**
     * Fetch restaurants by a cuisine type with proper error handling.
     */
    static fetchRestaurantByCuisine(cuisine, callback) {
      // Fetch all restaurants with proper error handling
      DBHelper.fetchRestaurants((error, restaurants) => {
        if (error) {
          callback(error, null);
        } else {
          // Filter and return restaurants to have only given cuisine type
          callback(null, restaurants.filter(r => r.cuisine_type == cuisine));
        }
      });
    }
  
    /**
     * Fetch restaurants by a neighborhood with proper error handling.
     */
    static fetchRestaurantByNeighborhood(neighborhood, callback) {
      // Fetch all restaurants
      DBHelper.fetchRestaurants((error, restaurants) => {
        if (error) {
          callback(error, null);
        } else {
          // Filter and return restaurants to have only given neighborhood
          callback(null, restaurants.filter(r => r.neighborhood == neighborhood));
        }
      });
    }
  
    /**
     * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
     */
    static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
      // Fetch all restaurants
      DBHelper.fetchRestaurants((error, restaurants) => {
        if (error) {
          callback(error, null);
        } else {
          let results = restaurants;
  
          if (cuisine != 'all') { // filter by cuisine
            results = results.filter(r => r.cuisine_type == cuisine);
          }
  
          if (neighborhood != 'all') { // filter by neighborhood
            results = results.filter(r => r.neighborhood == neighborhood);
          }
  
          callback(null, results);
        }
      });
    }
  
    /**
     * Fetch all neighborhoods with proper error handling.
     */
    static fetchNeighborhoods(callback) {
      // Fetch all restaurants
      DBHelper.fetchRestaurants((error, restaurants) => {
        if (error) {
          callback(error, null);
        } else {
          // Get all neighborhoods from all restaurants and remove duplicates from neighborhoods
          const neighborhoods = restaurants.map(({ neighborhood }) => neighborhood);
  
          callback(null, [...new Set(neighborhoods)]);
        }
      });
    }
  
    /**
     * Fetch all cuisines with proper error handling.
     */
    static fetchCuisines(callback) {
      // Fetch all restaurants
      DBHelper.fetchRestaurants((error, restaurants) => {
        if (error) {
          callback(error, null);
        } else {
          // Get all cuisines from all restaurants and remove duplicates from cuisines
          const cuisines = restaurants.map(({ cuisine_type }) => cuisine_type);
  
          callback(null, [...new Set(cuisines)]);
        }
      });
    }
  
    /**
     * Restaurant page URL.
     */
    static urlForRestaurant(restaurant) {
      return (`./restaurant.html?id=${restaurant.id}`);
    }
  
    /**
     * Restaurant image URL.
     */
    static imageUrlForRestaurant(restaurant) {
      return (`./img/${restaurant.photograph}`);
    }
  
    /**
     * Map marker for a restaurant.
     */
    static mapMarkerForRestaurant(restaurant, map) {
      return new google.maps.Marker({
        position: restaurant.latlng,
        title: restaurant.name,
        url: DBHelper.urlForRestaurant(restaurant),
        map,
        animation: google.maps.Animation.DROP}
      );
    }
  
  }