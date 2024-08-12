import MsgPanel from "./MsgPanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Battle extends cc.Component {

    @property(MsgPanel)
    msgPanel: MsgPanel = null;

    start() {
        this.init()
        cc.find('Canvas').emit('echo',"步兵3 正朝着[ 6 , 8 ]坐标前进")
    }

    async init() {
        this.msgPanel.clearInfoBoard();
        this.msgPanel.waitForInfo();
    }

    




}
