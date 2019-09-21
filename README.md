## docker-compose-microservices-lab

### Default compose file:
    docker-compose.yml

## Steps

1.  Clone the github repository.  git clone http://github.com/informix/compose-microservices-lab
2.  cd to project directory and 
3.  Run __chmod -R 777  *__
4.  Run __docker-compose up__ 
5.  After a few minutes you should see the informix server up and running.  The WL running.  and data begins to get inserted.
6.  See grafana-informix/Grafana Setup.docx  for information on importing a graph for visualizing the informix data.  A default dashboard and graph are created.
7.  Grafana website exposed on port :3000 (user=admin; password=admin)
8.  To bring down the lab.  From the project directory run __docker-compose down -v__ 


