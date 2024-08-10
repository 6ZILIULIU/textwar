
interface FuncBind {
    target: any;
    Condition: Function;
    OnStateChange: Function;
}
export class FSM {
    lastState: number = 0;
    curState: number = 0;
    stateList: number[] = [];
    funcBundle: FuncBind[][] = [];
    obj = {};
    addState(state: number) {
        this.stateList.push(state)
        // let c = function () { return false }
        // this.RegisterStateCondition(0, 1, c);
    }
    removeState(state: number) {
        if (this.stateList.includes(state)) {
            this.stateList.splice(this.stateList.indexOf(state), 1);
        }
    }
    /**注册状态 */
    registerStateCondition(srcState: number, dstState: number, condition: () => boolean, target: any = this, onStateChange?: () => void) {
        if (this.stateList.includes(srcState) && this.stateList.includes(dstState)) {
            // debugger
            this.funcBundle[srcState] = this.funcBundle[srcState] || [];
            this.funcBundle[srcState][dstState] = this.funcBundle[srcState][dstState] || { target: null, Condition: null, OnStateChange: null };
            this.funcBundle[srcState][dstState].target = target;
            this.funcBundle[srcState][dstState].Condition = condition;
            this.funcBundle[srcState][dstState].OnStateChange = onStateChange;
        }
        return false;
    }

    /**状态切换 */
    updateState(): void {
        this.stateList.forEach(dstState => {
            if (this.curState != dstState && this.funcBundle[this.curState] && this.funcBundle[this.curState][dstState]) {
                let Condition = this.funcBundle[this.curState][dstState].Condition
                let OnStateChange = this.funcBundle[this.curState][dstState].OnStateChange
                let target = this.funcBundle[this.curState][dstState].target;
                // console.log('Condition()', Condition.call(target))
                if (typeof Condition == 'function' && Condition.call(target)) {
                    this.lastState = this.curState;
                    this.curState = dstState;
                    console.log('changeState', this.lastState, this.curState)
                    if (OnStateChange) {
                        OnStateChange.call(target)
                    }
                }
            }
        })
    }
}
