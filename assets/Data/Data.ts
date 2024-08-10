
const { ccclass, property } = cc._decorator;

@ccclass
export default class Data extends cc.Component {


    static battle = {
        0: {
            name: "Battle 1",
            description: "This is the first battle",
            enemys: [
                { type: 'infantry', x: 24, y: 24 },
                { type: 'tank', x: 25, y: 25 },
            ],
        }
    }
}
