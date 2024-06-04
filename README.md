# species-names crawler

crawler for species names from https://species.wikimedia.org.

## Usage

Crawling from Genus:

    bin/species-names-crawler --classis=Aves -g Brachypteryx

Crawling from Familia:

    bin/species-names-crawler --classis=Aves -f Muscicapidae

Crawling from Ordo:

    bin/species-names-crawler --classis=Aves -o Apterygiformes

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

### Todo v1
- prettier
- mocha test
- github actions

#### Todo
- dont save emtpy genera
- store files in classis folder, detect classis
- init test for client, mock client

## License MIT

© [Ivo Bathke]()