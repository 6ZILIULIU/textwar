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

    
    static async loadBundle(bundleName: string) {
        let bundle = cc.assetManager.getBundle(bundleName)
        if (!bundle) {
            bundle = await new Promise<cc.AssetManager.Bundle>(resolve => {
                cc.assetManager.loadBundle(bundleName, (e, bundle) => {
                    if (e) console.error(JSON.stringify(e))
                    resolve(bundle)
                })
            })
        }
        return bundle;
    }

    static async loadAsset(bundle: cc.AssetManager.Bundle | string, path: string, type: any) {
        return new Promise<any>(async (resolve) => {
            if (typeof bundle === 'string') {
                let bundleName = bundle;
                bundle = await this.loadBundle(bundleName)
            }
            bundle.load(path, type, (e, asset) => {
                if (e) console.error(JSON.stringify(e))
                resolve(asset)
            })
        })
    }

    static async loadRemoteAsset(url: string, options: any) {
        return new Promise<any>(resolve => {
            cc.assetManager.loadRemote(url, options, (e, asset) => {
                if (e) console.error('loadRemoteAsset', JSON.stringify(e))
                resolve(asset)
            })
        })
    }

    static async playRandKeyEffect(){
        let num = Math.ceil(Math.random() * 32) + "";
        num = num.padStart(3, '0');
        let clip = await Utils.loadAsset(`single_key`, `keypress-${num}`, cc.AudioClip)
        cc.audioEngine.playEffect(clip, false);
    }
    static async play8BitRandKeyEffect(){
        let num = Math.ceil(Math.random() * 4) + "";
        // num = num.padStart(3, '0');
        let clip = await Utils.loadAsset(`typing_effect`, `Blip_Select2`, cc.AudioClip)
        cc.audioEngine.playEffect(clip, false);
    }
}

window["Utils"] = Utils;