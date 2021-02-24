(function () {
    // 加速度サービスUUID
    const ACCELEROMETER_SERVICE_UUID = 'e95d0753-251d-470a-a062-fa1922dfa9a8';
    // 加速度キャラクタリスティックUUID
    const ACCELEROMETER_CHARACTERISTICS_UUID = 'e95dca4b-251d-470a-a062-fa1922dfa9a8';

    let btn = document.getElementById("connectBtn");
    btn.addEventListener("click", (ev) => {
        btn.disabled = true;
        connect().catch(e => {
            console.error(e);
        });
    })

    function connect() {
        if (!navigator.bluetooth) return Promise.reject("bluetooth機能利用不可");

        return navigator.bluetooth.requestDevice({ 
            filters: [{ namePrefix: "BBC micro:bit" }], 
            optionalServices: [ACCELEROMETER_SERVICE_UUID] 
        }).then(device => {
            console.log(device);
            return device.gatt.connect();
        });
    }
})();