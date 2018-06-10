let Observer = require('Observer');
let ObserverMgr = require('ObserverMgr');
let ImageUtil = require('ImageUtil');
let PropConfig = require('PropConfig');
let GameData = require('GameData');
cc.Class({
    extends: Observer,

    properties: {
        spPropIcon: { displayName: 'propIcon', default: null, type: cc.Sprite },
        lblPropSkill1: { displayName: 'lblPropSkill1', default: null, type: cc.Label },
        lblPropSkill2: { displayName: 'lblPropSkill2', default: null, type: cc.Label },
        lblPropCost: { displayName: 'lblPropCost', default: null, type: cc.Label },
        _index: null
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

    init(data, id) {
        if (data.skill1 === 'null' || data.value1 === 'null') {
            this.lblPropSkill1.node.active = false;
        } else if (data.skill2 === 'null' || data.value2 === 'null') {
            this.lblPropSkill2.node.active = false;
        } else {
            this.lblPropSkill1.node.active = true;
            this.lblPropSkill1.string = data.skill1 + '+' + data.value1 * data.level + '%';
            this.lblPropSkill2.node.active = true;
            this.lblPropSkill2.string = data.skill2 + '+' + data.value2 * data.level + '%';
        }
        this.lblPropCost.string = data.cost * (data.level + 1);
        let pic = 'uiModule/main/upgradeLayer/icon_' + id;
        ImageUtil.setImg(this.spPropIcon, pic);

        this._index = id;
    },

    onBtnClickToBuy() {
        let level = PropConfig.getPropCfg(this._index, 'level');

        let cost = PropConfig.getPropCfg(this._index, 'cost');
        let totalCost = cost * (level + 1);
        let nextCost = cost * (level + 2);
        let gold = GameData.gold;
        let comp = gold - totalCost;
        if (comp < 0) {
            return;
        }
        //更新数据
        ObserverMgr.dispatchMsg(GameLocalMsg.UpdatePlayerGold, comp);
        PropConfig.setPropCfg(this._index, 'level', level + 1);
        this.lblPropCost.string = nextCost;
        let skill1 = PropConfig.getPropCfg(this._index, 'skill1');
        let value1 = PropConfig.getPropCfg(this._index, 'value1');
        let skill2 = PropConfig.getPropCfg(this._index, 'skill2');
        let value2 = PropConfig.getPropCfg(this._index, 'value2');
        if (value1 !== 'null') {
            this.lblPropSkill1.node.active = true;
            this.lblPropSkill1.string = skill1 + '+' + value1 * (level + 1) + '%';
        }
        if (value2 !== 'null') {
            this.lblPropSkill2.node.active = true;
            this.lblPropSkill2.string = skill2 + '+' + value2 * (level + 1) + '%';
        }
    }
});
