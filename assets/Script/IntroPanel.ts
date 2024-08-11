const { ccclass, property } = cc._decorator;

@ccclass
export default class MsgPanel extends cc.Component {

    @property(cc.Node)
    infoBoard: cc.Node = null;

    @property(cc.Prefab)
    infoPrefab: cc.Prefab = null;

    infoLabelHeight = 30;



    init() {
        // TODO: init
        this.clearInfoBoard();
        this.waitForInfo();
    }

    clearInfoBoard() {
        this.infoBoard.content.removeAllChildren();
    }

    waitForInfo() {
        // 监听部队消息
        cc.find('Canvas').on('echo', this.onReceiveInfo, this);
    }

    onReceiveInfo(infoStr: string, option?: any) {
        this.displayInfo(infoStr,);
    }

    showNewestMsg() {
        this.infoBoard.scrollToBottom(0.1);
    }

    displayInfo(infoStr: string) {
        // let infoLabelNode = new cc.Node('info');
        // infoLabelNode.setPosition(-this.infoBoard.node.width / 2 + 20, 0);
        // infoLabelNode.setAnchorPoint(0, 0.5)
        // let label = infoLabelNode.addComponent(cc.Label);
        // label.fontSize = 26;
        // label.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        // label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        // label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        let infoLabelNode = cc.instantiate(this.infoPrefab);
        let label = infoLabelNode.getComponent(cc.Label);
        infoLabelNode.parent = this.infoBoard.content;
        infoLabelNode.y = this.infoBoard.content.childrenCount * this.infoLabelHeight;
        this.updateContentHeight();
        // label.string = infoStr;
        let str = infoStr;
        // str = str.match(/.{1,30}/g).join('\n');
        this.typeingEffect(label, str);
        // this.showNewestMsg();
    }
    updateContentHeight() {
        let childHeight = 0;
        this.infoBoard.content.children.forEach(v => {
            childHeight += v.height;
        })
        this.infoBoard.content.height = childHeight + this.infoBoard.node.height;
    }

    async typeingEffect(infoLabel: cc.Label, infoStr: string) {
        for (let i = 0; i < infoStr.length; i++) {
            await Utils.asyncWait(0.01);
            infoLabel.string += infoStr[i];
            // if (infoLabel.node.width)
        }
    }


    isInfoExceeded() {
        // TODO: check if info exceeded
        return this.infoBoard.content.childrenCount >= 100;
    }

    removeOldestInfo() {
        // TODO: remove oldest info
        this.infoBoard.content.children[0].removeFromParent();
    }
}
