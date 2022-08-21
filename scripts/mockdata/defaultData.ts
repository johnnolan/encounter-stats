export const defaultData = { 
    "_roll": {
        "class": "D20Roll",
        "options": {
            "flavor": "Flame Tongue Greatsword - Attack Roll",
            "advantageMode": 0,
            "defaultRollMode": "roll",
            "critical": 20,
            "fumble": 1,
            "rollMode": "roll"
        },
        "dice": [],
        "formula": "1d20 + 4 + 3",
        "terms": [
            {
                "class": "Die",
                "options": {
                    "critical": 20,
                    "fumble": 1
                },
                "evaluated": true,
                "number": 1,
                "faces": 20,
                "modifiers": [],
                "results": [
                    {
                        "result": 8,
                        "active": true,
                        "indexThrow": 0
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
                "options": {},
                "evaluated": true,
                "number": 4
            },
            {
                "class": "OperatorTerm",
                "options": {},
                "evaluated": true,
                "operator": "+"
            },
            {
                "class": "NumericTerm",
                "options": {},
                "evaluated": true,
                "number": 3
            }
        ],
        "total": 15,
        "evaluated": true
    },
    "data":  {
        "id": "dohUoKDuhUysScfn",
        "type": 5,
        "user": "4XzLH56iD4mk8Rt7",
        "timestamp": 1624213402311,
        "flavor": "Flame Tongue Greatsword - Attack Roll",
        "content": "15",
        "speaker": {
            "scene": "zakr5fs3Zk0DdiKy",
            "token": "xPjNEnWtA2zb8Me4",
            "actor": "5H4YnyD6zf9vcJ3P",
            "alias": "Lorena Aldabra"
        },
        "whisper": [],
        "blind": false,
        "roll": "{\"class\":\"D20Roll\",\"options\":{\"flavor\":\"Flame Tongue Greatsword - Attack Roll\",\"advantageMode\":0,\"defaultRollMode\":\"roll\",\"critical\":20,\"fumble\":1,\"rollMode\":\"roll\"},\"dice\":[],\"formula\":\"1d20 + 4 + 3\",\"terms\":[{\"class\":\"Die\",\"options\":{\"critical\":20,\"fumble\":1},\"evaluated\":true,\"number\":1,\"faces\":20,\"modifiers\":[],\"results\":[{\"result\":8,\"active\":true}]},{\"class\":\"OperatorTerm\",\"options\":{},\"evaluated\":true,\"operator\":\"+\"},{\"class\":\"NumericTerm\",\"options\":{},\"evaluated\":true,\"number\":4},{\"class\":\"OperatorTerm\",\"options\":{},\"evaluated\":true,\"operator\":\"+\"},{\"class\":\"NumericTerm\",\"options\":{},\"evaluated\":true,\"number\":3}],\"total\":15,\"evaluated\":true}",
        "sound": "sounds/dice.wav",
        "emote": false,
        "flags": {
            "dnd5e": {
                "roll": {
                    "type": "attack",
                    "itemId": "q978kVgW7qB96FYH"
                }
            }
        }
    }
};
