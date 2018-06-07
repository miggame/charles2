module.exports = {
    setImg(sprite, url) {
        if (sprite && url) {
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, frame) {
                if (!err) {
                    sprite.spriteFrame = frame;
                } else {
                    cc.log(err);
                }
            });
        }
    }
};