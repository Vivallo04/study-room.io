import {environmentDevelopment} from "./environment.development";
import {environmentIntegration} from "./environment.integration";
import {environmentStage} from "./environment.stage";
import {environmentProduction} from "./environment.production";

const environments = {
    environmentDevelopment,
    environmentIntegration,
    environmentStage,
    environmentProduction
};

export default environments;