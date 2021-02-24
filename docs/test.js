(function () {
    const DEVICE_NAME_PREFIX = 'BBC'
    const ACCELEROMETERSERVICE_SERVICE_UUID = 'e95d0753-251d-470a-a062-fa1922dfa9a8'
    const ACCELEROMETERDATA_CHARACTERISTIC_UUID = 'e95dca4b-251d-470a-a062-fa1922dfa9a8'
    const SERVICE_UUID = ACCELEROMETERSERVICE_SERVICE_UUID
    const CHARACTERISTIC_UUID = ACCELEROMETERDATA_CHARACTERISTIC_UUID
    let btn = document.getElementById("connectBtn");
    btn.addEventListener("click", (ev) => {
        btn.disabled = true;
        connect().catch(e => {
            showErrorMessage(e.toString());
        });
    })

    function connect() {
        if (!navigator.bluetooth) return Promise.reject("bluetooth機能利用不可");
        return navigator.bluetooth.requestDevice({
            filters: [{
                namePrefix: DEVICE_NAME_PREFIX
            }],
            optionalServices: [SERVICE_UUID]
        }).then(device => {
            console.log(device);
            return device.gatt.connect();
        });
    }

    function showErrorMessage(msg) {
        let span = document.getElementById("errormsg");
        span.innerText = msg;
    }
})();