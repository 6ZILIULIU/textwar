export default class SingletonBase<T> {
    public constructor(){

    }
    static getInst(...param:any[]) :any{
        let _Class = this;
        if (!_Class._inst) {
            _Class._inst = new _Class(...param);
        }
        return _Class._inst;
    }
}
