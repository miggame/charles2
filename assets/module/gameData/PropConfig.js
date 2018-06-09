module.exports = {
    prop: {
        1: {
            skill1: "Coin",
            value1: 0,
            skill2: "null",
            value2: "null",
            cost: 5e3,
            level: 0
        },
        2: {
            skill1: "Range",
            value1: 0,
            skill2: "null",
            value2: "null",
            cost: 5e3,
            level: 0
        },
        3: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        4: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        5: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        6: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        7: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        8: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        9: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        10: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        11: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        12: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        13: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        14: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        15: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        16: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        17: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        18: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        },
        19: {
            skill1: "Size",
            value1: 0,
            skill2: "Power",
            value2: 0,
            cost: 5e3,
            level: 0
        }
    },
    character: {
        1: {
            headLV: 0,
            headCost: 5e3,
            headMaxLV: 5,
            bodyLV: 0,
            bodyCost: 5e3,
            bodyMaxLV: 6,
            boosterLV: 0,
            boosterCost: 5e3,
            boosterMaxLV: 5
        }
    },

    setCharacterCfg(key, value) {
        this.character[1][key] = value;
    },

    resetCharacterCfg() {
        //head
        this.character[1].headLV = 0;
        this.character[1].headCost = 5000;
        this.character[1].headMaxLV = 5;
        //body
        this.character[1].bodyLV = 0;
        this.character[1].bodyCost = 5000;
        this.character[1].bodyMaxLV = 6;
        //booster
        this.character[1].boosterLV = 0;
        this.character[1].boosterCost = 5000;
        this.character[1].boosterMaxLV = 5;

    }
};