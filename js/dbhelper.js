/**
 * Common database helper functions.
 */
class DBHelper {

    /**
     * Database URL.
     * Change this to restaurants.json file location on your server.
     */
    static RESTAURANTS_URL(id = '') {
      return `http://localhost:8080/restaurants/${id}`;
    }

    static REVIEWS_URL(id = '') {
      return `http://localhost:8080/reviews/${id ? `?restaurant_id=${id}` : ''}`;
    }

    static fetchQueuedReview(id, callback) {
      localforage
        .getItem(`review-${id}`)
        .then((value) => {
          if (value === null) {
            return callback(true);
          }

          callback(null, value);
        });
    }

    static submitQueuedReview(id, callback) {
      DBHelper.fetchQueuedReview(id, (error, value) => {
        if (error) {
          return callback(null, value);
        }

        DBHelper.submitReview(value, (err, val) => {
          localforage
            .removeItem(`review-${id}`)
            .then(() => callback(null, val))
            .catch(() => callback(true));
        });
      });
    }

    static submitReview(params, callback) {
      localforage
        .setItem(`review-${params.restaurant_id}`, params)
        .then(() => {
          fetch(DBHelper.REVIEWS_URL(), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          })
          .then(res => res.json())
          .then((json) => {
            localforage.removeItem(DBHelper.REVIEWS_URL(params.restaurant_id));

            localforage
              .removeItem(`review-${params.restaurant_id}`)
              .then(() => callback(null, json));
          })
          .catch(() => callback(true));
        });
    }

    static fetchRestaurantReviews(id, callback) {
      const url = DBHelper.REVIEWS_URL(id);

      localforage
        .getItem(url)
        .then((value) => {
          if (value === null) {
            return fetch(url)
              .then(res => res.json())
              .then((json) => {
                localforage.setItem(url, json);

                return json;
              });
          }

          return value;
        })
        .then(value => callback(null, value))
        .catch(() => callback('Something went wrong', null));
    }

    static fetchOrGetCache(url, callback) {
      localforage
        .getItem(url)
        .then((value) => {
          if (value === null) {
            return fetch(url)
              .then(res => res.json())
              .then((json) => {
                localforage.setItem(url, json);

                return json;
              });
          }

          return value;
        })
        .then(value => callback(null, value))
        .catch(() => callback('Something went wrong', null));
    }

    /**
     * Fetch all restaurants.
     */
    static fetchRestaurants(callback) {
      DBHelper.fetchOrGetCache(DBHelper.RESTAURANTS_URL(), callback);
    }

    /**
     * Fetch a restaurant by its ID.
     */
    static fetchRestaurantById(id, callback) {
      DBHelper.fetchOrGetCache(DBHelper.RESTAURANTS_URL(id), callback);
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
      return `./restaurant.html?id=${restaurant.id}`;
    }

    /**
     * Restaurant image URL.
     */
    static imageUrlForRestaurant(restaurant) {
      return `./img/${restaurant.photograph}.webp?id=${restaurant.id}`;
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