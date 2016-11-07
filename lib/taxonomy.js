'use strict';

/*
 for future we might want to store names
 in a taxanomy and provide additional info
 also translate taxonomic groups
 */

// aves.json
const aves = {
    classis: 'Aves',
    ordines: [
        {
            ordo: 'Accipitriformes',
            familiae: [
                {
                    'familia': 'Muscicapidae',
                    'genera': [
                        {
                            'Alethe': {
                                'species': [
                                    {
                                        'Alethe castanea': {
                                            'common_names': [
                                                {
                                                    'de': 'Piep Matz'
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            subordines: [
                //skip subordines
            ]
        }
    ]
};