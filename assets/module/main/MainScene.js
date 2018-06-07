let Observer = require('Observer');
let GameData = require('GameData');
cc.Class({
    extends: Observer,

    properties: {
        // spHeroSmall: { displayName: 'spHeroSmall', default: null, type: cc.Sprite },
        // spHero: { displayName: 'spHero', default: null, type: cc.Sprite },
        // btnDownLayout: { displayName: 'btnDownLayout', default: null, type: cc.Node },
        startLayer: { displayName: 'startLayer', default: null, type: cc.Node },
        collectionLayer: { displayName: 'collectionLayer', default: null, type: cc.Node },
        collectionScrollView: { displayName: 'collectionScrollView', default: null, type: cc.ScrollView },
        stageItemPre: { displayName: 'stageItemPre', default: null, type: cc.Prefab },

    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [];
    },

    _onMsg(msg, data) {

    },
    onLoad() {
        this._initMsg();
        this._height = cc.view.getVisibleSize().height;
        this._width = cc.view.getVisibleSize().width;
        this._initView();
    },

    start() {

    },

    // update (dt) {},

    _initView() {
        this.collectionLayer.x = this.width;
    },

    onBtnClickToStart() {
        this.startLayer.getComponent(cc.Animation).play('start');
    },

    onBtnClickToCollection() {
        let moveAct = cc.moveBy(0.5, cc.p(-this._width, 0));
        this.startLayer.runAction(moveAct);
        this.collectionLayer.runAction(moveAct.clone());
        let len = GameData.totalStage;
        this.collectionScrollView.content.destroyAllChildren();
        for (let i = 0; i < len; ++i) {
            let stageItem = cc.instantiate(this.stageItemPre);
            this.collectionScrollView.content.addChild(stageItem);
            stageItem.getComponent('StageItem').init(i);
        }
    },

    onBtnClickToBack() {
        cc.director.loadScene('MainScene');
        // this.collectionLayer.active = false;
    }
});
