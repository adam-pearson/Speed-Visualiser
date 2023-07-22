import { defineStore } from "pinia";

type Nodes = {
    latlngs: any;
    color: string;
};
type Unit = {
    value: string;
    displayName: string;
    short: string;
};

type TimeParts = {
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export const useDistanceStore = defineStore("distance", {
    state: () => {
        return {
            nodes: <Nodes>{ latlngs: [], color: "green" },
            distance: 0,
            displayDistance: "0",
            unit: <Unit>{
                value: "kilometer",
                displayName: "Kilometres",
                short: "km",
            },
            fractionDigits: 2,
            unitOptions: [
                { value: "foot", displayName: "Feet", short: "ft" },
                { value: "yard", displayName: "Yards", short: "yd" },
                { value: "mile", displayName: "Miles", short: "mi" },
                { value: "meter", displayName: "Metres", short: "m" },
                { value: "kilometer", displayName: "Kilometres", short: "km" },
            ],
        };
    },
    actions: {
        addNode(event: any) {
            this.nodes.latlngs = [...this.nodes.latlngs, event.latlng];
            this.updateDistance();
        },

        removeNode(event: any) {
            console.log(event.latlng);
            this.nodes.latlngs = this.nodes.latlngs.filter(
                (m: any) =>
                    m.lat !== event.latlng.lat && m.lng !== event.latlng.lng
            );

            this.updateDistance();
        },

        updateDistance() {
            this.distance = 0;
            for (let i = 0; i < this.nodes.latlngs.length; i++) {
                if (i > 0) {
                    this.distance += this.nodes.latlngs[i - 1].distanceTo(
                        this.nodes.latlngs[i]
                    );
                }
            }

            this.updateDisplayDistance();
        },

        updateDisplayDistance() {
            const nf = new Intl.NumberFormat("en-GB");

            switch (this.unit.value) {
                case "foot":
                    this.displayDistance = nf.format(this.distance * 3.281);
                    break;
                case "yard":
                    this.displayDistance = nf.format(this.distance * 1.094);
                    break;
                case "mile":
                    this.displayDistance = nf.format(this.distance / 1609);
                    break;
                case "meter":
                    this.displayDistance = nf.format(this.distance);
                    break;
                case "kilometer":
                    this.displayDistance = nf.format(this.distance / 1000);
                    break;
                default:
                    this.displayDistance = nf.format(this.distance);
                    break;
            }
        },

        getDisplayTime(item: any) {
            const time = this.distance / item.top_speed;

            let timeParts: TimeParts = {
                weeks: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };

            let displayTime = "";

            timeParts.weeks = this.getDisplayWeeks(time);
            if (timeParts.weeks) {
                displayTime += timeParts.weeks + "w ";
            }

            timeParts.days = this.getDisplayDays(time, timeParts);
            if (timeParts.days) {
                displayTime += timeParts.days + "d ";
            }

            timeParts.hours = this.getDisplayHours(time, timeParts);
            if (timeParts.hours) {
                displayTime += timeParts.hours + "h ";
            }

            timeParts.minutes = this.getDisplayMinutes(time, timeParts);
            if (timeParts.minutes) {
                displayTime += timeParts.minutes + "m ";
            }

            timeParts.seconds = this.getDisplaySeconds(time, timeParts);
            if (timeParts.seconds) {
                displayTime += timeParts.seconds + "s ";
            }

            return displayTime;
        },

        getDisplayWeeks(time: number) {
            return Math.floor(time / 604800);
        },

        getDisplayDays(time: number, timeParts: TimeParts) {
            return Math.floor((time - timeParts.weeks * 604800) / 86400);
        },

        getDisplayHours(time: number, timeParts: TimeParts) {
            return Math.floor(
                (time - timeParts.weeks * 604800 - timeParts.days * 86400) /
                    3600
            );
        },

        getDisplayMinutes(time: number, timeParts: TimeParts) {
            return Math.floor(
                (time -
                    timeParts.weeks * 604800 -
                    timeParts.days * 86400 -
                    timeParts.hours * 3600) /
                    60
            );
        },

        getDisplaySeconds(time: number, timeParts: TimeParts) {
            return Math.round(
                time -
                    timeParts.weeks * 604800 -
                    timeParts.days * 86400 -
                    timeParts.hours * 3600 -
                    timeParts.minutes * 60
            );
        },
    },
});
