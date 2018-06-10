let Observer = require('Observer');
cc.Class({
    extends: Observer,

    properties: {
        cameraNode: { displayName: 'cameraNode', default: null, type: cc.Node },
        // cameraLayer: { displayName: 'cameraLayer', default: null, type: cc.Node },
        gameLayer: { displayName: 'gameLayer', default: null, type: cc.Node },
        uiLayer: { displayName: 'uiLayer', default: null, type: cc.Node },
        heroLayer: { displayName: 'heroLayer', default: null, type: cc.Node },
    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [];
    },

    _onMsg() {

    },
    onLoad() {
        this._initMsg();
        let moveAct = cc.moveBy(1, cc.p(0, 1920));
        this.gameLayer.runAction(cc.moveBy(1, cc.p(0, -1920)));
        this.heroLayer.runAction(cc.moveBy(1, cc.p(0, -1920).clone()));
        this.uiLayer.runAction(cc.moveBy(1, cc.p(0, -1920).clone()));
        // this.cameraLayer.runAction(cc.sequence(moveAct, cc.callFunc(function () {
        //     cc.log('>>>');
        //     cc.log(this.cameraNode.y);
        // }.bind(this))));
        // this.cameraNode.runAction(moveAct.clone().reverse());
    },

    start() {

    },

    // update (dt) {},
});
