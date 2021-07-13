const router = require('express').Router();
const os = require('os');
const deviceInfo = require('../services/info');
const publicIp = require('public-ip');

router.get('/', async(req, res) => {
    var agent = req.headers['user-agent'];
    var ip = await publicIp.v4();
    console.log(agent);
    var ipresult;

    var uptime = ((os.uptime().toFixed(0) / 60) / 60).toFixed(2);
    var model = os.cpus()[0].model;
    await deviceInfo.getDeviceInfo(agent, ip, (res) => {
        console.log(res);
        ipresult = res;
    });

    var all = {
        "pc": `Hello ${os.hostname().toUpperCase()}!`,
        "os": `💻 ${os.type()}`,
        "os_family": `⌨️ ${ipresult.device.os.family}`,
        "os_platform": `${ipresult.device.os.platform} bits`,
        "cpu": `${model}`,
        "visit": `You're using ${ipresult.device.client.name} ${ipresult.device.client.type}`,
        "ram": `${(os.totalmem() * (9.31 * (10) ** -10)).toFixed(2)} GB`,
        "my_ip": `🌐 ${ipresult.loc.ip}`,
        "ip_type": `${ipresult.loc.type.toUpperCase()}`,
        "country": `${ipresult.loc.country_name} ${ipresult.loc.location.country_flag_emoji}`,
        "state": ipresult.loc.region_name,
        "state_code": ipresult.loc.region_code,
        "location": {
            "lat": ipresult.loc.latitude,
            "long": ipresult.loc.longitude,
        },
        "lang": ipresult.loc.location.languages[0].native,
        "status": {
            "startup": `Your device has been up since ${uptime} hours`,
            "prefs": getMood(uptime)
        }
    };
    res.send(all);
});

function getMood(uptime) {
    if (uptime <= 1) {
        return "What? Really? Just an hour?";
    } else if (uptime > 1 && uptime <= 3) {
        return "👌 Okay";
    } else if (uptime > 3 && uptime <= 7) {
        return "😲 Good One";
    } else if (uptime > 7 && uptime <= 11) {
        return "😱 Good One Boss";
    } else if (uptime > 11 && uptime <= 15) {
        return "😵 Are You There or Just Procrastinating?";
    } else if (uptime > 15 && uptime <= 20) {
        return "🤯 Are You Still Using Your PC?";
    } else {
        return "👽 Welcome! You're Of My Type Folks!"
    }
}

module.exports = router;