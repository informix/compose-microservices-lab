DROP TABLE IF EXISTS ts_test;
CREATE TABLE ts_test (id integer, date DATETIME YEAR TO SECOND, db_size int);
insert into ts_test values(1, TO_DATE('2019-08-07 12:00', "%Y-%m-%d %H:%M"), 65);
insert into ts_test values(1, TO_DATE('2019-08-07 12:15', "%Y-%m-%d %H:%M"), 70);
insert into ts_test values(1, TO_DATE('2019-08-07 12:30', "%Y-%m-%d %H:%M"), 63);
insert into ts_test values(1, TO_DATE('2019-08-07 12:45', "%Y-%m-%d %H:%M"), 65);
insert into ts_test values(1, TO_DATE('2019-08-07 13:00', "%Y-%m-%d %H:%M"), 66);

insert into ts_test values(2, TO_DATE('2019-08-07 12:00', "%Y-%m-%d %H:%M"), 65);
insert into ts_test values(2, TO_DATE('2019-08-07 12:15', "%Y-%m-%d %H:%M"), 72);
insert into ts_test values(2, TO_DATE('2019-08-07 12:30', "%Y-%m-%d %H:%M"), 75);
insert into ts_test values(2, TO_DATE('2019-08-07 12:45', "%Y-%m-%d %H:%M"), 80);
insert into ts_test values(2, TO_DATE('2019-08-07 13:00', "%Y-%m-%d %H:%M"), 95);