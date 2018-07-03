let Observer = require('Observer');
let Steering = require('Steering');
let EnemyModule = require('EnemyModule');
let ObserverMgr = require('ObserverMgr');
cc.Class({
    extends: Observer,

    properties: {
        _tarPoint: null,
        _deadFlag: false
    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [
            'TarP',
            GameLocalMsg.GameOver
        ];
    },

    _onMsg(msg, data) {
        if (msg === 'TarP') {
            this._tarPoint = data;
        } else if (msg === GameLocalMsg.GameOver) {
            this._deadFlag = true;
            this.playSplit();
        }
    },

    onLoad() {
        this._initMsg();
        this._initView();
    },

    start() {

    },

    _initView() {
        // console.log('EnemyModule.getColor: ', EnemyModule.getColor);
        // cc.log(this.node.color);
        this._deadFlag = false;
        this.node.color = EnemyModule.getColor();
    },

    update(dt) {
        if (this._tarPoint !== null && !this._deadFlag) {

            if (this.checkCollision()) {
                console.log('collisioned');
                ObserverMgr.dispatchMsg(GameLocalMsg.GameOver, null);
                return;//碰撞发生
            } else {
                //未发生碰撞
                let force = this.seek(this._tarPoint);
                this.node.position = cc.pAdd(this.node.position, cc.pMult(force, dt));
            }

        }
    },

    seek(tarp) {
        let target = tarp;
        let position = this.node.position;
        let current_velocity = cc.p(0, 0);
        let max_velocity = 50;
        return Steering.seek(target, position, current_velocity, max_velocity);
    },

    // init(p) {
    //     this._force = this.seek(p);
    // }

    checkCollision() {
        let selfPos = this.node.position;
        let tarPos = this._tarPoint;
        let distance = cc.pDistance(selfPos, tarPos);
        if (distance < this.node.width / 2) {
            this._deadFlag = true;
            return true;
        } else {
            return false;
        }
    },

    playSplit() {
        this.node.getComponent(cc.Animation).play('split');
    },

    selfRemove() {
        this.node.destroy();//removeFromParent();
        console.log('selfremove: ');
    }
});
