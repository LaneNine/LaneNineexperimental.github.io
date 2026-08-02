
const ImportExport = {
    download() {
        const data = StorageManager.export();
        const blob = new Blob([data], {
            type: "application/json"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "lane9-backup.json";
        link.click();

        URL.revokeObjectURL(url);
    },

    upload(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = () => {
                const success = StorageManager.import(
                    reader.result
                );

                resolve(success);
            };

            reader.readAsText(file);
        });
    }
};
