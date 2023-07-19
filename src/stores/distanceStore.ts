import { defineStore } from "pinia";

export const useDistanceStore = defineStore("distance", {
    state: () => {
        return {
            distance: 0,
            displayDistance: "0",
            unit: {
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
        updateDistance(nodes: any) {
            this.distance = 0;
            for (let i = 0; i < nodes.value.latlngs.length; i++) {
                if (i > 0) {
                    this.distance += nodes.value.latlngs[i - 1].distanceTo(
                        nodes.value.latlngs[i]
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
    },
});
