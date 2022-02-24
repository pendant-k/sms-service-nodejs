const CryptoJS = require("crypto-js");
const axios = require("axios");

require("dotenv").config();

exports.send_message = function send_message(phone, password) {
    var user_phone_number = phone; //수신 전화번호 기입
    var resultCode = 404;
    const date = Date.now().toString();
    const uri = process.env.SERVICE_ID; //서비스 ID
    const secretKey = process.env.NCP_SECRET_KEY; // Secret Key
    const accessKey = process.env.NCP_KEY; //Access Key
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);

    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    axios({
        method: method,
        url: url,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        data: {
            type: "SMS",
            countryCode: "82",
            from: "01084770706",
            content: `밥자리 인증 번호 [${password}]를 입력해주세요.`,
            messages: [{ to: `${user_phone_number}` }],
        },
    })
        .then(function (response) {
            console.log("success!");
            console.log(response);
        })
        .catch(function (error) {
            console.warn("error !");
            console.log(error);
        });
    return resultCode;
};
