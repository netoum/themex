type ThemexKey = string;
type ThemexValue = string;
interface ThemexOptions {
    key: ThemexKey;
    default?: ThemexValue;
    values: ThemexValue[];
}
declare class Themex {
    private options;
    private observer;
    constructor(options: ThemexOptions[]);
    private startObserver;
    private getDefaultValue;
    private initializeThemex;
    private attachCheckboxListeners;
    private setupEventListeners;
    private applyThemex;
    private removeThemex;
    private updateUI;
}
export default Themex;
