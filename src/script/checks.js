const basementChecks = [
    {
        name: "Light", // Breaker Room
        x: 0.935,
        y: 0.760,
    },
    {
        name: "Shelf 1", // Cellar
        x: 0.930,
        y: 0.850,
    },
    {
        name: "Shelf 2", // Cellar
        x: 0.930,
        y: 0.880,
    },
    {
        name: "Shelf 3", // Cellar
        x: 0.930,
        y: 0.910,
    },
    {
        name: "Shelf 4", // Cellar
        x: 0.980,
        y: 0.850,
    },
    {
        name: "Shelf 5", // Cellar
        x: 0.980,
        y: 0.880,
    },
    {
        name: "Shelf 6", // Cellar
        x: 0.980,
        y: 0.910,
    },
    {
        name: "Bucket", // Pipe Room
        x: 0.850,
        y: 0.775,
    }
];

const firstFloorChecks = [
    {
        name: "Light", // Foyer
        x: 0.755,
        y: 0.380,
    },
    {
        name: "Gold Mouse", // 1F Hallway
        x: 0.825,
        y: 0.365,
    },
    {
        name: "Vase", // 1F Hallway
        x: 0.650,
        y: 0.370,
    },
    {
        name: "Vase", // 1F Hallway
        x: 0.870,
        y: 0.370,
    },
    {
        name: "Vase", // 1F Hallway
        x: 0.840,
        y: 0.180,
    },
    {
        name: "Vase", // 1F Hallway
        x: 0.750,
        y: 0.180,
    },
        {
        name: "Light", // 1F-Basement Stairwell
        x: 0.965,
        y: 0.365,
    },
    {
        name: "Chandelier", // Ballroom
        x: 0.880,
        y: 0.300,
    },
    {
        name: "Chandelier", // Ballroom
        x: 0.935,
        y: 0.300,
    },
    {
        name: "Bucket", // Storage Room
        x: 0.910,
        y: 0.220,
    },
    {
        name: "Cabinet", // 1F Washroom
        x: 0.670,
        y: 0.180,
    },
    {
        name: "Light", // 1F Washroom
        x: 0.645,
        y: 0.180,
    },
    {
        name: "Cabinet", // Fortune-Teller's Room
        x: 0.885,
        y: 0.415,
    },
    {
        name: "Cabinet", // Fortune-Teller's Room
        x: 0.830,
        y: 0.415,
    },
    {
        name: "Cabinet", // Laundry Room
        x: 0.545,
        y: 0.370,
    },
    {
        name: "Light", // Laundry Room
        x: 0.565,
        y: 0.370,
    },
    {
        name: "Bucket", // Laundry Room
        x: 0.585,
        y: 0.370,
    },
    {
        name: "Cabinet", // Butler's Room
        x: 0.535,
        y: 0.410,
    },
    {
        name: "Light", // Butler's Room
        x: 0.560,
        y: 0.425,
    },
    {
        name: "Goblet", // Hidden Room
        x: 0.620,
        y: 0.440,
    },
    {
        name: "Goblet", // Hidden Room
        x: 0.680,
        y: 0.440,
    },
    {
        name: "Light", // Conservatory
        x: 0.765,
        y: 0.140,
    },
    {
        name: "Cabinet", // Conservatory
        x: 0.810,
        y: 0.130,
    },
    {
        name: "Cabinet", // Dining Room
        x: 0.790,
        y: 0.305,
    },
    {
        name: "Cabinet", // Kitchen
        x: 0.640,
        y: 0.305,
    },
    {
        name: "Light", // Kitchen
        x: 0.590,
        y: 0.310,
    },
    {
        name: "Cabinet", // Rec Room
        x: 0.880,
        y: 0.135,
    },
    {
        name: "Light", // Rec Room
        x: 0.855,
        y: 0.140,
    },
    {
        name: "Drawer", // Billiard's Room
        x: 0.640,
        y: 0.220,
    },
    {
        name: "Drawer", // Billiard's Room
        x: 0.635,
        y: 0.255,
    },
    {
        name: "Light", // Projector Room
        x: 0.780,
        y: 0.240,
    },
    {
        name: "Cabinet", // Projector Room
        x: 0.795,
        y: 0.250,
    }
];

