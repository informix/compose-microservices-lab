## docker-compose-microservices-lab

### Default compose file:
    docker-compose.yml

## Steps

1.  Clone the github repository.  git clone http://github.com/informix/compose-microservices-lab
2.  cd to project directory and run chmod 777 -R *
3.  Run __docker-compose up__ 
4.  After a few minutes you should see the informix server up and running.  The WL running.  and data begins to get inserted.
5.  See grafana-informix/Grafana Setup.docx  for information on importing a graph for visualizing the informix data.  A default dashboard and graph are created.
6.  Grafana website exposed on port :3000 (user=admin; password=admin)
7.  To bring down the lab.  From the project directory run __docker-compose down -v__ 


