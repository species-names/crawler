# species-names [![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]

***WIP***

1. crawler for species names
2. data set for species names
3. api for species names

## Usage

### Crawler
The crawler retrieves Species names from https://species.wikimedia.org.

Regnum -> Phyla -> Subphyla -> Classes -> Ordines -> Superfamiliae 


Classis->Ordines->Cladi->Infraordines->Parvordo->Superfamiliae->Familiae
                    ->Genera->Superfamilia->Familiae
                    ->Parvordo->Superfamiliae->Familiae
                    
Aves(Vögel)
                    
aves.json


Parvordo:
- superfamilia -> familia -> genus -> species
- familiae incertae sedis -> genus -> species
- genera incertae sedis -> species

Crawling from Genus page works:

    node crawler.js -p Brachypteryx

Todo:
- iterateFamilia
https://species.wikimedia.org/w/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&titles=Muscicapidae&format=json

- regex on Genera: 

-familia
 - genera.json
  
Cardinalidae
  - Amaurospiza.json
   


### Dataset
Species names are stored in json format in one file per genera.  

#### Todo
- init test for client, mock client
- json-schema
- licence data-set under Creative Commons Attribution-ShareAlike License;

#### Docker
- run: docker-compose up
- login: docker exec -it species-names bash

run commands in container

## License

© [Ivo Bathke]()


[travis-image]: https://travis-ci.org/ivoba/species-names.svg?branch=master
[travis-url]: https://travis-ci.org/ivoba/species-names
[coveralls-image]: https://coveralls.io/repos/ivoba/species-names/badge.svg
[coveralls-url]: https://coveralls.io/r/ivoba/species-names
