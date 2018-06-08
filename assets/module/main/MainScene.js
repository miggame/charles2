let Observer = require('Observer');
let GameData = require('GameData');
let PropConfig = require('PropConfig');
cc.Class({
    extends: Observer,

    properties: {
        // spHeroSmall: { displayName: 'spHeroSmall', default: null, type: cc.Sprite },
        // spHero: { displayName: 'spHero', default: null, type: cc.Sprite },
        // btnDownLayout: { displayName: 'btnDownLayout', default: null, type: cc.Node },
        startLayer: { displayName: 'startLayer', default: null, type: cc.Node },
        collectionLayer: { displayName: 'collectionLayer', default: null, type: cc.Node },
        collectionScrollView: { displayName: 'collectionScrollView', default: null, type: cc.ScrollView },
        stageArrowR: { displayName: 'stageArrowR', default: null, type: cc.Node },
        stageArrowL: { displayName: 'stageArrowL', default: null, type: cc.Node },
        lblStage: { displayName: 'lblStage', default: null, type: cc.Label },

        stageItemPre: { displayName: 'stageItemPre', default: null, type: cc.Prefab },
        upgradeLayer: { displayName: 'upgradeLayer', default: null, type: cc.Node },
        midNode: { displayName: 'midNode', default: null, type: cc.Node },
        downNode: { displayName: 'downNode', default: null, type: cc.Node },
        propNode: { displayName: 'propNode', default: null, type: cc.Node },

        propStoreHotItemPre: { displayName: 'propStoreHotItemPre', default: null, type: cc.Prefab },

        propStoreItemPre: { displayName: 'propStoreItemPre', default: null, type: cc.Prefab },
        propScrollView: { displayName: 'propScrollView', default: null, type: cc.ScrollView },

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
        this.collectionLayer.x = this._width;
        this.upgradeLayer.x = this._width;
        this._initStage();
    },

    _initStage() {
        if (GameData.maxStage === 0) {
            this.stageArrowL.active = false;
            this.stageArrowR.active = false;
        } else {
            if (GameData.selectedStage === GameData.maxStage + 1) {
                this.stageArrowR.active = false;
                this.stageArrowL.active = true;
            } else if (GameData.selectedStage === 1) {
                this.stageArrowL.active = false;
                this.stageArrowR.active = true;
            } else {
                this.stageArrowL.active = true;
                this.stageArrowR.active = true;
            }
        }
        this._initStageLabel();
    },

    _initStageLabel() {
        this.lblStage.string = 'STAGE ' + GameData.selectedStage;
    },

    onBtnClickToStart() {
        this.startLayer.getComponent(cc.Animation).play('start');
    },

    onBtnClickToStageSelect(e) {
        switch (e.target.name) {
            case 'stageArrowLeft':
                GameData.selectedStage--;
                if (GameData.selectedStage < 1) {
                    GameData.selectedStage = 1;
                }
                this._initStage();
                break;
            case 'stageArrowRight':
                GameData.selectedStage++;
                if (GameData.selectedStage > GameData.maxStage + 1) {
                    GameData.selectedStage = GameData.maxStage + 1;
                }
                this._initStage();
                break;
            default:
                this._initStage();
                break;
        }
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

    onBtnClickToUpgrade() {
        this._showCharacter();
        let moveAct = cc.moveBy(0.5, cc.p(-this._width, 0));
        this.startLayer.runAction(moveAct);
        this.upgradeLayer.runAction(moveAct.clone());

    },

    onBtnClickToBack() {
        cc.director.loadScene('MainScene');
        // this.collectionLayer.active = false;
    },

    onBtnClickToCharacterAndItem(e) {
        switch (e.target.name) {
            case 'toggleCharacter':
                this._showCharacter();
                break;
            case 'toggleItem':
                this._showItem();
                break;
            default:
                break;
        }
    },

    _showCharacter() {
        this.midNode.active = true;
        this.downNode.active = true;
        this.propNode.active = false;
    },

    _showItem() {
        this.midNode.active = false;
        this.downNode.active = false;
        this.propNode.active = true;
        this.propScrollView.content.destroyAllChildren();
        let propStoreHotItem = cc.instantiate(this.propStoreHotItemPre);
        this.propScrollView.content.addChild(propStoreHotItem);
        let propData = PropConfig.prop;
        let len = Object.keys(propData).length - 1;
        for (let i = 0; i < len; ++i) {
            let propStoreItem = cc.instantiate(this.propStoreItemPre);
            this.propScrollView.content.addChild(propStoreItem);
            propStoreItem.getComponent('PropStoreItem').init(propData[i + 1], parseInt(i + 1));
        }
    }

});
