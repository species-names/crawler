#!/bin/bash

declare -a arr=(
                  "Acanthisittidae"
                  "Pipridae"
                  "Cotingidae"
                  "Oxyruncidae"
                  "Onychorhynchidae"
                  "Tityridae"
                  "Pipritidae"
                  "Platyrinchidae"
                  "Tachurisidae"
                  "Rhynchocyclidae"
                  "Tyrannidae"
                  "Thamnophilidae"
                  "Furnariidae"
                  "Dendrocolaptidae"
                  "Pittidae"
                  "Philepittida"
                  "Eurylaimidae"
                  "Aegithinidae"
                  "Artamidae"
                  "Callaeidae"
                  "Campephagidae"
                  "Chaetopidae"
                  "Chloropseidae"
                  "Cinclosomatidae"
                  "Corcoracidae"
                  "Corvidae"
                  "Dicruridae"
                  "Eupetidae"
                  "Grallinidae"
                  "Irenidae"
                  "Laniidae"
                  "Malaconotidae"
                  "Monarchidae"
                  "Mohouidae"
                  "Notiomystidae"
                  "Oriolidae"
                  "Orthonychidae"
                  "Pachycephalidae"
                  "Paradisaeidae"
                  "Petroicidae"
                  "Picathartidae"
                  "Pityriaseidae"
                  "Platysteiridae"
                  "Pomatostomidae"
                  "Prionopidae"
                  "Rhipiduridae"
                  "Vangidae"
                  "Vireonidae"
                  "Paridae"
                  "Regulidae"
                  "Remizidae"
                  "Stenostiridae"
                  "Certhiidae"
                  "Polioptilidae"
                  "Sittidae"
                  "Tichodromidae"
                  "Troglodytidae"
                  "Bombycillidae"
                  "Buphagidae"
                  "Cinclidae"
                  "Mimidae"
                  "Muscicapidae"
                  "Sturnidae"
                  "Turdidae"
                )

for i in "${arr[@]}"
do
  bin/species-names-crawler -c Aves -f $i
done

#
# Genus:
# Hyliota
#
# problems with Turniciformes
# problems with Eonessa
# problems with Manu
# Buphagidae
