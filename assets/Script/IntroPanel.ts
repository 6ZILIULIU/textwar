const { ccclass, property } = cc._decorator;

@ccclass
export default class MsgPanel extends cc.Component {

    @property
    playOnLoad = false;

    @property(cc.Node)
    infoBoard: cc.Node = null;
    @property(cc.Node)
    btnNext: cc.Node = null;
    

    @property
    introFileName = ""

    infoLabelHeight = 30;

    lastInfoLabel: cc.Label = null;

    protected start(): void {
        if (this.playOnLoad) {
            this.play();
        }
    }

    async play() {
        if (!this.introFileName) return;;
        let introTxt = await Utils.loadAsset('IntroText', this.introFileName, cc.JsonAsset)
        let txtlist = introTxt.text.split('\n')
        for (let i = 0; i < txtlist.length; i++) {
            await this.displayInfo(txtlist[i]);
            await this.hideLastInfo()
            await Utils.asyncWait(1);
        }
    }

    async hideLastInfo() {
        if (cc.isValid(this.lastInfoLabel)) {
            await new Promise(resolve => {
                this.lastInfoLabel.node.runAction(cc.sequence(cc.fadeTo(0.5, 0), cc.callFunc(() => {
                    resolve(1);
                })))
            })
        }
    }

    async displayInfo(infoStr: string) {
        let infoLabelNode = new cc.Node('info');
        infoLabelNode.setPosition(0, 0);
        infoLabelNode.setAnchorPoint(0.5, 0.5)
        let label = infoLabelNode.addComponent(cc.Label);
        label.fontSize = 40;
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        label.overflow = cc.Label.Overflow.NONE;
        infoLabelNode.parent = this.infoBoard;
        infoLabelNode.color = cc.Color.WHITE;
        label.string = infoStr;
        label.node.opacity = 0;
        this.lastInfoLabel = label;

        await new Promise(resolve => {
            this.lastInfoLabel.node.runAction(cc.sequence(
                cc.fadeTo(0.5, 255),
                cc.delayTime(2),
                cc.callFunc(() => {
                    resolve(1);
                })
            ))
        })

    }
}
