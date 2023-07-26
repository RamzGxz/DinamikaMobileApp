import axios from "axios";
const apiKey = 'LQiVSXd1wIvwJcYu3x3GqiDsnmASQxUQGgu5GARBQFBC3QxMzPVsoJmYeq4PtTkO'
const api = {
    getDataStock: async () => {
        const options = {
            method: "GET",
            url: "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-ccaoq/endpoint/data/v1",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "api-key": apiKey,
            },
        };
        try {
            const res = await axios.request(options);
            if (res === 200) {
                return res.data;
            } else {
                console.log("errr");
            }
        } catch (error) {
            console.log(error);
        }
    },
};

export default api;
