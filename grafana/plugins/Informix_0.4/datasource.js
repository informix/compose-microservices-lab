'use strict';

System.register(['lodash'], function (_export, _context) {
  "use strict";

  var _, _createClass, InformixDatasource;

  const QUERY_START = '/system.sql?query={"$sql" : ';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }


  function buildQuery(sqlStatement) {
    return QUERY_START + '"' + sqlStatement + '"}'
  }

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  function formatTime(date) {
    var d = new Date(date),
      hours = '' + d.getHours(),
      minutes = '' + d.getMinutes(),
      seconds = '' + d.getSeconds();
    return [hours, minutes, seconds].join(':');
  }

  function formatDateTime(date) {
    return formatDate(date) + " " + formatTime(date);
  }


  function processDataType(data) {
    if(typeof data === 'object' ) {
      console.log('we have extended json');
      console.log(data);
      if(data.$date) {
        return data.$date;
      }
      else if(data.$numberDecimal) {
        return data.$numberDecimal;
      }

    }
    else {
      return data;
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('InformixDatasource', InformixDatasource = function () {
        function InformixDatasource(instanceSettings, $q, backendSrv, templateSrv) {
          _classCallCheck(this, InformixDatasource);

          this.type = instanceSettings.type;
          this.url = instanceSettings.url;
          this.name = instanceSettings.name;
          this.q = $q;
          this.backendSrv = backendSrv;
          this.templateSrv = templateSrv;
          this.withCredentials = instanceSettings.withCredentials;
          this.headers = { 'Content-Type': 'application/json' };
          if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
            this.headers['Authorization'] = instanceSettings.basicAuth;
          }
        }

        _createClass(InformixDatasource, [{
          key: 'query',
          value: function query(options) {

            options.targets = options.targets.filter(function (t) {
              return !t.hide;
            });
            var queryParams = options;
            var self = this;
            var seriesList = [];

            if (queryParams.targets.length <= 0) {
              return this.q.when({ data: [] });
            }
            var targetPromises = _(queryParams.targets).map(function (target) {
              var sqlQuery = "";

              if (target.type == 'table-as-timeseries') {
                sqlQuery = "SELECT " + target.dateColumn + " date, "
                  + target.numberColumn + " value FROM "
                  + target.tableName + " WHERE "
                  + target.filterColumn + " = " + target.filterValue;
              } else if (target.type == 'timeseries') {
                sqlQuery = "SELECT Clip(" + target.timeseriesColumn + ", '"
                  + formatDateTime(queryParams.range.from._d) + "'::datetime year to second, '"
                  + formatDateTime(queryParams.range.to._d) + "'::datetime year to second) results FROM "
                  + target.tableName
                  + " WHERE " + target.filterColumn + " = " + target.filterValue;
              } else if (target.type == 'simple-timeseries') {
                sqlQuery = "SELECT Clip(data, '"
                + formatDateTime(queryParams.range.from._d) + "'::datetime year to second, '"
                + formatDateTime(queryParams.range.to._d) + "'::datetime year to second) results FROM "
                + target.tableName
                + " WHERE id = " + target.filterValue;
                target.timeseriesColumn = "data"
              } else if (target.type == 'raw-sql') {
                sqlQuery = target.sql;
              } else if(target.type == 'table') {
                sqlQuery = target.sql;
              } else {
                return [];
              }
              var targetUrl = buildQuery(sqlQuery);
              console.log("Type: " + target.type + ". Query: " + targetUrl);

              return self.doRequest({
                url: self.url + encodeURI(buildQuery(sqlQuery)),
                method: 'GET',
                metadata: target
              }).then(self.convertResponse);
            }).value();

            return self.q.all(targetPromises).then(function (convertedResponses) {
              return {
                data : convertedResponses
              }
            });
          }
        }, {
          key: 'testDatasource',
          value: function testDatasource() {
            return this.doRequest({
              url: this.url + encodeURI(buildQuery("SELECT FIRST 1 DBINFO('version', 'full') version FROM systables")),
              method: 'GET'
            }).then(function (response) {
              if (response.status === 200) {
                return {
                  status: "success",
                  message: "Connection Successful. Informix version: '" + JSON.stringify(response.data[0].version) + "'.",
                  title: "Success"
                };
              }
            });
          }
        }, {
          key: 'convertResponse',
          value: function convertResponse(response) {

            if (!response || !response.data) { return []; }

            var seriesList = [];
            var target_str = response.config.metadata.refId + ":";

            var elements = [];
            if(response.config.metadata.type == 'timeseries' || response.config.metadata.type == 'simple-timeseries') {
              target_str = target_str + response.config.metadata.tableName + "/" + response.config.metadata.timeseriesColumn;
              response.data[0].results.data.forEach(function (item) {
                var ts = item.tstamp["$date"];
                var value = processDataType(item.value);   //TODO We need to make this a parameter
                var innerArray = [];
                innerArray.push(value);
                innerArray.push(ts);
                elements.push(innerArray);
              });
            }
            else if(response.config.metadata.type == 'table') {
              target_str = target_str + response.config.metadata.tableName + "/" + response.config.metadata.numberColumn;
              var row = {};
              var columns = [];
              var rows = [];
              var item = response.data[0];
              var keys = Object.keys(item);
              keys.forEach(function(key) {
                var col = {};
                col.text = key;
                columns.push(col);
              });
              response.data.forEach(function (item) {
                var values = Object.values(item);
                var row = [];
                values.forEach(function(value) {
                  row.push(processDataType(value));
                });
                rows.push(row);
              });
              elements.push( {
                "columns" : columns,
                "rows" : rows
              });
            } else {  //timeseries as table
              target_str = target_str + response.config.metadata.tableName + "/" + response.config.metadata.numberColumn;
              response.data.forEach(function (item) {
                var ts = item[response.config.metadata.dateColumn]["$date"];
                var value = item["value"];//response.config.metadata.numberColumn
                var innerArray = [];
                innerArray.push(value);
                innerArray.push(ts);
                elements.push(innerArray);
              });
            }

            return {
              target: target_str,
              datapoints: elements
            }
          }
        }, {
          key: 'annotationQuery',
          value: function annotationQuery(options) {
            var query = this.templateSrv.replace(options.annotation.query, {}, 'glob');
            var annotationQuery = {
              range: options.range,
              annotation: {
                name: options.annotation.name,
                datasource: options.annotation.datasource,
                enable: options.annotation.enable,
                iconColor: options.annotation.iconColor,
                query: query
              },
              rangeRaw: options.rangeRaw
            };

            return this.doRequest({
              url: this.url + '/annotations',
              method: 'POST',
              data: annotationQuery
            }).then(function (result) {
              return result.data;
            });
          }
        }, {
          key: 'metricFindQuery',
          value: function metricFindQuery(query) {
            var interpolated = {
              target: this.templateSrv.replace(query, null, 'regex')
            };

            return this.doRequest({
              url: this.url + '/search',
              data: interpolated,
              method: 'POST'
            }).then(this.mapToTextValue);
          }
        }, {
          key: 'mapToTextValue',
          value: function mapToTextValue(result) {
            return _.map(result.data, function (d, i) {
              if (d && d.text && d.value) {
                return { text: d.text, value: d.value };
              } else if (_.isObject(d)) {
                return { text: d, value: i };
              }
              return { text: d, value: d };
            });
          }
        }, {
          key: 'doRequest',
          value: function doRequest(options) {

            options.withCredentials = this.withCredentials;
            options.headers = this.headers;

            return this.backendSrv.datasourceRequest(options);
          }
        }, {
          key: 'getTagKeys',
          value: function getTagKeys(options) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
              _this2.doRequest({
                url: _this2.url + '/tag-keys',
                method: 'POST',
                data: options
              }).then(function (result) {
                return resolve(result.data);
              });
            });
          }
        }, {
          key: 'getTagValues',
          value: function getTagValues(options) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
              _this3.doRequest({
                url: _this3.url + '/tag-values',
                method: 'POST',
                data: options
              }).then(function (result) {
                return resolve(result.data);
              });
            });
          }
        }]);

        return InformixDatasource;
      }());

      _export('InformixDatasource', InformixDatasource);
    }
  };
});
//# XXXsourceMappingURL=datasource.js.map
