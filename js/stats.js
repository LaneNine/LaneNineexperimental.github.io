const Stats = {
    getSwims(event = EventManager.getCurrent()) {
        return EventManager.getSwims(event);
    },

    getBest(event) {
        const swims = this.getSwims(event);
        if (!swims.length) return null;

        return swims.reduce((best, swim) =>
            swim.time < best.time ? swim : best
        );
    },

    getAverage(event) {
        const swims = this.getSwims(event);
        if (!swims.length) return null;

        const total = swims.reduce(
            (sum, swim) => sum + swim.time,
            0
        );

        return Number((total / swims.length).toFixed(2));
    },

    getImprovement(event) {
        const swims = this.getSwims(event);
        if (swims.length < 2) return null;

        const first = swims[0].time;
        const best = this.getBest(event).time;

        return Number((first - best).toFixed(2));
    },

    getLargestDrop(event) {
        const swims = this.getSwims(event);
        if (swims.length < 2) return null;

        let largest = 0;

        for (let i = 1; i < swims.length; i++) {
            const drop = swims[i - 1].time - swims[i].time;

            if (drop > largest) {
                largest = drop;
            }
        }

        return Number(largest.toFixed(2));
    },

    getCount(event) {
        return this.getSwims(event).length;
    },

    getSummary(event = EventManager.getCurrent()) {
        const best = this.getBest(event);

        return {
            swims: this.getCount(event),
            best: best ? best.time : null,
            bestMeet: best ? best.meet : null,
            average: this.getAverage(event),
            improvement: this.getImprovement(event),
            largestDrop: this.getLargestDrop(event)
        };
    }
};
