let Observer = require('Observer');
let ImageUtil = require('ImageUtil');
cc.Class({
    extends: Observer,

    properties: {
        spPropIcon: { displayName: 'propIcon', default: null, type: cc.Sprite },
        lblPropSkill1: { displayName: 'lblPropSkill1', default: null, type: cc.Label },
        lblPropSkill2: { displayName: 'lblPropSkill2', default: null, type: cc.Label },
        lblCost: { displayName: 'lblCost', default: null, type: cc.Label },

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
            this.lblPropSkill1.string = data.skill1 + '+' + data.value1 + '%';
            this.lblPropSkill2.node.active = true;
            this.lblPropSkill2.string = data.skill2 + '+' + data.value2 + '%';
        }
        this.lblCost.string = data.cost;

        let pic = 'uiModule/main/upgradeLayer/icon_' + id;
        ImageUtil.setImg(this.spPropIcon, pic);
    }
});
