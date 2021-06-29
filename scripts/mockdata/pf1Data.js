export const pf1Data = {
    "data": {
        "content": "",
        "speaker": {
            "scene": "pWowOdVWEsHYiMDh",
            "actor": "Cou0L73lWFc7wJUb",
            "token": "nfvD5GA7i1qjZpwA",
            "alias": "test1"
        },
        "flags": {
            "pf1": {
                "metadata": {
                    "item": "BFxFCgkXppOnKSUN",
                    "template": null,
                    "rolls": {
                        "attacks": {
                            "0": {
                                "attack": {
                                    "class": "RollPF$1",
                                    "options": {},
                                    "dice": [],
                                    "formula": "1d20 + 1[Base Attack Bonus]",
                                    "terms": [
                                        {
                                            "class": "Die",
                                            "options": {},
                                            "evaluated": true,
                                            "number": 1,
                                            "faces": 20,
                                            "modifiers": [],
                                            "results": [
                                                {
                                                    "result": 8,
                                                    "active": true
                                                }
                                            ]
                                        },
                                        {
                                            "class": "OperatorTerm",
                                            "options": {},
                                            "evaluated": true,
                                            "operator": "+"
                                        },
                                        {
                                            "class": "NumericTerm",
                                            "options": {
                                                "flavor": "Base Attack Bonus"
                                            },
                                            "evaluated": true,
                                            "number": 1
                                        }
                                    ],
                                    "total": 9,
                                    "evaluated": true
                                },
                                "damage": {
                                    "0": {
                                        "damageType": "S",
                                        "roll": {
                                            "class": "RollPF$1",
                                            "options": {},
                                            "dice": [],
                                            "formula": "1d10 + 0[Strength]",
                                            "terms": [
                                                {
                                                    "class": "Die",
                                                    "options": {},
                                                    "evaluated": true,
                                                    "number": 1,
                                                    "faces": 10,
                                                    "modifiers": [],
                                                    "results": [
                                                        {
                                                            "result": 5,
                                                            "active": true
                                                        }
                                                    ]
                                                },
                                                {
                                                    "class": "OperatorTerm",
                                                    "options": {},
                                                    "evaluated": true,
                                                    "operator": "+"
                                                },
                                                {
                                                    "class": "NumericTerm",
                                                    "options": {
                                                        "flavor": "Strength"
                                                    },
                                                    "evaluated": true,
                                                    "number": 0
                                                }
                                            ],
                                            "total": 5,
                                            "evaluated": true
                                        }
                                    }
                                },
                                "critConfirm": null,
                                "critDamage": {}
                            }
                        }
                    }
                }
            }
        }
    }
};
