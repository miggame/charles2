let Lodash = require('Lodash');
module.exports = {
    color: [
        '#F5AA09',
        '#F464A1',
        '#AF8851',
        '#5595DF',
        '#3F9E6F',
        '#FF460E',
        '#DE2778',
        '#BF1C46',
        '#567242',
        '#004A8F'
    ],

    getColor() {
        let item = Lodash.sample(this.color);
        return cc.color(item);
    }
};