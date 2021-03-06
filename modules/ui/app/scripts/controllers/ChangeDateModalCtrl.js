/* global moment:false */
'use strict';

angular.module('wasabi.controllers')
    .controller('ChangeDateModalCtrl',
        ['$scope', '$modalInstance', 'experiment', 'DialogsFactory', 'UtilitiesFactory',
            function ($scope, $modalInstance, experiment, DialogsFactory, UtilitiesFactory) {

                $scope.experiment = experiment;
                $scope.experimentFormSubmitted = false;
                $scope.originalEndTime = moment(experiment.endTime, ['YYYY-MM-DDTHH:mm:ssZ', 'ddd MMM DD YYYY HH:mm:ss ZZ']);

                $scope.ok = function (isFormInvalid) {
                    if (!isFormInvalid) {
                        if (moment($scope.experiment.endTime, ['YYYY-MM-DDTHH:mm:ssZ', 'ddd MMM DD YYYY HH:mm:ss ZZ']).isBefore($scope.originalEndTime)) {
                            DialogsFactory.confirmDialog('You are about to end the experiment early. Are you sure you want to do this?',
                                    'Warning',
                                    function() {
                                        // Submit as normal
                                        $modalInstance.close($scope.experiment);
                                        UtilitiesFactory.displayPageSuccessMessage('Success', 'Successfully updated the end date.');
                                    },
                                    function() {/* Don't do the save */});
                        }
                        else {
                            // Submit as normal
                            $modalInstance.close($scope.experiment);
                            UtilitiesFactory.displayPageSuccessMessage('Success', 'Successfully updated the end date.');
                        }
                    } else {
                        $scope.experimentFormSubmitted = true;
                    }
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }]);