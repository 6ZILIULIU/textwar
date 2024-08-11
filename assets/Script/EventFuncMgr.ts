const { ccclass, property } = cc._decorator;

@ccclass
export default class EventFuncMgr extends cc.Component {

    static instance: EventFuncMgr = null;
    protected onLoad(): void {
        EventFuncMgr.instance = this;
        cc.game.addPersistRootNode(this.node);
    }


}
