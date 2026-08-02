const EventManager = {
    getEvents() {
        return Object.keys(StorageManager.getData().events);
    },

    create(name) {
        if (!name) return false;
        StorageManager.addEvent(name);
        return true;
    },

    remove(name) {
        StorageManager.removeEvent(name);
    },

    getCurrent() {
        return StorageManager.getData().settings.selectedEvent;
    },

    setCurrent(name) {
        const data = StorageManager.getData();

        if (!data.events[name]) return false;

        data.settings.selectedEvent = name;
        StorageManager.save();
        return true;
    },

    getSwims(name = this.getCurrent()) {
        const event = StorageManager.getEvent(name);
        return event ? event.swims : [];
    },

    getGoal(name = this.getCurrent()) {
        const event = StorageManager.getEvent(name);
        return event ? event.goal : null;
    },

    addSwim(swim, name = this.getCurrent()) {
        StorageManager.addSwim(name, swim);
    }
};
