// script.js

// Conversion dynamique lors du changement d'unité
document.getElementById('unit-dist').addEventListener('change', function () {
    const distanceInput = document.getElementById('input-dist');
    const currentUnit = this.value;
    const currentDistance = parseFloat(distanceInput.value);

    if (!isNaN(currentDistance)) {
        // Conversion de la distance
        if (currentUnit === 'km') {
            distanceInput.value = (currentDistance / 1000).toFixed(3); // Convertit m → km
        } else {
            distanceInput.value = (currentDistance * 1000).toFixed(0); // Convertit km → m
        }
    }
});

// Calcul de la vitesse moyenne et de l'allure
document.querySelector('button').addEventListener('click', function () {
    const distance = parseFloat(document.getElementById('input-dist').value);
    const unit = document.getElementById('unit-dist').value;
    const hours = parseInt(document.getElementById('input-temps h').value) || 0;
    const minutes = parseInt(document.getElementById('input-temps m').value) || 0;
    const seconds = parseInt(document.getElementById('input-temps s').value) || 0;

    // Vérification des données
    if (isNaN(distance) || distance <= 0) {
        alert("Veuillez entrer une distance valide.");
        return;
    }

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (totalSeconds <= 0) {
        alert("Veuillez entrer un temps valide.");
        return;
    }

    // Conversion de la distance en kilomètres si nécessaire
    const distanceInKm = unit === 'm' ? distance / 1000 : distance;

    // Calcul de la vitesse moyenne en km/h
    const speed = (distanceInKm / totalSeconds) * 3600;

    // Calcul de l'allure (temps au km)
    const paceInSeconds = totalSeconds / distanceInKm;
    const paceMinutes = Math.floor(paceInSeconds / 60);
    const paceSeconds = Math.round(paceInSeconds % 60);

    // Mise à jour des résultats
    document.querySelector('.v-moy').textContent = `${speed.toFixed(2)} km/h`;
    document.querySelector('.all').textContent = `${paceMinutes}'${paceSeconds.toString().padStart(2, '0')} /km`;
});
