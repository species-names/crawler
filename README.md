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

With Passeriformes its:
Ordo -> Cladi -> Familia
              -> Infraordines -> Parvordo -> Familiae


Species names are stored in json format in one file per genera.  

#### Todo
- store files in classis folder, detect classis
- init test for client, mock client
- Chen (Animalia) is strange
- Check if Wikidata is easier to parse: https://www.wikidata.org/wiki/Q25307
- Disambuig can have other patterns: Archboldia_(Ptilonorhynchidae), Chloris_(Cuvier)
  actually split by space
  https://species.wikimedia.org/w/api.php?action=parse&page=Acrocephalus
  "properties": [
            {
                "name": "disambiguation",
                "*": ""
            },
            {
                "name": "wikibase_item",
                "*": "Q3216232"
            }
        ]
- start from classis
- start harvesting Mammals:
  detect Classis by https://species.wikimedia.org/w/api.php?action=query&titles=Podargus&prop=templates
  or: https://species.wikimedia.org/w/api.php?action=query&titles=Podargus&prop=links
  https://species.wikimedia.org/w/api.php?action=parse&page=Podargus contains Links & templates
  use: https://species.wikimedia.org/w/api.php?action=query&titles=Podargus&prop=revisions|links&rvprop=content
  to get link list and detect main Classis from classis list
  [Mammalia, Aves, Amphibia, Reptilia,  Cephalaspidomorphi - Chondrichthyes - Osteichthyes (except Tetrapoda]
- Mammalia have a different structure on ordes pages than Aves
  wich makes problems
  parse for Overview of genera (6 + 24†)
  see https://species.wikimedia.org/wiki/Suidae
  see Babyrousa
  currently we only get genera over subfamilia
- Addax nasomasculatus redirect page ? scientific synonym or typo
- some extinct species are parsed too, nevermind

#### Docker
- run: ./docker.sh -l

run commands in container

## License MIT

© [Ivo Bathke]()


[travis-image]: https://travis-ci.org/species-names/crawler.svg?branch=master
[travis-url]: https://travis-ci.org/species-names/crawler
[coveralls-image]: https://coveralls.io/repos/species-names/crawler/badge.svg
[coveralls-url]: https://coveralls.io/r/species-names/crawler
