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
            ? Utils.formatTime(best.time)
            : "--";
    },

    renderGoal() {
        const element = document.getElementById("goalDisplay");
        if (!element) return;

        const goal = GoalManager.get();

        if (!goal) {
            element.innerHTML = "No goal set";
            return;
        }

        const progress = GoalManager.getProgress(
            EventManager.getCurrent()
        );

        const remaining = GoalManager.getDaysRemaining(
            EventManager.getCurrent()
        );

        element.innerHTML = `
            <strong>${Utils.formatTime(goal.time)}</strong>
            <br>
            Deadline: ${Utils.formatDate(goal.date)}
            <br>
            Progress: ${progress ?? 0}%
            <br>
            ${remaining > 0 ? `${remaining} days left` : "Deadline passed"}
        `;
    },

    renderSwims() {
        const list = document.getElementById("swimList");
        if (!list) return;

        const swims = EventManager.getSwims()
            .slice()
            .reverse();

        if (!swims.length) {
            list.innerHTML = "<p>No swims added yet.</p>";
            return;
        }

        list.innerHTML = swims.map(swim => `
            <div class="swim">
                <strong>${Utils.formatTime(swim.time)}</strong>
                ${swim.marker ? `(${swim.marker})` : ""}
                <br>
                ${swim.meet}
                <br>
                <small>${Utils.formatDate(swim.date)}</small>
            </div>
        `).join("");
    },

    openImport() {
        const text = prompt(
            "Paste SwimCloud results:"
        );

        if (!text) return;

        const swims = Parser.parseSwimCloud(text);

        swims.forEach(swim => {
            EventManager.addSwim(swim);
        });

        this.render();
    },

    openAddSwim() {
        const time = prompt("Time:");

        if (!time) return;

        const meet = prompt(
            "Meet name:"
        ) || "Manual Entry";

        const date = prompt(
            "Date (YYYY-MM-DD):"
        ) || Utils.getToday();

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
