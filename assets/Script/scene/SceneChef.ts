import MsgPanel from "../MsgPanel";
import SceneBase from "./SceneBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SceneChef extends SceneBase implements IScene {


    cuisine: string = "";
    background: string = "";

    startScene() {
        this.startFlow()
    }

    async startFlow() {
        
    }

    async chooseBackground(background: string) {

        MsgPanel.instance.init();
        await MsgPanel.instance.createInfo("我出生于")
        await MsgPanel.instance.createSelection([
            { title: "贫苦人家", callback: this.onChooseBackground.bind(this, '贫苦人家') },
            { title: "富裕人家", callback: this.onChooseBackground.bind(this, '富裕人家') },
        ])
        await MsgPanel.instance.createInfo(`${this.background}`)
        this.addBackgroundAttr()
        await MsgPanel.instance.createInfo(``)
    }

    async chooseCuisine(cuisine: string) {
        
        await MsgPanel.instance.createSelection([
            { title: "1.川菜", callback: this.onChooseCuiSine.bind(this, '川菜') },
            { title: "2.粤菜", callback: this.onChooseCuiSine.bind(this, '粤菜') },
            { title: "3.湘菜", callback: this.onChooseCuiSine.bind(this, '湘菜') },
            { title: "4.鲁菜", callback: this.onChooseCuiSine.bind(this, '鲁菜') },
            { title: "5.浙菜", callback: this.onChooseCuiSine.bind(this, '浙菜') },
            { title: "6.苏菜", callback: this.onChooseCuiSine.bind(this, '苏菜') },
            { title: "7.闽菜", callback: this.onChooseCuiSine.bind(this, '闽菜') },
            { title: "8.徽菜", callback: this.onChooseCuiSine.bind(this, '徽菜') },
        ])
        await MsgPanel.instance.createInfo(`你选择了${this.cuisine}`)
        await MsgPanel.instance.createInfo(``)
    }

    onChooseCuiSine(cuisine: string) {
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

    endScene(): void {

    }

}
