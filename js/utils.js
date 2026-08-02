
const Utils = {
    formatTime(seconds) {
        if (seconds == null || isNaN(seconds)) return "--";

        return Number(seconds).toFixed(2);
    },

    formatDate(date) {
        if (!date) return "";

        return new Date(date).toLocaleDateString(
            undefined,
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );
    },

    getToday() {
        return new Date()
            .toISOString()
            .split("T")[0];
    },

    daysBetween(start, end) {
        return Math.ceil(
            (new Date(end) - new Date(start)) /
            86400000
        );
    },

    sortByDate(items) {
        return items.sort(
            (a, b) =>
                new Date(a.date) -
                new Date(b.date)
        );
    },

    clone(object) {
        return JSON.parse(
            JSON.stringify(object)
        );
    }
};
