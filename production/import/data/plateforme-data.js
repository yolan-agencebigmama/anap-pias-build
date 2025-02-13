const HC_ITEMS = [
    {
        couleur : ["#134A86"],
        itemHex : {
            position : [-5, 0],
            titre : "Finances",
            img : "assets/hex/items/item-hex-finances.png",
        },
        itemMenu : {
            imgBg : "assets/hex/items/item-hex-finances-bg.png",
            imgParallax : "assets/hex/items/item-hex-finances-s.png",
            parallaxAnchor : "center",
            scale : 1.6,
        },
        menu : {
            description : `Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet.<br>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet.`,
            links : [
                "Analyse pharmaceutique",
                "Flux de patients",
                "Qualifier l'expérience patient",
                "Qualité des soins",
                "Télésurveillance",
            ]
        }
    },
    {
        couleur : ["#00888F"],
        itemHex : {
            position : [-3, -2],
            titre : "Sécurité Informatique",
            img : "assets/hex/items/item-hex-securite_info.png",
        },
        itemMenu : {
            imgBg : "assets/hex/items/item-hex-securite_info-bg.png",
            imgParallax : "assets/hex/items/item-hex-securite_info-s.png",
            parallaxAnchor : "center",
            scale : 1.4,
        },
        menu : {
            description : "",
            links : [
                "Analyse pharmaceutique",
                "Flux de patients",
                "Qualifier l'expérience patient",
                "Qualité des soins",
                "Télésurveillance",
            ]
        }
    },
    {
        couleur : ["#8672B4"],
        itemHex : {
            position : [0, -4],
            titre : "Diagnostic",
            img : "assets/hex/items/item-hex-diagnostic.png",
        },
        itemMenu : {
            imgBg : "assets/hex/items/item-hex-diagnostic-bg.png",
            imgParallax : "assets/hex/items/item-hex-diagnostic-s.png",
            parallaxAnchor : "right bottom",
            scale : 1.325,
        },
        menu : {
            links : [
                "Analyse pharmaceutique",
                "Flux de patients",
                "Qualifier l'expérience patient",
                "Qualité des soins",
                "Télésurveillance",
            ]
        }
    },
    {
        couleur : ["#009CD9"],
        itemHex : {
            position : [-3, 2],
            titre : "Chirurgie",
            img : "assets/hex/items/item-hex-chirurgie.png",
        },
        itemMenu : {
            imgBg : "assets/hex/items/item-hex-chirurgie-bg.png",
            imgParallax : "assets/hex/items/item-hex-chirurgie-s.png",
            parallaxAnchor : "bottom center",
            scale : 1.3,
        },
        menu : {
            description : `Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet.`,
            links : [
                "Analyse pharmaceutique",
                "Flux de patients",
                "Qualifier l'expérience patient",
                "Qualité des soins",
                "Télésurveillance",
            ]
        }
    },
    {
        couleur : ["#FAA61A"],
        itemHex : {
            position : [2, 1],
            titre : "Ressources Humaines",
            img : "assets/hex/items/item-hex-rh.png",
        },
        itemMenu : {
            imgBg : "assets/hex/items/item-hex-rh-bg.png",
            imgParallax : "assets/hex/items/item-hex-rh-s.png",
            parallaxAnchor : "bottom right",
            scale : 1.7,
        },
        menu : {
            links : [
                "Analyse pharmaceutique",
                "Flux de patients",
                "Qualifier l'expérience patient",
                "Qualité des soins",
                "Télésurveillance",
            ]
        }
    },
    {
        couleur : ["#A61A37"],
        itemHex : {
            position : [3, -3],
            titre : "Impact Performance",
            img : "assets/hex/items/item-hex-impact_perf.png",
        },
        itemMenu : {
            imgBg : "assets/hex/items/item-hex-impact_perf-bg.png",
            imgParallax : "assets/hex/items/item-hex-impact_perf-s.png",
            parallaxAnchor : "bottom left",
            scale : 1.35,
        },
        menu : {
            links : [
                "Analyse pharmaceutique",
                "Flux de patients",
                "Qualifier l'expérience patient",
                "Qualité des soins",
                "Télésurveillance",
            ]
        }
    },
    {
        couleur : ["#A6C54C"],
        itemHex : {
            position : [5, 0],
            titre : "Parcours Patient",
            img : "assets/hex/items/item-hex-parcours_patient.png",
        },
        itemMenu : {
            imgBg : "assets/hex/items/item-hex-parcours_patient-bg.png",
            imgParallax : "assets/hex/items/item-hex-parcours_patient-s.png",
            parallaxAnchor : "bottom center",
            scale : 1.4,
        },
        menu : {
            links : [
                "Analyse pharmaceutique",
                "Flux de patients",
                "Qualifier l'expérience patient",
                "Qualité des soins",
                "Télésurveillance",
            ]
        }
    },
]

