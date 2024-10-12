// Initialize Parse SDK
Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");
Parse.serverURL = 'https://parseapi.back4app.com';

document.getElementById('getLogin').addEventListener('click', function () {
    // Use Parse Cloud functions to get QR code
    Parse.Cloud.run('generateWhatsAppQR').then((response) => {
        const qrCode = response.qr;
        document.getElementById('qrCodeContainer').textContent = qrCode; // Display QR Code
    });
});

document.getElementById('checkNumbers').addEventListener('click', function () {
    const startNumber = document.getElementById('startNumber').value;
    const endNumber = document.getElementById('endNumber').value;
    // Check numbers using Parse cloud function
    Parse.Cloud.run('checkWhatsAppNumbers', { startNumber, endNumber })
    .then((results) => {
        // Display results
        document.getElementById('results').textContent = JSON.stringify(results, null, 2);
        
        // Generate text file for download
        const blob = new Blob([JSON.stringify(results)], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'results.txt';
        link.click();
    });
});
