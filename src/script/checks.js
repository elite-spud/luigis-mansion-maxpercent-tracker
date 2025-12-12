const firstFloorChecks = [
    {
        name: "Gold Mouse",
        x: 0.825,
        y: 0.385,
    },
    {
        name: "Vase",
        x: 0.650,
        y: 0.385,
    },
    {
        name: "Vase",
        x: 0.870,
        y: 0.385,
    },
    {
        name: "Vase",
        x: 0.840,
        y: 0.205,
    },
    {
        name: "Vase",
        x: 0.750,
        y: 0.205,
    },
    {
        name: "Chandelier",
        x: 0.870,
        y: 0.320,
    },
    {
        name: "Chandelier",
        x: 0.930,
        y: 0.320,
    },
    {
        name: "Bucket",
        x: 0.910,
        y: 0.240,
    },
    {
        name: "Cabinet",
        x: 0.670,
        y: 0.205,
    },
    {
        name: "Light",
        x: 0.645,
        y: 0.205,
    },
    {
        name: "Light",
        x: 0.965,
        y: 0.385,
    },
    {
        name: "Light",
        x: 0.753,
        y: 0.400,
    },
    {
        name: "Cabinet",
        x: 0.885,
        y: 0.425,
    },
    {
        name: "Cabinet",
        x: 0.830,
        y: 0.425,
    },
    {
        name: "Cabinet",
        x: 0.545,
        y: 0.387,
    },
    {
        name: "Light",
        x: 0.565,
        y: 0.387,
    },
    {
        name: "Bucket",
        x: 0.585,
        y: 0.387,
    },
    {
        name: "Cabinet",
        x: 0.535,
        y: 0.420,
    },
    {
        name: "Light",
        x: 0.560,
        y: 0.435,
    },
    {
        name: "Goblet",
        x: 0.615,
        y: 0.450,
    },
    {
        name: "Goblet",
        x: 0.680,
        y: 0.450,
    },
    {
        name: "Light",
        x: 0.765,
        y: 0.170,
    },
    {
        name: "Cabinet",
        x: 0.810,
        y: 0.170,
    },
    {
        name: "Cabinet",
        x: 0.790,
        y: 0.325,
    },
    {
        name: "Light",
        x: 0.590,
        y: 0.330,
    },
    {
        name: "Cabinet",
        x: 0.640,
        y: 0.325,
    },
    {
        name: "Cabinet",
        x: 0.880,
        y: 0.165,
    },
    {
        name: "Light",
        x: 0.855,
        y: 0.170,
    },
    {
        name: "Drawer",
        x: 0.640,
        y: 0.240,
    },
    {
        name: "Drawer",
        x: 0.635,
        y: 0.275,
    },
    {
        name: "Cabinet",
        x: 0.795,
        y: 0.270,
    },
    {
        name: "Light",
        x: 0.777,
        y: 0.260,
    }
];

const secondFloorChecks = [
    {
        name: "Chandelier",
        x: 0.252,
        y: 0.825,
    },
    {
        name: "End Table",
        x: 0.295,
        y: 0.860,
    },
    {
        name: "Cabinet",
        x: 0.215,
        y: 0.810,
    },
    {
        name: "Chandelier",
        x: 0.272,
        y: 0.765,
    },
    {
        name: "Chandelier",
        x: 0.233,
        y: 0.765,
    },
    {
        name: "End Table",
        x: 0.215,
        y: 0.753,
    },
    {
        name: "End Table",
        x: 0.252,
        y: 0.753,
    },
    {
        name: "Wardrobe",
        x: 0.165,
        y: 0.753,
    },
    {
        name: "Light",
        x: 0.160,
        y: 0.835,
    },
    {
        name: "End Table",
        x: 0.045,
        y: 0.855,
    },
    {
        name: "Dresser",
        x: 0.100,
        y: 0.855,
    },
    {
        name: "Light",
        x: 0.055,
        y: 0.950,
    },
    {
        name: "Light",
        x: 0.425,
        y: 0.720,
    },
    {
        name: "Chandelier",
        x: 0.380,
        y: 0.685,
    },
    {
        name: "Vase",
        x: 0.345,
        y: 0.720,
    },
    {
        name: "Vase",
        x: 0.315,
        y: 0.720,
    },
    {
        name: "Vase",
        x: 0.230,
        y: 0.720,
    },
    {
        name: "Vase",
        x: 0.405,
        y: 0.900,
    },
    {
        name: "Light",
        x: 0.265,
        y: 0.685,
    },
    {
        name: "Light",
        x: 0.155,
        y: 0.720,
    },
    {
        name: "Cabinet",
        x: 0.345,
        y: 0.750,
    },
    {
        name: "Cabinet",
        x: 0.425,
        y: 0.750,
    },
    {
        name: "Dresser",
        x: 0.120,
        y: 0.935,
    },
    {
        name: "Light",
        x: 0.150,
        y: 0.950,
    },
    {
        name: "Gold Mouse",
        x: 0.375,
        y: 0.810,
    },
    {
        name: "Cup",
        x: 0.345,
        y: 0.810,
    },
    {
        name: "Cup",
        x: 0.450,
        y: 0.805,
    },
    {
        name: "Cup",
        x: 0.455,
        y: 0.835,
    },
    {
        name: "Cup",
        x: 0.460,
        y: 0.865,
    },
    {
        name: "Chandelier",
        x: 0.405,
        y: 0.835,
    },
    {
        name: "Cabinet",
        x: 0.480,
        y: 0.965,
    }
];

const thirdFloorChecks = [
    
    {
        name: "Light",
        x: 0.460,
        y: 0.600,
    },
    {
        name: "Light",
        x: 0.420,
        y: 0.600,
    },
    {
        name: "Light",
        x: 0.200,
        y: 0.580,
    },
    {
        name: "Light",
        x: 0.210,
        y: 0.480,
    },
    {
        name: "Light",
        x: 0.290,
        y: 0.480,
    },
    {
        name: "Light",
        x: 0.090,
        y: 0.480,
    },
    {
        name: "Jar 1",
        x: 0.050,
        y: 0.450,
    },
    {
        name: "Jar 3",
        x: 0.090,
        y: 0.450,
    },
    {
        name: "Jar 4",
        x: 0.110,
        y: 0.450,
    },
    {
        name: "Jar 5",
        x: 0.050,
        y: 0.510,
    },
    {
        name: "Jar 8",
        x: 0.110,
        y: 0.510,
    },
    
];

const basementChecks = [
    {
        name: "Bucket",
        x: 0.850,
        y: 0.760,
    },
    {
        name: "Shelf 1",
        x: 0.930,
        y: 0.830,
    },
    {
        name: "Shelf 2",
        x: 0.930,
        y: 0.860,
    },
    {
        name: "Shelf 3",
        x: 0.930,
        y: 0.890,
    },
    {
        name: "Shelf 4",
        x: 0.980,
        y: 0.830,
    },
    {
        name: "Shelf 5",
        x: 0.980,
        y: 0.860,
    },
    {
        name: "Shelf 6",
        x: 0.980,
        y: 0.890,
    },
    {
        name: "Light",
        x: 0.935,
        y: 0.745,
    }
];

const checks = basementChecks.concat(firstFloorChecks).concat(secondFloorChecks).concat(thirdFloorChecks);