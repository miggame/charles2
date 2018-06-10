let Observer = require('Observer');
let ObserverMgr = require('ObserverMgr');
cc.Class({
    extends: Observer,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [];
    },

    _onMsg(msg, data) {

    },
    onLoad() {
        this._initMsg();
    },

    start() {

    },

    // update (dt) {},
    goNext() {
        ObserverMgr.dispatchMsg(GameLocalMsg.GoStage, null);
    }
});
