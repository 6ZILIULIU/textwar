import MsgPanel from "./MsgPanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Battle extends cc.Component {

    @property(MsgPanel)
    msgPanel: MsgPanel = null;

    cuisine: string = "";
    background: string = "";

    start() {
        this.init()
    }

    async init() {
        this.msgPanel.init();
        await this.msgPanel.createInfo("我出生于")
        await this.msgPanel.createSelection([
            { title: "佃农", callback: this.onChooseBackground.bind(this, '佃农') },
            { title: "富裕人家", callback: this.onChooseBackground.bind(this, '富裕人家') },
        ])
        this.addBackgroundAttr()

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
        await this.msgPanel.createInfo(`你选择了${this.cuisine}`)
        await this.msgPanel.createInfo(``)
    }

    chooseCuiSine(cuisine: string) {
        this.cuisine = cuisine;
    }

    onChooseBackground(background: string) {
        this.background = background;
    }

    addBackgroundAttr() {
        if (this.background === '贫苦人家') {

        }
        else if (this.background === '富裕人家') {

        }
    }



}
