const generateSwagger = async () => {
    /* Gather the info */
    let data: any;
    // 1. THE VERSION
    data.swagger = "2.0"
    // 2. SUMMARY INFO
    
    /* Send the request */

    let response = await fetch("http://localhost:1000/nocors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: "http://localhost/build",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                ...data
            }
        })
    });
};

export { generateSwagger };
