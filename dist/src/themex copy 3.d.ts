type ThemexKey = string;
type ThemexValue = string;
interface ThemexOptions {
    key: ThemexKey;
    default?: ThemexValue;
    values: ThemexValue[];
}
declare class Themex {
    private options;
    constructor(options: ThemexOptions[]);
    private getDefaultValue;
    private initializeThemex;
    private setupEventListeners;
    private applyThemex;
    private removeThemex;
    private updateUI;
}
export default Themex;
