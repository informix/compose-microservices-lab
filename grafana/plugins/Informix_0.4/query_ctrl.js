'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InformixDatasourceQueryCtrl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sdk = require('app/plugins/sdk');

require('./css/query-editor.css!');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InformixDatasourceQueryCtrl = exports.InformixDatasourceQueryCtrl = function (_QueryCtrl) {
  _inherits(InformixDatasourceQueryCtrl, _QueryCtrl);

  function InformixDatasourceQueryCtrl($scope, $injector) {
    _classCallCheck(this, InformixDatasourceQueryCtrl);

    var _this = _possibleConstructorReturn(this, (InformixDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(InformixDatasourceQueryCtrl)).call(this, $scope, $injector));

    _this.scope = $scope;
    _this.target.sql = _this.target.sql;// || 'SELECT dateCol, valueCol FROM mytable where uniqueColumn=1'
    _this.target.type = _this.target.type || 'none';
    _this.target.tableName = _this.target.tableName;// || 'ts_data';
    _this.target.timeseriesColumn = _this.target.timeseriesColumn;// || 'raw_reads';
    _this.target.filterColumn = _this.target.filterColumn;// || 'loc_esi_id';
    _this.target.filterValue = _this.target.filterValue;// || '4727354321000111';
    return _this;
  }

  _createClass(InformixDatasourceQueryCtrl, [{
    key: 'getOptions',
    value: function getOptions(query) {
      return this.datasource.metricFindQuery(query || '');
    }
  }, {
    key: 'onChangeInternal',
    value: function onChangeInternal() {
      this.panelCtrl.refresh(); // Asks the panel to refresh data.
    }
  }]);

  return InformixDatasourceQueryCtrl;
}(_sdk.QueryCtrl);

 InformixDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
//# sourceMappingURL=query_ctrl.js.map
