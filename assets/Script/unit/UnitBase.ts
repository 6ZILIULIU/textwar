const { ccclass, property } = cc._decorator;
@ccclass
export default class Unit extends cc.Component {
    name: string = "";
    health: number = 0;
    attack: number = 0;
    defense: number = 0;
    speed: number = 0;
    echoToCmder() {
        // TODO: send message to cmder
        cc.find('Canvas').emit('unit-echo',);
    }
}

