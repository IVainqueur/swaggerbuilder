import { SERVER_URI } from "../config/config";

const generateSwagger = async () => {
    /* Gather the info */
    let data: any;
    // 1. THE VERSION
    data.swagger = "2.0";
    // 2.1 GET THE METHODS
    

    /* Send the request */

    let response = await fetch(`${SERVER_URI}/build`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            ...data
        }
    });
};

export { generateSwagger };
