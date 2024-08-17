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
        this.msgPanel.init();
        await this.msgPanel.echo("欢迎来到餐厅")
        await this.msgPanel.echo("请选择你的菜系")
        await this.msgPanel.createSelection("1.川菜")
        await this.msgPanel.createSelection("2.粤菜")
        await this.msgPanel.createSelection("3.湘菜")
        await this.msgPanel.createSelection("4.鲁菜")
        await this.msgPanel.createSelection("5.浙菜")
        await this.msgPanel.createSelection("6.苏菜")
        await this.msgPanel.createSelection("7.闽菜")
        await this.msgPanel.createSelection("8.徽菜")



        
    }

    




}
