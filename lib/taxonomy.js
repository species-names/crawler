"use strict";

/*
 for future we might want to store names
 in a taxanomy and provide additional info
 also translate taxonomic groups
 */

// aves.json
/* eslint no-unused-vars: "off" */
const aves = {
  classis: "Aves",
  ordines: [
    {
      ordo: "Accipitriformes",
      familiae: [
        {
          familia: "Muscicapidae",
          genera: [
            {
              genus: "Alethe",
              species: [
                {
                  /* eslint camelcase: "off" */
                  scientific_name: "Alethe castanea",
                  /* eslint camelcase: "off" */
                  common_names: [
                    {
                      de: "Piep Matz",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  subordines: [
    // skip subordines
  ],
};
