/**
 * API DOCUMENTATION
 * https://github.com/typicode/json-server
 *
 * data - local file - bugs.json
 * API endpoint - http://localhost:3000/bugs
 * NOTE - must be running json-server to reach endpoint
 *
 */
function BugsService($http) {

  /**
   * create new
   * POST    /bugs
   *
   * @param payload {object}
   * @returns {Promise}
   */
  function create(payload) {
    return $http.post('http://localhost:3000/bugs', payload)
      .then(response => response.data);
  }

  /**
   * delete single by id
   * DELETE    /bugs/:id
   *
   * @param id {Number}
   * @returns {Promise}
   */
  function del (id) {
    return $http.delete(`http://localhost:3000/bugs/${id}`)
      .then(response => response.data);
  }

  /**
   * get full list
   * GET    /bugs
   *
   * @returns {Promise}
   */
  function get() {
    return $http.get('http://localhost:3000/bugs')
      .then(response => response.data);
  }

  /**
   *
   * @param payload {object}
   * @returns {Promise}
   */
  function update(payload) {
    return $http.put(`http://localhost:3000/bugs/${payload.id}`, payload)
      .then(response => response.data);
  }

  return {
    create: create,
    delete: del,
    get: get,
    update: update
  };
}

export default BugsService;
