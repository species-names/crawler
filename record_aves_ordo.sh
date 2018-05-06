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
