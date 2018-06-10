let Observer = require('Observer');
let GameData = require('GameData');
let ImageUtil = require('ImageUtil');
cc.Class({
    extends: Observer,

    properties: {
        lblStageNum: { displayName: 'lblStageNum', default: null, type: cc.Label },
        spBoss: { displayName: 'spBoss', default: null, type: cc.Sprite },
        spBg: { displayName: 'spBg', default: null, type: cc.Sprite },
        // spriteFrameArr: [cc.SpriteFrame],
        maskNode: { displayName: 'maskNode', default: null, type: cc.Node },

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
    init(index) {
        // this.spBoss._sgNode.setState(1);//置灰图片精灵
        this.spBoss.node.active = false;
        let curIndex = parseInt(index + 1);
        let stage = parseInt(curIndex * 5);
        this.lblStageNum.string = stage;
        let path = 'uiModule/main/collectionLayer/boss_' + curIndex;
        cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
            this.maskNode.getComponent(cc.Mask).spriteFrame = spriteFrame;
        }.bind(this));
        if (GameData.maxStage >= stage) {
            this.spBoss.node.active = true;
            ImageUtil.setImg(this.spBoss, path);
        }
    }
});
