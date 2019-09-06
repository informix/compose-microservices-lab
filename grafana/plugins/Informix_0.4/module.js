'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationsQueryCtrl = exports.QueryOptionsCtrl = exports.ConfigCtrl = exports.QueryCtrl = exports.Datasource = undefined;

var _datasource = require('./datasource');

var _query_ctrl = require('./query_ctrl');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InformixConfigCtrl = function InformixConfigCtrl() {
  _classCallCheck(this, InformixConfigCtrl);
};

InformixConfigCtrl.templateUrl = 'partials/config.html';

var InformixQueryOptionsCtrl = function InformixQueryOptionsCtrl() {
  _classCallCheck(this, InformixQueryOptionsCtrl);
};

InformixQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

var InformixAnnotationsQueryCtrl = function InformixAnnotationsQueryCtrl() {
  _classCallCheck(this, InformixAnnotationsQueryCtrl);
};

InformixAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

exports.Datasource = _datasource.InformixDatasource;
exports.QueryCtrl = _query_ctrl.InformixDatasourceQueryCtrl;
exports.ConfigCtrl = InformixConfigCtrl;
exports.QueryOptionsCtrl = InformixQueryOptionsCtrl;
exports.AnnotationsQueryCtrl = InformixAnnotationsQueryCtrl;
//# sourceMappingURL=module.js.map
