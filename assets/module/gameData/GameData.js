let ObserverMgr = require('ObserverMgr');
module.exports = {
    totalStage: 51,
    maxStage: 5,
    selectedStage: 1,
    gold: 1000000,

    initGameDataEvent() {
        ObserverMgr.removeEventListenerWithObject(this);

        ObserverMgr.addEventListener(GameLocalMsg.UpdatePlayerGold, function (msg, data) {
            this.gold = data;
        }, this);
    }
};