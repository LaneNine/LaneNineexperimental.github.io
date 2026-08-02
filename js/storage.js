/*
    Lane9 Local Storage System

    No cloud.
    No accounts.
    Everything stays on the user's device.
*/


const StorageManager = {

    key: "lane9_data",


    defaultData: {

        settings: {
            theme: "dark",
            selectedEvent: "50 Fly"
        },


        events: {

            "50 Fly": {

                goal: null,

                swims: []

            }

        }

    },


    data: null,



    load(){

        const saved =
            localStorage.getItem(this.key);


        if(saved){

            try {

                this.data = JSON.parse(saved);

            }

            catch(error){

                console.error(
                    "Lane9 data corrupted",
                    error
                );

                this.reset();

            }

        }

        else {

            this.reset();

        }


        return this.data;

    },



    save(){

        localStorage.setItem(
            this.key,
            JSON.stringify(this.data)
        );

    },



    reset(){

        this.data =
            structuredClone(
                this.defaultData
            );


        this.save();

    },



    getData(){

        if(!this.data){

            this.load();

        }


        return this.data;

    },



    addEvent(name){

        const data =
            this.getData();


        if(!data.events[name]){

            data.events[name] = {

                goal:null,

                swims:[]

            };

        }


        this.save();

    },



    removeEvent(name){

        const data =
            this.getData();


        delete data.events[name];


        this.save();

    },



    addSwim(
        event,
        swim
    ){

        const data =
            this.getData();


        if(!data.events[event]){

            this.addEvent(event);

        }


        data.events[event]
            .swims
            .push(swim);



        data.events[event]
            .swims
            .sort(
                (a,b)=>
                    new Date(a.date)
                    -
                    new Date(b.date)
            );


        this.save();

    },



    setGoal(
        event,
        goal
    ){

        const data =
            this.getData();


        this.addEvent(event);


        data.events[event]
            .goal = goal;


        this.save();

    },



    getEvent(name){

        const data =
            this.getData();


        return data.events[name];

    },


    export(){

        return JSON.stringify(
            this.data,
            null,
            2
        );

    },


    import(json){

        try {

            this.data =
                JSON.parse(json);


            this.save();


            return true;

        }

        catch {

            return false;

        }

    }


};
