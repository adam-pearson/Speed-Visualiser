import { defineStore } from "pinia";

export const useDistanceStore = defineStore("distance", {
    state: () => {
        return {
            distance: 0,
            displayDistance: "0",
            unit: "kilometer",
            fractionDigits: 0,
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
            const nf = new Intl.NumberFormat("en-GB", {
                style: "unit",
                unit: this.unit,
                unitDisplay: "short",
                maximumFractionDigits: this.fractionDigits,
            });

            switch (this.unit) {
                case "foot":
                    this.fractionDigits = 0;
                    this.displayDistance = nf.format(this.distance * 3.281);
                    break;
                case "yard":
                    this.fractionDigits = 0;
                    this.displayDistance = nf.format(this.distance * 1.094);
                    break;
                case "mile":
                    this.fractionDigits = 2;
                    this.displayDistance = nf.format(this.distance / 1609);
                    break;
                case "meter":
                    this.fractionDigits = 0;
                    this.displayDistance = nf.format(this.distance);
                    break;
                case "kilometer":
                    this.fractionDigits = 2;
                    this.displayDistance = nf.format(this.distance / 1000);
                    break;
                default:
                    this.displayDistance = nf.format(this.distance);
                    break;
            }
        },
    },
});
