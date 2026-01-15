function appState() {
    return {
        currentPage: 'dashboard',
        darkMode: true,
        isOnline: true,
        userName: 'Alexandra',
        gasLevel: 45.00,
        temperature: 22.00,
        systemHealth: 95.00,
        activeAlerts: 0,
        gasThreshold: 50,
        tempThreshold: 30,
        formatNumber(num) {
            return parseFloat(num).toFixed(2);
        },
        notifications: [
            {
                id: 1,
                type: 'info',
                icon: 'fa-check-circle',
                title: 'Système opérationnel',
                message: 'Tous les capteurs fonctionnent normalement',
                time: 'Il y a 5 min'
            },
            {
                id: 2,
                type: 'alert',
                icon: 'fa-exclamation-triangle',
                title: 'Maintenance programmée',
                message: 'Révision des capteurs prévue le 20 janvier',
                time: 'Il y a 2 h'
            }
        ],
        init() {
            // Simuler les changements de valeurs
            setInterval(() => {
                if (this.isOnline) {
                    this.gasLevel = Math.max(20, Math.min(80, this.gasLevel + (Math.random() - 0.5) * 5));
                    this.temperature = Math.max(18, Math.min(30, this.temperature + (Math.random() - 0.5) * 0.5));
                    this.systemHealth = Math.max(80, Math.min(100, this.systemHealth + (Math.random() - 0.5)));
                }
            }, 3000);

            // Dark mode
            this.$watch('darkMode', (value) => {
                document.documentElement.classList.toggle('dark', value);
            });
        },
        logout() {
            if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                alert('Déconnexion en cours...');
            }
        },
        triggerAlert() {
            const alert = {
                id: this.notifications.length + 1,
                type: 'alert',
                icon: 'fa-exclamation-circle',
                title: 'Alerte manuelle déclenchée',
                message: 'Une alerte manuelle a été générée',
                time: 'À l\'instant'
            };
            this.notifications.unshift(alert);
            this.activeAlerts++;
            setTimeout(() => {
                this.activeAlerts = Math.max(0, this.activeAlerts - 1);
            }, 5000);
        },
        markAsRead(index) {
            this.notifications.splice(index, 1);
        },
        saveProfile() {
            alert(`Profil mis à jour!\nNom: ${this.userName}\nSeuil Gaz: ${this.gasThreshold} PPM\nSeuil Temp: ${this.tempThreshold}°C`);
        }
    }
}
