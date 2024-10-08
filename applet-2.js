class leafLetMap{
    constructor(containerId, center, zoom){
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();

        this.attendanceCountCSS1 = 0;
        this.attendanceCountCSS2 = 0;
        this.attendanceCountCSSFACULTY = 0;

        this.markerCounts = {};
        this.markers = [];

        this.loggedData = []; 

        this.btn = document.getElementById('btn');
        this.btn1 = document.getElementById('btn1');
        this.btn2 = document.getElementById('btn2');
        this.btnclear = document.getElementById('btnclear');
        this.logCountElement = document.getElementById('logCount');
        this.logCount1Element = document.getElementById('logCountCSS1');
        this.logCount2Element = document.getElementById('logCountCCS2');
        this.idContainer = document.getElementById('logContainer');

        
        this.btn.addEventListener('click', () => this.dataSc());
        this.btn1.addEventListener('click', () => this.dataLab());
        this.btn2.addEventListener('click', () => this.dataBa());
        this.btnclear.addEventListener('click', () => this.clearLogs());
    }
    
    initTileLayer() {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Sample for new corales BSIT student'
        }).addTo(this.map);
    }

    addMarker(lat, long, message){
        const marker = L.marker([lat, long]).addTo(this.map)
        .bindPopup(message);
    }

    
    updateMarkerPopup(marker, message) {
        const count = this.markerCounts[message];
        marker.bindPopup(`${message}<br>Attendance logs: ${count}`).openPopup();
    }

        loadMarkersFromJson(url) {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error("Error Loading servers:", error));
        }
        clearLogs(){
            this.attendanceCountSC = 0;
            this.attendanceCountBA = 0;
            this.attendanceCountLab = 0;
    
            this.loggedData = [];
            this.markerCounts = {}; 
            this.markers.forEach(marker => {
                const message = marker.getPopup().getContent().split('<br>')[0]; 
                this.markerCounts[message] = 0;
                this.updateMarkerPopup(marker, message); 
            });
    
            this.updateLogDisplay();
        }
        displayLogCount() {      
            this.logCountElement.innerHTML = `SC Building Attendance: ${this.attendanceCountCSS1}`;
            this.logCount1Element.innerHTML = `BA Building Attendance: ${this.attendanceCountCSS2}`;
            this.logCount2Element.innerHTML = `CCS Laboratory Attendance: ${this.attendanceCountCSSFACULTY}`;
       }
    
       dataCSS1() {
        this.addMarker( 8.359639, 124.869179, 'CSS laboratory 1');
        this.attendanceCountSC++; 
        this.updateLogDisplay();
    }

    dataCSS2() {
        this.addMarker(  8.359554,124.869153, 'CSS laboratory 2');
        this.attendanceCountSC++; 
        this.updateLogDisplay();
     
    }

    
    dataCSSfaculty() {
        this.addMarker(   8.359735, 124.869206, 'CSS Faculty');
        this.attendanceCountSC++;
        this.updateLogDisplay();
    }
}
const Mymap = new leafLetMap('map', [8.359735, 124.869206], 18);


Mymap.addMarker(8.359735, 124.869206, 'CCS Faculty Office');
Mymap.addMarker(8.359639, 124.869179, 'CCS Laboratory 1');
Mymap.addMarker(8.359554, 124.869153, 'CCS Laboratory 2');

Mymap.loadMarkersFromJson('map.json');