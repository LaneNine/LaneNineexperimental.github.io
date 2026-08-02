const GoalManager = {
    set(event, time, date) {
        const goal = {
            time: Number(time),
            date
        };

        StorageManager.setGoal(event, goal);
    },

    get(event) {
        return StorageManager.getEvent(event)?.goal || null;
    },

    getProgress(event) {
        const data = StorageManager.getEvent(event);
        const goal = data?.goal;

        if (!data || !goal || !data.swims.length) return null;

        const best = Math.min(...data.swims.map(s => s.time));

        if (best <= goal.time) {
            return 100;
        }

        const swims = data.swims;
        const oldest = Math.max(...swims.map(s => s.time));

        const totalDrop = oldest - goal.time;
        const currentDrop = oldest - best;

        if (totalDrop <= 0) return 0;

        return Math.min(
            99,
            Math.max(
                0,
                Math.round((currentDrop / totalDrop) * 100)
            )
        );
    },

    getNeededDrop(event) {
        const data = StorageManager.getEvent(event);
        const goal = data?.goal;

        if (!data || !goal || !data.swims.length) return null;

        const best = Math.min(...data.swims.map(s => s.time));

        return Number((best - goal.time).toFixed(2));
    },

    getDaysRemaining(event) {
        const goal = this.get(event);

        if (!goal) return null;

        const now = new Date();
        const target = new Date(goal.date);

        return Math.ceil(
            (target - now) / 86400000
        );
    },

    isCompleted(event) {
        const data = StorageManager.getEvent(event);
        const goal = data?.goal;

        if (!data || !goal || !data.swims.length) return false;

        const best = Math.min(...data.swims.map(s => s.time));

        return best <= goal.time;
    }
};
