let Observer = require('Observer');
cc.Class({
    extends: Observer,

    properties: {
        lblStage: { displayName: 'lblStage', default: null, type: cc.Label },
        heroNode: { displayName: 'heroNode', default: null, type: cc.Node },
        touchLayer: { displayName: 'touchLayer', default: null, type: cc.Node },
        enemyLayer: { displayName: 'enemyLayer', default: null, type: cc.Node },
        enemyItemPre: { displayName: 'enemyItemPre', default: null, type: cc.Prefab },
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

    update(dt) {

    },
    init(i) {
        this.lblStage.string = 'STAGE ' + i;
    },

    initTouchListener() {
        this.touchLayer.on('touchstart', function (event) {
            return true;
        }, this);
        this.touchLayer.on('touchmove', function (event) {
            this.heroNode.position = cc.pAdd(this.heroNode.position, event.getDelta());
        }, this);
        this.touchLayer.on('touchend', function (event) {
            this._initEnemy();
        }, this);
        this.touchLayer.on('touchcancel', function (event) {

        }, this);

        this.schedule(this._initEnemy, 1);
    },

    _initEnemy() {
        let enemyNode = cc.instantiate(this.enemyItemPre);
        this.enemyLayer.addChild(enemyNode);
        let x = cc.randomMinus1To1() * cc.view.getVisibleSize().width / 2;
        let y = cc.randomMinus1To1() * cc.view.getVisibleSize().height / 2;
        enemyNode.position = cc.p(x, y);
    }
});
