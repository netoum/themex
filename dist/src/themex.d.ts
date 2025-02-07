type ThemexKey = string;
type ThemexValue = string;
interface ThemexOptions {
    key: ThemexKey;
    default: ThemexValue;
    values: ThemexValue[];
}
declare class Themex {
    private options;
    constructor(options: ThemexOptions[]);
    private initializeThemex;
    private setupEventListeners;
    private applyThemex;
    private updateUI;
}
export default Themex;
