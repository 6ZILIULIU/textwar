import MsgPanel from "./MsgPanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Battle extends cc.Component {

    @property(MsgPanel)
    msgPanel: MsgPanel = null;

    cuisine: string = "";
    background: string = "";


    start() {
        this.getScene()
    }

    getScene() {
        return 
    }




}
