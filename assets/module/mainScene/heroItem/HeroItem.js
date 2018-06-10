let Observer = require('Observer');
let ImageUtil = require('ImageUtil');
let HeroItemModule = require('HeroItemModule');
let PropConfig = require('PropConfig');

cc.Class({
    extends: Observer,

    properties: {
        spBooster: { displayName: 'spBooster', default: null, type: cc.Sprite },
        spHead: { displayName: 'spHead', default: null, type: cc.Sprite },
        spBody: { displayName: 'spBody', default: null, type: cc.Sprite },
    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [
            HeroItemModule.Msg.UpgradeHead,
            HeroItemModule.Msg.UpgradeBody,
            HeroItemModule.Msg.UpgradeBooster
        ];
    },

    _onMsg(msg, data) {

        if (msg === HeroItemModule.Msg.UpgradeHead) {
            this._refreshHead(data);
        } else if (msg === HeroItemModule.Msg.UpgradeBody) {
            this._refreshBody(data);
        } else if (msg === HeroItemModule.Msg.UpgradeBooster) {
            this._refreshBooster(data);
        }
    },
    onLoad() {
        this._initMsg();
        let characterData = PropConfig.character[1];
        this.init(characterData);
    },

    start() {

    },

    // update (dt) {},
    init(data) {
        this._refreshHead(data);
        this._refreshBody(data);
        this._refreshBooster(data);
    },

    _refreshHead(data) {
        let headLV = data.headLV;
        if (headLV === 0) {
            this.spHead.node.active = false;
            return;
        }
        this.spHead.node.active = true;
        let pic = 'uiModule/hero/head_' + headLV;
        ImageUtil.setImg(this.spHead, pic);
    },

    _refreshBody(data) {
        let bodyLV = data.bodyLV;
        if (bodyLV === 0) {
            this.spBody.node.active = false;
            return;
        }
        this.spBody.node.active = true;
        let pic = 'uiModule/hero/body_' + bodyLV;
        ImageUtil.setImg(this.spBody, pic);
    },

    _refreshBooster(data) {
        let boosterLV = data.boosterLV;
        if (boosterLV === 0) {
            this.spBooster.node.active = false;
            return;
        }
        this.spBooster.node.active = true;
        let pic = 'uiModule/hero/booster_' + boosterLV;
        ImageUtil.setImg(this.spBooster, pic);
    }
});
