let Observer = require('Observer');
let Steering = require('Steering');
let EnemyModule = require('EnemyModule');

cc.Class({
    extends: Observer,

    properties: {
        _tarPoint: null
    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [
            'TarP'
        ];
    },

    _onMsg(msg, data) {
        if (msg === 'TarP') {
            this._tarPoint = data;
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
        this.node.color = EnemyModule.getColor();
    },

    update(dt) {
        if (this._tarPoint !== null) {
            let force = this.seek(this._tarPoint);
            this.node.position = cc.pAdd(this.node.position, cc.pMult(force, dt));
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
});