const secondFloorChecks = [
    {
        name: "Chandelier", // Parlor
        x: 0.252,
        y: 0.815,
    },
    {
        name: "End Table", // Parlor
        x: 0.295,
        y: 0.850,
    },
    {
        name: "Cabinet", // Parlor
        x: 0.215,
        y: 0.800,
    },
    {
        name: "Chandelier", // Anteroom
        x: 0.272,
        y: 0.750,
    },
    {
        name: "End Table", // Anteroom
        x: 0.252,
        y: 0.735,
    },
    {
        name: "Chandelier", // Anteroom
        x: 0.233,
        y: 0.750,
    },
    {
        name: "End Table", // Anteroom
        x: 0.215,
        y: 0.735,
    },
    {
        name: "Wardrobe", // Wardrome Room
        x: 0.165,
        y: 0.735,
    },
    {
        name: "Light", // Study
        x: 0.160,
        y: 0.820,
    },
    {
        name: "End Table", // Master Bedroom
        x: 0.045,
        y: 0.845,
    },
    {
        name: "Dresser", // Master Bedroom
        x: 0.100,
        y: 0.835,
    },
    {
        name: "Light", // Nursery
        x: 0.055,
        y: 0.950,
    },
    {
        name: "Light", // 1F-2F Stairwell
        x: 0.425,
        y: 0.700,
    },
    {
        name: "Chandelier", // Tea Room
        x: 0.380,
        y: 0.655,
    },
    {
        name: "Vase", // 2F Hallway
        x: 0.340,
        y: 0.700,
    },
    {
        name: "Vase", // 2F Hallway
        x: 0.315,
        y: 0.700,
    },
    {
        name: "Vase", // 2F Hallway
        x: 0.230,
        y: 0.700,
    },
    {
        name: "Vase", // 2F Hallway
        x: 0.405,
        y: 0.890,
    },
    {
        name: "Light", // Nana's Room
        x: 0.265,
        y: 0.655,
    },
    {
        name: "Light", // 2F Washroom
        x: 0.155,
        y: 0.700,
    },
    {
        name: "Cabinet", // Astral Hall
        x: 0.345,
        y: 0.730,
    },
    {
        name: "Cabinet", // Observatory
        x: 0.420,
        y: 0.730,
    },
    {
        name: "Dresser", // Twin's Room
        x: 0.120,
        y: 0.925,
    },
    {
        name: "Light", // Twin's Room
        x: 0.150,
        y: 0.940,
    },
    {
        name: "Gold Mouse", // Sealed Room
        x: 0.370,
        y: 0.795,
    },
    {
        name: "Cup", // Sealed Room
        x: 0.345,
        y: 0.790,
    },
    {
        name: "Cup", // Sealed Room
        x: 0.455,
        y: 0.790,
    },
    {
        name: "Cup", // Sealed Room
        x: 0.460,
        y: 0.815,
    },
    {
        name: "Cup", // Sealed Room
        x: 0.465,
        y: 0.845,
    },
    {
        name: "Chandelier", // Sealed Room
        x: 0.405,
        y: 0.815,
    },
    {
        name: "Cabinet", // Guest Bedroom
        x: 0.480,
        y: 0.965,
    }
];

const thirdFloorChecks = [
    {
        name: "Light", // Safari Room
        x: 0.460,
        y: 0.560,
    },
    {
        name: "Light", // Safari Room
        x: 0.420,
        y: 0.560,
    },
    {
        name: "Light", // Telephone Room
        x: 0.210,
        y: 0.530,
    },
    {
        name: "Light", // Clockwork Room
        x: 0.220,
        y: 0.430,
    },
    {
        name: "Light", // Clockwork Room
        x: 0.290,
        y: 0.430,
    },
    {
        name: "Light", // Ceramics Studio
        x: 0.090,
        y: 0.435,
    },
    {
        name: "Jar 1", // Ceramics Studio
        x: 0.060,
        y: 0.400,
    },
    {
        name: "Jar 3", // Ceramics Studio
        x: 0.100,
        y: 0.400,
    },
    {
        name: "Jar 4", // Ceramics Studio
        x: 0.120,
        y: 0.400,
    },
    {
        name: "Jar 5", // Ceramics Studio
        x: 0.060,
        y: 0.460,
    },
    {
        name: "Jar 8", // Ceramics Studio
        x: 0.120,
        y: 0.460,
    },
    
];

const checks = basementChecks.concat(firstFloorChecks).concat(secondFloorChecks).concat(thirdFloorChecks);