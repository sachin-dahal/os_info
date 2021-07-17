const DeviceDetector = require('node-device-detector');
const dd = new DeviceDetector;
const fetch = require('node-fetch');

exports.getDeviceInfo = async function(header, myIP, resp) {
    let data;
    let result = dd.detect(header);
    //* key here is a temporary one 😜
    //* you can use your own one by heading over to
    //* https://ipstack.com/
    let url = `http://api.ipstack.com/${myIP}?access_key=c41fd0fea16911027155db8551af5ec0`;
    console.log(url);

    await fetch(url)
        .then((res) => res.json())
        .then(json => {
            return data = {
                'device': result,
                'loc': json
            }
        })
    resp(data);
}