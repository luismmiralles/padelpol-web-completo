import { environment } from "src/environments/environment";

export const config = {
    demo: { runAsDemo: false, requestTime: 300 },
    apiUrl: (environment.production ? "http://padelpol.herokuapp.com/api" : "http://padelpol.herokuapp.com/api")
}