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
        await this.msgPanel.createInfo("欢迎来到餐厅")
        await this.msgPanel.createInfo("请选择你的菜系")
        await this.msgPanel.createSelection("1.川菜", this.chooseCuiSine.bind(this, '川菜'))
        await this.msgPanel.createSelection("2.粤菜", this.chooseCuiSine.bind(this, '粤菜'))
        await this.msgPanel.createSelection("3.湘菜", this.chooseCuiSine.bind(this, '湘菜'))
        await this.msgPanel.createSelection("4.鲁菜", this.chooseCuiSine.bind(this, '鲁菜'))
        await this.msgPanel.createSelection("5.浙菜", this.chooseCuiSine.bind(this, '浙菜'))
        await this.msgPanel.createSelection("6.苏菜", this.chooseCuiSine.bind(this, '苏菜'))
        await this.msgPanel.createSelection("7.闽菜", this.chooseCuiSine.bind(this, '闽菜'))
        await this.msgPanel.createSelection("8.徽菜", this.chooseCuiSine.bind(this, '徽菜'))




    }
    chooseCuiSine(cuisine: string) {
        this.msgPanel.createInfo(`你选择了${cuisine}`)
        // this.msgPanel.createInfo("欢迎来到餐厅")
    }




}
