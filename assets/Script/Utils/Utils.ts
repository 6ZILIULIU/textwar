class Utils {

    /**
     * 
     * @param sec 等待时间（秒）
     */
    static async asyncWait(sec = 0) {
        let asyncTimer = cc.find('Canvas/asyncTimer')
        if (!asyncTimer) {
            asyncTimer = new cc.Node('asyncTimer')
            asyncTimer.parent = cc.find('Canvas')
        }
        await new Promise(resolve => {
            asyncTimer.runAction(cc.sequence(
                cc.delayTime(sec),
                cc.callFunc(() => {
                    resolve(true)
                })
            ))
        })
    }
}

window["Utils"] = Utils;