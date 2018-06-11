module.exports = {
    seek(target, position, current_velocity, max_velocity, slowing_radius = 0) {
        let desired = cc.pSub(target, position);
        let distance = cc.pLength(desired);
        desired = cc.pNormalize(desired);
        if (distance < slowing_radius) {//???原始为<=
            cc.pMultIn(desired, (max_velocity * (distance / slowing_radius)));
        } else {
            cc.pMultIn(desired, max_velocity);
        }
        let force = cc.pSub(desired, current_velocity);
        return force;
    }
};