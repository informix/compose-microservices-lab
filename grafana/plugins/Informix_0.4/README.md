# informix-grafana
 Informix plug-in for Grafana 5.x

## Installation instructions

There are many ways to install a grafana plugin.

1.  copy this whole proejct into /var/lib/grafana/pluins
1.  build this project to create the dist directory (`npm install; then use grunt`)
1.  Read the grafana docs for more ways

## Create the datasource


## Create your first dashboard

Select Informix as your datasource.

Pick your query type based on the table you are looking at.

* Timeseries

  This table has a timeseries column in it. Add the table name, the timeseries column.  Then pick a column to act as the filter. You can only graph 1 timeseries at a time so typically you pick a sensor, or unique id from the table and the value you want to look at.

  If you want to look at more rows, add a grafana series A, B,.... with each unique id.

* Table as Timeseries

  This is a table that has data that can look like a timeseries, specifically a column for a date/time  and a numerical column which is your value.

  Type in the table name, date/time column, and numerical column you are after.

  Optionally fill in the filter column and id if you have multiple series stores in the table.

* Raw SQL

  You know what you are doing.  

* Simple timeseries

  A table with a timeseries that follows a pre-defined convention.

## Demo

You can run $INFORMIXDIR/bin/dbaccessdemo7 program to create an example timeseries.
Additionally, there is a load.sql file stored in here that creates a simple table with timeseries values that can be used.

Note the demo program has date/times from Nov 2010, so adjust your grafana window appropriately.

Attached in this projecti s a dashboard.json whcih you can load that has some panels pre-defined.
