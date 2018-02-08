# Todos

J'ai réalisé un projet exemple en Angular pour la gestion des tâches à faire.

### Environnement

J'ai utilisé docker pour me fournir un environnement avec une base de données MongoDB.
Lien Docker: 
 - https://docs.docker.com/toolbox/overview/
Lien pour télécharger les images docker via un proxy :
 - https://medium.com/@suci/running-docker-on-windows-7-behind-a-proxy-b363d3966d7
Lien de l'image à télécharger :
 - https://hub.docker.com/r/sesteva/deployd/

docker run --name deployd -p 2403:2403 -i -t sesteva/deployd
docker start deployd
Pour passer le proxy est accéder à la base MongoDB

créer fichier proxy-conf.json
{
  "/api": {
    "target": "http://192.168.99.100:2403",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "changeOrigin": true
  }
}

ng serve --proxy-config proxy.conf.json


### Design

J'ai utilisé Material Design pour la mise en forme de cet exemple.

Documentation:
 - https://material.angular.io/guide/getting-started

