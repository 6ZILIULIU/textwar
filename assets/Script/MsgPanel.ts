const { ccclass, property } = cc._decorator;

@ccclass
export default class MsgPanel extends cc.Component {
    static instance: MsgPanel = null;

    @property(cc.ScrollView)
    infoBoard: cc.ScrollView = null;

    @property(cc.Prefab)
    infoPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    selectionPrefab: cc.Prefab = null;

    lbHeight = 30;


    onLoad() {
        MsgPanel.instance = this;
    }

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
        this.createInfo(infoStr);
    }

    showNewestMsg() {
        this.infoBoard.scrollToBottom(0.1);
    }

    async createInfo(infoStr: string) {
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
        infoLabelNode.y = this.infoBoard.content.childrenCount * this.lbHeight;
        this.updateContentHeight();
        // label.string = infoStr;
        let str = infoStr;
        // str = str.match(/.{1,30}/g).join('\n');
        await this.typeingEffect(label, str);
        // this.showNewestMsg();
    }

    curSelectionNodes: cc.Node[] = []
    async createSelection(selectInfoList: ISelection[]) {
        for (let i = 0; i < selectInfoList.length; i++) {
            const selectInfo = selectInfoList[i];
            let selectionNode = cc.instantiate(this.selectionPrefab);
            let label = selectionNode.getChildByName('text').getComponent(cc.Label);
            selectionNode.parent = this.infoBoard.content;
            selectionNode.y = this.infoBoard.content.childrenCount * this.lbHeight;
            this.updateContentHeight();
            // label.string = infoStr;
            // str = str.match(/.{1,30}/g).join('\n');
            await this.typeingEffect(label, selectInfo.title);
            selectionNode['callback'] = selectInfo.callback;
            selectionNode.on(cc.Node.EventType.TOUCH_END, this.onSelected, this);

            this.curSelectionNodes.push(selectionNode)

        }
        await new Promise(resolve => {
            this.selectCallback = () => {
                resolve(1);
            };
        })
    }

    selectCallback() { }

    onSelected(event: cc.Event.EventTouch) {
        if (event.target['callback']) {
            event.target['callback']()
        }
        this.curSelectionNodes.forEach(v => {
            if (cc.isValid(v)) v.destroy();
        })
        this.selectCallback && this.selectCallback()
    }


    updateContentHeight() {
        let childHeight = 0;
        this.infoBoard.content.children.forEach(v => {
            childHeight += v.height;
        })
        this.infoBoard.content.height = childHeight + this.infoBoard.node.height;
    }

    async typeingEffect(infoLabel: cc.Label, infoStr: string) {
        if (infoStr == null) return;
        for (let i = 0; i < infoStr.length; i++) {
            await Utils.asyncWait(0.02);
            await Utils.play8BitRandKeyEffect();
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

window["MsgPanel"] = MsgPanel;