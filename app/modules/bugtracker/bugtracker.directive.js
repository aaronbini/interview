
function bugtracker(BugsService) {
  return {
    controller: BugTrackerController,
    restrict: 'E',
    scope: {},
    templateUrl: 'modules/bugtracker/bugtracker.partial.html'
  };

  function BugTrackerController($scope) {

    // --------------------------------
    // --------- init -----------------
    // --------------------------------

    // cached complete list of bugs
    var _bugs = [];

    // form obj for new bugs
    $scope.form = {};

    // default radio selection
    $scope.completedFilter = 'all';
    $scope.errorMessage;

    // set up a clean form
    function initForm() {
      $scope.form = {
        userId: 1,
        description: '',
        points: '1',
        completed: false
      };
    }

    initForm();
    loadList();

    // ----------------------------------------
    // --------- service calls ----------------
    // --- demonstrate promises / api calls ---
    // ----------------------------------------

    // fetch all bugs
    function loadList() {
      BugsService.get()
        .then((data) => {
          _bugs = data;
        })
        .catch(err => $scope.errorMessage = err.message || 'error with request');
    }

    /**
     * NOTES
     * - operate on the cached _bugs
     * - AFTER successful create
     * --- insert into list
     * --- reset the form
     *
     * @param data {object} - the bug to be created (object)
     */
    $scope.addNewBug = function(data) {
      BugsService.create(data)
        .then(data => {
          _bugs.push(data);
          initForm();
        })
        .catch(err => $scope.errorMessage = err.message || 'error with request');
    };

    /**
     * NOTES
     * - operate on the cached _bugs
     * - remove from list AFTER successful deletion
     *
     * @param data {object} - the bug (object) to be deleted
     */
    $scope.deleteBug = function(data) {
      BugsService.delete(data.id)
        .then(() => {
          loadList();
        })
        .catch(err => $scope.errorMessage = err.message || 'error with request');
    };

    /**
     * NOTES
     * - when the status changes, we need to persist that change
     *
     * @param data {object}
     */
    $scope.updateBug = function(data) {
      BugsService.update(data)
        .then(updated => {
          if (!updated) throw {message: 'error updating bug'};
        })
        .catch(err => $scope.errorMessage = err.message || 'error with request');

    };

    // ---------------------------------------------
    // --------- helper functions ------------------
    // --- demonstrate filters / maps / reducers ---
    // ---------------------------------------------

    /**
     * NOTE - operate on the cached _bugs
     *
     * @param completedFilter - completed status
     * @returns {Array}
     *
     * ex: return an array of bugs that match the appropriate status
     */
    $scope.filteredList = function(completedFilter) {
      if (completedFilter === 'all') {
        return _bugs;
      } else {
        return _bugs.filter(e => e.completed.toString() === completedFilter);
      }
    };

    /**
     * NOTE - operate on the cached _bugs
     * - total should also be based on radio selection (ex: "done" is selected, show the sum for all tasks that are marked "done")
     *
     * @param points - the point value you want to sum up
     * @param completedFilter - completed status
     * @returns {Number} - the sum for the point value specified and restricted to the which completion value is selected
     *
     * ex: show me the sum of all the 4 point bugs that are marked "done".
     */
    $scope.getSum = function(pointValue, completedFilter) {
      if (completedFilter === 'all') {
        return _bugs.filter(e => e.points === pointValue)
                    .reduce((prev, curr) => prev + curr.points, 0);
      } else {
        return _bugs.filter(e => e.completed.toString() === completedFilter)
                    .filter(e => e.points === pointValue)
                    .reduce((prev, curr) => prev + curr.points, 0);
      }
    };

    /**
     * NOTE - operate on the cached _bugs
     * - total should also be based on radio selection (ex: "done" is selected, show the total number of tasks that are marked "done")
     *
     * @param points - the point value you want to count
     * @param completedFilter - completed status
     * @returns {Number} - total number based on the point value specified and restricted to the which completion value is selected
     *
     * ex: show me the number of 4 point bugs that are marked "done".
     */
    $scope.getTotal = function(pointValue, completedFilter) {
      if (completedFilter === 'all') {
        return _bugs.filter(e => e.points === pointValue).length;
      } else {
        return _bugs.filter(e => e.completed.toString() === completedFilter)
                    .filter(e => e.points === pointValue).length;
      }
    };

  }
}

export default bugtracker;
