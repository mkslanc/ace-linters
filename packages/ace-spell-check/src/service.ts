import type {ServiceOptionsWithErrorMessages} from "ace-linters/src/types/language-service";
import type {CSpellUserSettings} from "@cspell/cspell-types";

export interface AceSpellCheckOptions extends ServiceOptionsWithErrorMessages{
  spellCheckOptions?: CSpellUserSettings;
}
