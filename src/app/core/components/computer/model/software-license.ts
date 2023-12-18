import { ISoftwareLicenseKey } from "./software-license-keys";

export interface ISoftwareLicense {
    readonly id: number;
    description: string;
    code: string;
    expireAt: Date;
    active: boolean;
    keys: ISoftwareLicenseKey[];
}