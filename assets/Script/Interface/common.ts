interface ISelection {
    title: string,
    callback: Function,
}

interface IScene {
    startScene(): void,

    endScene(): void,
}