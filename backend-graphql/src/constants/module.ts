import { getGenericEnvValue } from "../utils/env.utils";

const EXPRESS_APP_URL = `http://localhost:${getGenericEnvValue('PORT')}/api`

export {
    EXPRESS_APP_URL
}