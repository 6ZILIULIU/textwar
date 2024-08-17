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
        await this.msgPanel.createSelection([
            { title: "1.川菜", callback: this.chooseCuiSine.bind(this, '川菜') },
            { title: "2.粤菜", callback: this.chooseCuiSine.bind(this, '粤菜') },
            { title: "3.湘菜", callback: this.chooseCuiSine.bind(this, '湘菜') },
            { title: "4.鲁菜", callback: this.chooseCuiSine.bind(this, '鲁菜') },
            { title: "5.浙菜", callback: this.chooseCuiSine.bind(this, '浙菜') },
            { title: "6.苏菜", callback: this.chooseCuiSine.bind(this, '苏菜') },
            { title: "7.闽菜", callback: this.chooseCuiSine.bind(this, '闽菜') },
            { title: "8.徽菜", callback: this.chooseCuiSine.bind(this, '徽菜') },
        ])
        await this.msgPanel.createInfo("请选择你的菜系")
    }
    chooseCuiSine(cuisine: string) {
        this.msgPanel.createInfo(`你选择了${cuisine}`)
        // this.msgPanel.createInfo("欢迎来到餐厅")
    }




}
