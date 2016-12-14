# species-names [![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]

crawler for species names from https://species.wikimedia.org.

## Usage

Crawling from Genus:

    node crawler.js -g Brachypteryx

Crawling from Familia:

    node crawler.js -f Muscicapidae

Crawling from Ordo:

    node crawler.js -o Apterygiformes

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
- dataset as submodule
- store files in classis folder, detect classis
- init test for client, mock client
- json-schema

#### Docker
- run: ./docker.sh -l

run commands in container

## License

© [Ivo Bathke]()


[travis-image]: https://travis-ci.org/ivoba/species-names.svg?branch=master
[travis-url]: https://travis-ci.org/ivoba/species-names
[coveralls-image]: https://coveralls.io/repos/ivoba/species-names/badge.svg
[coveralls-url]: https://coveralls.io/r/ivoba/species-names
