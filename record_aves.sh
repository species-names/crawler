#!/bin/bash

declare -a arrOrdines=(
                "Accipitriformes"
                "Anseriformes"
                "Apodiformes"
                "Apterygiformes"
                "Caprimulgiformes"
                "Casuariiformes"
                "Charadriiformes"
                "Ciconiiformes"
                "Coliiformes"
                "Columbiformes"
                "Coraciiformes"
                "Cuculiformes"
                "Falconiformes"
                "Galliformes"
                "Gaviiformes"
                "Gruiformes"
                "Musophagiformes"
                "Passeroidea"
                "Pelecaniformes"
                "Phoenicopteriformes"
                "Piciformes"
                "Podicipediformes"
                "Procellariiformes"
                "Psittaciformes"
                "Pteroclidiformes"
                "Rheiformes"
                "Sphenisciformes"
                "Strigiformes"
                "Struthioniformes"
                "Sylvioidea"
                "Tinamiformes"
                "Trochiliformes"
                "Trogoniformes"
                )

for i in "${arrOrdines[@]}"
do
  bin/species-names-crawler -c Aves -o $i
done

# problems with Passeriformes, try with Familia:
# bin/species-names-crawler -f Acanthisittidae
# Pipridae
# Cotingidae
# Oxyruncidae
# Onychorhynchidae
# Tityridae
# Pipritidae
# Platyrinchidae
# Tachurisidae
# Rhynchocyclidae
# Tyrannidae
# Thamnophilidae
# Furnariidae
# Dendrocolaptidae
# Pittidae
# Philepittida
# Eurylaimidae
# Aegithinidae
# Artamidae
# Callaeidae
# Campephagidae
# Chaetopidae
# Chloropseidae
# Cinclosomatidae
# Corcoracidae
# Corvidae
# Dicruridae
# Eupetidae
# Grallinidae
# Irenidae
# Laniidae
# Malaconotidae
# Monarchidae
# Mohouidae
# Notiomystidae
# Oriolidae
# Orthonychidae
# Pachycephalidae
# Paradisaeidae
# Petroicidae
# Picathartidae
# Pityriaseidae
# Platysteiridae
# Pomatostomidae
# Prionopidae
# Rhipiduridae
# Vangidae
# Vireonidae
#
# Paridae
# Regulidae
# Remizidae
# Stenostiridae
# Certhiidae
# Polioptilidae
# Sittidae
# Tichodromidae
# Troglodytidae
# Bombycillidae
# Buphagidae
# Cinclidae
# Mimidae
# Muscicapidae
# Sturnidae
# Turdidae
#
# Genus:
# Hyliota
#
# problems with Turniciformes
# problems with Eonessa
# problems with Manu
