/*
    Lane9 SwimCloud Parser

    Converts pasted SwimCloud results into:

    {
        time: 25.41,
        meet: "Wisconsin LSC Regional Championship",
        date: "2026-02-21",
        marker: ""
    }

*/


const Parser = {


    parseSwimCloud(text){


        const lines =
            text
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length);



        const swims = [];



        for(const line of lines){


            const swim =
                this.parseLine(line);



            if(swim){

                swims.push(swim);

            }

        }



        return swims.sort(
            (a,b)=>
                new Date(a.date)
                -
                new Date(b.date)
        );

    },



    parseLine(line){


        /*
            Expected:

            25.41    Meet Name    Feb 21, 2026

            or

            30.63    XR    Meet Name    Jan 10, 2025
        */


        const parts =
            line
            .split(/\t+|\s{2,}/)
            .map(x=>x.trim())
            .filter(Boolean);



        if(parts.length < 3){

            return null;

        }



        let time =
            parts[0];



        if(!this.isTime(time)){

            return null;

        }



        time =
            parseFloat(time);



        let marker = "";

        let meet = "";

        let date = "";



        /*
            If second column is X/R/XR
        */


        if(
            ["X","R","XR"]
            .includes(parts[1])
        ){

            marker =
                parts[1];


            meet =
                parts
                .slice(2,-1)
                .join(" ");


            date =
                parts[parts.length-1];

        }

        else {


            meet =
                parts
                .slice(1,-1)
                .join(" ");


            date =
                parts[parts.length-1];

        }



        const parsedDate =
            this.parseDate(date);



        if(!parsedDate){

            return null;

        }



        return {

            time,

            meet,

            date: parsedDate,

            marker

        };


    },




    isTime(value){

        return /^\d+\.\d+$/.test(value);

    },




    parseDate(value){


        const date =
            new Date(value);



        if(isNaN(date)){

            return null;

        }



        return date
            .toISOString()
            .split("T")[0];

    }

};