const FICHES = {
    "identifier" : {
        titre : "Sécuriser la prescription médicamenteuse avec Posos",
        tags : [ // facultatif
            "Analyse pharmaceutique",
            "Qualité des soins"
        ],
        logo : "assets/fiches/logo-fiche.png", // facultatif
        location : "Centre Hospitalier de Bourg en Bresse", // facultatif

        description : `
            <b>Verbatim Utilisateur :</b> « Posos est la pièce du puzzle qui manquait pour sécuriser les ordonnances avec des données fiables. La recherche d’information est quasi immédiate ! »
            <br><tcolor><i>Témoignage de Joris GALLAND Médecin Interniste au CH de Bourg en Bresse et utilisateur de la solution</i></tcolor>
            <br>
            <br><b>Utilisateurs cibles</b>
            <br>Pharmaciens, Médecins, en particulier : psychiatre, anesthésistes, gériatres et urgentistes
        `, // facultatif

        infosProjet : {
            maturation : 8, // facultatif

            titre : "Le projet CH de Bourg en Bresse",
            details : [ // facultatif
                {
                    titre : "Dates clés et avancement :",
                    texte : "Solution acquise en mars 2022"
                },
                {
                    titre : "Conseil de mise en place :",
                    texte : "Anticiper les interfaces dès la mise en place pour une conduite du changement plus rapide au sein de l’établissement"
                },
            ],

            meta : { // facultatif
                details : "Interface avec le DPI",
                hosting : "Cloud"
            },

            keywords : [ // facultatif
                "NLP",
                "Adaptation posologique",
                "Retranscription automatique",
                "Sécurisation",
            ],
        },

        contacts : [ // facultatif
            {
                name : "Goulven De Pontbriand",
                role : "Directeur Marketing et Communication de Posos",
                details : [
                    {
                        titre : "Email",
                        contact : "goulven.de.pontbriand@posos.fr",
                        href : "#test", // facultatif
                    },
                ],
            },
            {
                name : "Goulven De Pontbriand",
                role : "", // facultatif
                details : [
                    {
                        titre : "Téléphone",
                        contact : "0123456789",
                    },
                ],
            }
        ],

        timeline : [
            {
                titre: "Histoire de la solution",
                details: [
                    "Créée en 2017, par un pharmacien et un informaticien, l’équipe de Posos est composée actuellement de 40 collaborateurs,",
                    "Plus de 40% de ses effectifs sont pharmaciens."
                ]
            },
            {
                titre: "Nature de la solution et modalité d'évaluation",
                details: [
                    "", // test vide qui sera retiré automatiquement
                    "IA de reconnaissance du langage spécialisé dans la compréhension des abréviations, de la Dci, formes…,",
                    "DM de niveau 1"
                ]
            },
            {
                titre: "Description de la solution Posos",
                details: [
                    "Retranscription intelligente des ordonnances en informations structurées à partir d’une photographie ( Services d’urgences, Anesthésistes, …),",
                    "Identification des risques iatrogènes lié au terrain et antécédents patients,",
                    "Propositions d’alternatives thérapeutiques compatibles avec le terrain patient et disponible au livret thérapeutique.",
                    // tests de niveaux
                    [
                        "Deuxième niveau",
                        "test",
                        [
                            "Troisième niveau",
                        ],
                        "test #2 (vide)",
                        [],
                        "test #3",
                        [
                            "Troisième niveau #3",
                        ],
                    ],
                    "Retranscription intelligente des ordonnances en informations structurées à partir d’une photographie ( Services d’urgences, Anesthésistes, …),",
                    "Identification des risques iatrogènes lié au terrain et antécédents patients,",
                    "Propositions d’alternatives thérapeutiques compatibles avec le terrain patient et disponible au livret thérapeutique.",
                ]
            },
            {
                titre: "Perspectives de solution",
                details: [
                    "Etude clinique en cours afin de mesurer l’impact de Posos sur l’organisation de l’organisme et le gain de temps associé."
                ]
            }
        ],
    },


    "id2" : {
        titre : "Sécuriser la prescription médicamenteuse avec Posos",
        tags : [ // facultatif
            "Analyse pharmaceutique",
        ],
        location : "Centre Hospitalier de Bourg en Bresse", // facultatif

        description : `
            <b>Verbatim Utilisateur :</b> « Posos est la pièce du puzzle qui manquait pour sécuriser les ordonnances avec des données fiables. La recherche d’information est quasi immédiate ! »
            <br><tcolor><i>Témoignage de Joris GALLAND Médecin Interniste au CH de Bourg en Bresse et utilisateur de la solution</i></tcolor>
            <br>
            <br><b>Utilisateurs cibles</b>
            <br>Pharmaciens, Médecins, en particulier : psychiatre, anesthésistes, gériatres et urgentistes
        `, // facultatif

        infosProjet : {
            maturation : 2, // facultatif

            titre : "Le projet CH de Bourg en Bresse",
            details : [ // facultatif
                {
                    titre : "Dates clés et avancement :",
                    texte : "Solution acquise en mars 2022"
                },
                {
                    titre : "Conseil de mise en place :",
                    texte : "Anticiper les interfaces dès la mise en place pour une conduite du changement plus rapide au sein de l’établissement"
                },
            ],
        },
    },
    "id3" : {
        titre : "Sécuriser la prescription médicamenteuse avec Posos",
        tags : [ // facultatif
            "Analyse pharmaceutique",
        ],
        location : "Centre Hospitalier de Bourg en Bresse", // facultatif

        description : `
            <b>Verbatim Utilisateur :</b> « Posos est la pièce du puzzle qui manquait pour sécuriser les ordonnances avec des données fiables. La recherche d’information est quasi immédiate ! »
            <br><tcolor><i>Témoignage de Joris GALLAND Médecin Interniste au CH de Bourg en Bresse et utilisateur de la solution</i></tcolor>
            <br>
            <br><b>Utilisateurs cibles</b>
            <br>Pharmaciens, Médecins, en particulier : psychiatre, anesthésistes, gériatres et urgentistes
        `, // facultatif

        infosProjet : {
            titre : "Le projet CH de Bourg en Bresse",
            details : [ // facultatif
                {
                    titre : "Dates clés et avancement :",
                    texte : "Solution acquise en mars 2022"
                },
                {
                    titre : "Conseil de mise en place :",
                    texte : "Anticiper les interfaces dès la mise en place pour une conduite du changement plus rapide au sein de l’établissement"
                },
            ],
        },
    },
    "id4" : {
        titre : "Sécuriser la prescription médicamenteuse avec Posos",
        tags : [ // facultatif
            "Analyse pharmaceutique",
        ],
        location : "Centre Hospitalier de Bourg en Bresse", // facultatif

        description : `
            <b>Verbatim Utilisateur :</b> « Posos est la pièce du puzzle qui manquait pour sécuriser les ordonnances avec des données fiables. La recherche d’information est quasi immédiate ! »
            <br><tcolor><i>Témoignage de Joris GALLAND Médecin Interniste au CH de Bourg en Bresse et utilisateur de la solution</i></tcolor>
            <br>
            <br><b>Utilisateurs cibles</b>
            <br>Pharmaciens, Médecins, en particulier : psychiatre, anesthésistes, gériatres et urgentistes
        `, // facultatif

        infosProjet : {
            maturation : 10, // facultatif

            titre : "Le projet CH de Bourg en Bresse",
            details : [ // facultatif
                {
                    titre : "Dates clés et avancement :",
                    texte : "Solution acquise en mars 2022"
                },
                {
                    titre : "Conseil de mise en place :",
                    texte : "Anticiper les interfaces dès la mise en place pour une conduite du changement plus rapide au sein de l’établissement"
                },
            ],
        },
    },
}


export {
    HC_ITEMS, FICHES
}
