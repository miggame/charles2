let Observer = require('Observer');
let ObserverMgr = require('ObserverMgr');
cc.Class({
    extends: Observer,

    properties: {
        lblStage: { displayName: 'lblStage', default: null, type: cc.Label },
        heroNode: { displayName: 'heroNode', default: null, type: cc.Node },
        touchLayer: { displayName: 'touchLayer', default: null, type: cc.Node },
        enemyLayer: { displayName: 'enemyLayer', default: null, type: cc.Node },
        enemyItemPre: { displayName: 'enemyItemPre', default: null, type: cc.Prefab },
        overLayer: { displayName: 'overLayer', default: null, type: cc.Node },
        _prePos: null
    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [
            "TarP",
            GameLocalMsg.GameOver
        ];
    },

    _onMsg(msg, data) {
        if (msg === GameLocalMsg.GameOver) {
            this.heroNode.active = false;
            this.unschedule(this._initEnemy, this);
            this.touchLayer.off('touchstart', this._startCallBack, this);
            this.touchLayer.off('touchmove', this._moveCallBack, this);
            this.touchLayer.off('touchend', function (event) {

            }, this);
            this.touchLayer.off('touchcancel', function (event) {

            }, this);

            this._showOver();
        }
    },
    onLoad() {
        this._initMsg();
        this._hideOver();
    },

    start() {

    },

    update(dt) {

    },
    init(i) {
        this.lblStage.string = 'STAGE ' + i;
    },

    initTouchListener() {//动画播放完毕调用此方法

        // this.touchLayer.on('touchstart', function (event) {
        //     this._prePos = event.getLocation();
        //     return true;
        // }, this);
        // this.touchLayer.on('touchmove', function (event) {
        //     this._refreshTargetPos();
        //     this.heroNode.position = cc.pAdd(this.heroNode.position, event.getDelta());
        //     this._refreshHeroRotation(this._prePos, event.getLocation());
        //     this._limitHeroBorder();
        // }, this);
        this.touchLayer.on('touchstart', this._startCallBack, this);
        this.touchLayer.on('touchmove', this._moveCallBack, this);
        this.touchLayer.on('touchend', function (event) {
        }, this);
        this.touchLayer.on('touchcancel', function (event) {

        }, this);

        // this.schedule(this._initEnemy, 1, 6, 0);
        this.schedule(this._initEnemy, 0.5);
    },

    _initEnemy() {
        let enemyNode = cc.instantiate(this.enemyItemPre);
        this.enemyLayer.addChild(enemyNode);
        let x = cc.randomMinus1To1() * cc.view.getVisibleSize().width / 2;
        let y = cc.randomMinus1To1() * cc.view.getVisibleSize().height / 2;
        enemyNode.position = cc.p(x, y);
        this._refreshTargetPos();
    },

    _limitHeroBorder() {
        let width = cc.view.getVisibleSize().width;
        let height = cc.view.getVisibleSize().height;
        let x = this.heroNode.x;
        let y = this.heroNode.y;
        if (x < -width / 2 * 0.9) {
            this.heroNode.x = -width / 2 * 0.9;
        } else if (x > width / 2 * 0.9) {
            this.heroNode.x = width / 2 * 0.9;
        }
        if (y < -height / 2 * 0.8) {
            this.heroNode.y = -height / 2 * 0.8;
        } else if (y > height / 2 * 0.8) {
            this.heroNode.y = height / 2 * 0.8;
        }
    },

    _refreshHeroRotation(prePos, curPos) {
        let diff = cc.pSub(curPos, prePos);
        if (Math.abs(diff.x) > 20 || Math.abs(diff.y) > 20) {
            this._prePos = curPos;
            let normalDiff = cc.pNormalize(diff);
            let radian = cc.pAngle(normalDiff, cc.p(0, 1));
            let degree = 180 / Math.PI * radian;

            if (normalDiff.x < 0) {
                this.heroNode.rotation = -degree;
            } else {
                this.heroNode.rotation = degree;
            }
        }
    },

    _refreshTargetPos() {
        ObserverMgr.dispatchMsg('TarP', this.heroNode.position);
    },

    _startCallBack(event) {
        this._prePos = event.getLocation();
        return true;
    },
    _moveCallBack(event) {
        this._refreshTargetPos();
        this.heroNode.position = cc.pAdd(this.heroNode.position, event.getDelta());
        this._refreshHeroRotation(this._prePos, event.getLocation());
        this._limitHeroBorder();
    },

    _hideOver() {
        this.overLayer.active = false;
    },
    _showOver() {
        this.overLayer.active = true;
        this.node.getComponent(cc.Animation).play('over');
    },

    onBtnClickToRestart() {
        ObserverMgr.dispatchMsg(GameLocalMsg.GameRestart, null);
    },

    onBtnClickToMainScene() {
        cc.director.loadScene('MainScene');
    },

    onBtnClickToUpgrade() {
        ObserverMgr.dispatchMsg(GameLocalMsg.UpgradePlayer, null);
    }
});
