angular.module('magna-app')

.controller('LayerListCtrl', ['$scope', 'LayerService', 'SideNavStatusService',
  function($scope, LayerService, SideNavStatusService) {
    $scope.collapsed = SideNavStatusService.hideLayers();
    $scope.layers = LayerService.layers;

    $scope.toggleCollapsed = function() {
      $scope.collapsed = $scope.selectedNavItem === 'projects' ? true : !$scope.collapsed;
      SideNavStatusService.hideLayers($scope.collapsed);
    };

    $scope.toggle = function(layer) {
      layer.status = layer.status === 'off' ? '' : 'off';
    };

    $scope.openEditLayerModal = function(layer) {
      LayerService.editLayer(layer);
    };

    $scope.$watch(function() {
      return LayerService.layers;
    }, function(newLayers) {
      $scope.layers = newLayers;
    }, true);

    $scope.$on('$routeChangeSuccess', function(event, toState) {
      if(toState.controller !== 'ProjectsController') {
        $scope.collapsed = SideNavStatusService.hideLayers();
      }
    });
}]);
