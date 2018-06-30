#!/bin/bash

declare -a arrOrdines=(
# "Chiroptera"
 "Afrosoricida"
 "Artiodactyla"
 "Dasyuromorphia"
 "Dermoptera"
 "Didelphimorphia"
 "Diprotodontia"
 "Erinaceomorpha"
 "Hyracoidea"
 "Lagomorpha"
# Macroscelidea (problem)
 "Microbiotheria"
 "Monotremata"
 "Notoryctemorphia"
 "Paucituberculata"
 "Peramelemorphia"
 "Perissodactyla"
 "Pholidota"
 "Pilosa"
# Primates (problem)
 "Proboscidea"
 "Rodentia"
 "Scandentia"
 "Sirenia"
 "Soricomorpha"
 "Tubulidentata"
                )

for i in "${arrOrdines[@]}"
do
  bin/species-names-crawler -c Mammalia -o $i
done
