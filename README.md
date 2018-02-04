# species-names [![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]

crawler for species names from https://species.wikimedia.org.

## Usage

Crawling from Genus:

    bin/species-names-crawler -g Brachypteryx

Crawling from Familia:

    bin/species-names-crawler -f Muscicapidae

Crawling from Ordo:

    bin/species-names-crawler -o Apterygiformes

### Known Issues
- Generae which need disambiguation cause some problems,
  currently only disambiguation with (ICZN) suffix are resolved.  
  Example: https://species.wikimedia.org/wiki/Prunella_(ICZN)  
  Disambiguation with other text can only be accessed from Familiae.  

### Dataset

parse structures:

    Ordo -> Cladi -> Familia
         -> Subordo -> Infraorides -> Suberfamilia -> Familia
                    -> Parvordo -> Superfamilia
                                -> Familiae incertae sedis
                                -> Genera incertae sedis
         -> Familia -> Subfamiliae -> Tribus -> Genera
         -> Familiae (4 + 1†): -> Genus
         -> Familiae (3)

Species names are stored in json format in one file per genera.  

#### Todo
- store files in classis folder, detect classis
- init test for client, mock client
- Chen (Animalia) is strange

#### Docker
- run: ./docker.sh -l

run commands in container

## License MIT

© [Ivo Bathke]()


[travis-image]: https://travis-ci.org/species-names/crawler.svg?branch=master
[travis-url]: https://travis-ci.org/species-names/crawler
[coveralls-image]: https://coveralls.io/repos/species-names/crawler/badge.svg
[coveralls-url]: https://coveralls.io/r/species-names/crawler
