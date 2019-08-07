## docker-compose-microservices-lab

### Default compose file:
    docker-compose.yml

## Steps

1. Change directory into the docker-compose-microservices-lab directory
2.  Run chmod 777 -R *
3.  Run __docker-compose build__

    This will build any components needed.  The grafana-ui item listed in the docker-compose.yml file has a build construct.

4.  Run __docker-compose up__ 


5.  After a few minutes you should see the informix server up and running.  The WL running.  and data begins to get inserted.

6.  See grafana-informix/Grafana Setup.docx  for information on importing a graph for visualizing the informix data.

7.  Grafana website exposed on port :3000

8.  Use docker-compose down to bring all containers down.  Run from the docker-compose-microservices-lab directory.


