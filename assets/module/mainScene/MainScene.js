let Observer = require('Observer');
let ObserverMgr = require('ObserverMgr');
let GameData = require('GameData');
let PropConfig = require('PropConfig');
let HeroItemModule = require('HeroItemModule');
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
        lblHeadCost: { displayName: 'lblHeadCost', default: null, type: cc.Label },
        lblHeadLevel: { displayName: 'lblHeadLevel', default: null, type: cc.Label },
        lblBodyCost: { displayName: 'lblBodyCost', default: null, type: cc.Label },
        lblBodyLevel: { displayName: 'lblBodyLevel', default: null, type: cc.Label },
        lblBoosterCost: { displayName: 'lblBoosterCost', default: null, type: cc.Label },
        lblBoosterLevel: { displayName: 'lblBoosterLevel', default: null, type: cc.Label },
        heroItemNode: { displayName: 'heroItemNode', default: null, type: cc.Node },
        heroItemPre: { displayName: 'heroItemPre', default: null, type: cc.Prefab },
        lblGold: { displayName: 'lblGold', default: null, type: cc.Label },

        heroSmallNode: { displayName: 'heroSmallNode', default: null, type: cc.Node },
        heroNode: { displayName: 'heroNode', default: null, type: cc.Node },

        stageLayer: { displayName: 'stageLayer', default: null, type: cc.Node },
        stagePre: { displayName: 'stagePre', default: null, type: cc.Prefab },
    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [
            GameLocalMsg.UpdatePlayerGold,
            GameLocalMsg.GoStage
        ];
    },

    _onMsg(msg, data) {
        if (msg === GameLocalMsg.UpdatePlayerGold) {
            this.lblGold.string = data;
        } else if (msg === GameLocalMsg.GoStage) {
            this.stageLayer.destroyAllChildren();
            let stageNode = cc.instantiate(this.stagePre);
            this.stageLayer.addChild(stageNode);
            stageNode.y = this._height;
            this._moveDown(this.stageLayer);
            this._moveDown(this.startLayer);
        }
    },
    onLoad() {
        this._initMsg();
        GameData.initGameDataEvent();
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
        this._initSmallHero();
        this._initHero();
    },

    _initSmallHero() {
        this.heroSmallNode.destroyAllChildren();
        let characterData = PropConfig.character[1];
        let smallHero = cc.instantiate(this.heroItemPre);
        this.heroSmallNode.addChild(smallHero);
        smallHero.scale = 0.2;
        smallHero.getComponent('HeroItem').init(characterData);
    },

    _initHero() {
        this.heroNode.destroyAllChildren();
        let characterData = PropConfig.character[1];
        let hero = cc.instantiate(this.heroItemPre);
        this.heroNode.addChild(hero);
        hero.getComponent('HeroItem').init(characterData);
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
        // cc.director.loadScene('GameScene');
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
        this.lblGold.string = GameData.gold;
        this._showCharacter();
        let moveAct = cc.moveBy(0.5, cc.p(-this._width, 0));
        this.startLayer.runAction(moveAct);
        this.upgradeLayer.runAction(moveAct.clone());
        this._showHeroItem();
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
        this._refreshCharacter();
    },

    _showItem() {
        this.midNode.active = false;
        this.downNode.active = false;
        this.propNode.active = true;
        this._refreshItem();
    },

    _refreshItem() {
        this.propScrollView.content.destroyAllChildren();
        let propStoreHotItem = cc.instantiate(this.propStoreHotItemPre);
        this.propScrollView.content.addChild(propStoreHotItem);
        let propData = PropConfig.prop;
        let len = Object.keys(propData).length;
        for (let i = 0; i < len; ++i) {
            let propStoreItem = cc.instantiate(this.propStoreItemPre);
            this.propScrollView.content.addChild(propStoreItem);
            propStoreItem.getComponent('PropStoreItem').init(propData[i + 1], parseInt(i + 1));
        }
    },

    _refreshCharacter() {
        //head
        this._refreshHead();
        //body
        this._refreshBody();
        //booster
        this._refreshBooster();
    },

    _refreshHead() {
        let characterData = PropConfig.character[1];
        let headLevel = characterData.headLV;
        let headCost = characterData.headCost;
        if (headLevel === characterData.headMaxLV) {
            this.lblHeadLevel.string = "LV." + headLevel;
        } else {
            this.lblHeadLevel.string = "LV." + headLevel + "->LV." + parseInt(headLevel + 1);
        }
        this.lblHeadCost.string = headCost;
    },

    _refreshBody() {
        let characterData = PropConfig.character[1];
        let bodyLevel = characterData.bodyLV;
        let bodyCost = characterData.bodyCost;
        if (bodyLevel === characterData.bodyMaxLV) {
            this.lblBodyLevel.string = "LV." + bodyLevel;
        } else {
            this.lblBodyLevel.string = "LV." + bodyLevel + "->LV." + parseInt(bodyLevel + 1);
        }
        this.lblBodyCost.string = bodyCost;
    },

    _refreshBooster() {
        let characterData = PropConfig.character[1];
        let boosterLevel = characterData.boosterLV;
        let boosterCost = characterData.boosterCost;
        if (boosterLevel === characterData.boosterMaxLV) {
            this.lblBoosterLevel.string = "LV." + boosterLevel;
        } else {
            this.lblBoosterLevel.string = "LV." + boosterLevel + "->LV." + parseInt(boosterLevel + 1);
        }
        this.lblBoosterCost.string = boosterCost;
    },

    _showHeroItem() {
        let characterData = PropConfig.character[1];
        this.heroItemNode.destroyAllChildren();
        let heroItem = cc.instantiate(this.heroItemPre);
        this.heroItemNode.addChild(heroItem);
        heroItem.getComponent('HeroItem').init(characterData);
    },

    onBtnClickToHeroUpgrade(e) {
        switch (e.target.name) {
            case 'btnHeadUpgrade':
                let headLV = PropConfig.character[1].headLV;
                let headMaxLV = PropConfig.character[1].headMaxLV;
                if (headLV === headMaxLV) {
                    return;
                }
                if (headLV < PropConfig.character[1].headMaxLV) {
                    headLV++;
                }

                let headCost = parseInt(5000 * (headLV + 1));
                let headLeftGold = GameData.gold - PropConfig.character[1].headCost;
                if (headLeftGold < 0) {
                    return;
                }
                ObserverMgr.dispatchMsg(GameLocalMsg.UpdatePlayerGold, headLeftGold);
                PropConfig.setCharacterCfg('headLV', headLV);
                PropConfig.setCharacterCfg('headCost', headCost);
                this._refreshHead();
                ObserverMgr.dispatchMsg(HeroItemModule.Msg.UpgradeHead, PropConfig.character[1]);
                break;
            case 'btnBodyUpgrade':
                let bodyLV = PropConfig.character[1].bodyLV;
                let bodyMaxLV = PropConfig.character[1].bodyMaxLV;
                if (bodyLV === bodyMaxLV) {
                    return;
                }
                if (bodyLV < PropConfig.character[1].bodyMaxLV) {
                    bodyLV++;
                }
                let bodyCost = parseInt(5000 * (bodyLV + 1));
                let bodyLeftGold = GameData.gold - PropConfig.character[1].bodyCost;
                if (bodyLeftGold < 0) {
                    return;
                }
                ObserverMgr.dispatchMsg(GameLocalMsg.UpdatePlayerGold, bodyLeftGold);
                PropConfig.setCharacterCfg('bodyLV', bodyLV);
                PropConfig.setCharacterCfg('bodyCost', bodyCost);
                this._refreshBody();
                ObserverMgr.dispatchMsg(HeroItemModule.Msg.UpgradeBody, PropConfig.character[1]);
                break;

            case 'btnBoosterUpgrade':
                let boosterLV = PropConfig.character[1].boosterLV;
                let boosterMaxLV = PropConfig.character[1].boosterMaxLV;
                if (boosterLV === boosterMaxLV) {
                    return;
                }
                if (boosterLV < PropConfig.character[1].boosterMaxLV) {
                    boosterLV++;
                }
                let boosterCost = parseInt(5000 * (boosterLV + 1));
                let boosterLeftGold = GameData.gold - PropConfig.character[1].boosterCost;
                if (boosterLeftGold < 0) {
                    return;
                }
                ObserverMgr.dispatchMsg(GameLocalMsg.UpdatePlayerGold, boosterLeftGold);
                PropConfig.setCharacterCfg('boosterLV', boosterLV);
                PropConfig.setCharacterCfg('boosterCost', boosterCost);
                this._refreshBooster();
                ObserverMgr.dispatchMsg(HeroItemModule.Msg.UpgradeBooster, PropConfig.character[1]);
                break;
            default:
                break;
        }
    },

    _moveDown(node) {
        let moveDownAct = cc.moveBy(1, cc.p(0, -this._height));
        node.runAction(moveDownAct);
    }

});
