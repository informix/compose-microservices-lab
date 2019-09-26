# compose-microservices-lab

## Default compose file:
    docker-compose.yml

## Full Documentation
1.  See __doc__ folder.


## QuickStart Steps

### Pre-requisites
1.  docker
2.  docker-compose

### Start docker compose:
1.  cd to project directory 
2.  Run __chmod -R 777  *__
3.  Run __docker-compose up__


### Up & Running 
    1.  After a few minutes you should see the informix server up and running.  The WL running.  and data begins to get inserted.
    2.  See grafana-informix/Grafana Setup.docx  for information on importing a graph for visualizing the informix data.  A default dashboard and graph are created.
    3.  Go to http://<ip address>:3000 (user=admin; password=admin)

### Stop and remove Containers & volume
1. Run __docker-compose down -v__  


