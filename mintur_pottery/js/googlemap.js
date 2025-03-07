function initMap() {
    fetch('googlemap.json')
    .then(response => response.json())
    .then(styles => {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 25.0330, lng: 121.5654 }, // 例如台北101座標
            zoom: 14,
            styles: styles // 套用自訂樣式
        });
    })
    .catch(error => console.error('載入樣式失敗:', error));
}


//需要審請Google Cloud 要填卡號 暫緩!!