const UI = {
    render() {
        this.renderPB();
        this.renderGoal();
        this.renderSwims();
        Charts.refresh();
    },

    renderPB() {
        const element = document.getElementById("currentPB");
        if (!element) return;

        const best = Stats.getBest();

        element.textContent = best
            ? best.time.toFixed(2)
            : "--";
    },

    renderGoal() {
        const element = document.getElementById("goalDisplay");
        if (!element) return;

        const goal = GoalManager.get();

        if (!goal) {
            element.textContent = "No goal set";
            return;
        }

        const progress = GoalManager.getProgress(
            EventManager.getCurrent()
        );

        element.innerHTML = `
            <strong>${goal.time.toFixed(2)}</strong>
            <br>
            Target date: ${goal.date}
            <br>
            Progress: ${progress ?? 0}%
        `;
    },

    renderSwims() {
        const list = document.getElementById("swimList");
        if (!list) return;

        const swims = EventManager.getSwims();

        if (!swims.length) {
            list.innerHTML = "<p>No swims added yet.</p>";
            return;
        }

        list.innerHTML = swims
            .slice()
            .reverse()
            .map(swim => `
                <div class="swim">
                    <strong>${swim.time.toFixed(2)}</strong>
                    <br>
                    ${swim.meet}
                    <br>
                    <small>${swim.date}</small>
                </div>
            `)
            .join("");
    },

    openImport() {
        const text = prompt(
            "Paste SwimCloud results:"
        );

        if (!text) return;

        const swims = Parser.parseSwimCloud(text);
        const event = EventManager.getCurrent();

        swims.forEach(swim => {
            EventManager.addSwim(swim, event);
        });

        this.render();
    },

    openAddSwim() {
        const time = prompt(
            "Enter time:"
        );

        if (!time) return;

        const meet = prompt(
            "Meet name:"
        ) || "Manual Entry";

        const date = prompt(
            "Date (YYYY-MM-DD):"
        ) || new Date()
            .toISOString()
            .split("T")[0];

        EventManager.addSwim({
            time: Number(time),
            meet,
            date,
            marker: ""
        });

        this.render();
    },

    openGoal() {
        const time = prompt(
            "Goal time:"
        );

        if (!time) return;

        const date = prompt(
            "Goal date (YYYY-MM-DD):"
        );

        if (!date) return;

        GoalManager.set(
            EventManager.getCurrent(),
            Number(time),
            date
        );

        this.render();
    }
};
