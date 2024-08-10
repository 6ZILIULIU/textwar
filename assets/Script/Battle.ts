import MsgPanel from "./MsgPanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Battle extends cc.Component {

    @property(MsgPanel)
    msgPanel: MsgPanel = null;

    start() {
        this.init()
    }

    async init() {
        this.msgPanel.clearInfoBoard();
        this.msgPanel.waitForInfo();
    }

    




}
