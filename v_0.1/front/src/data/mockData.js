import { tokens } from "../theme";

export const mockBarData = [
  {
    criteres: "Climate change",
    Manufacturing: 137,
    ManufacturingColor: "hsl(229, 70%, 50%)",
    Transportation: 96,
    TransportationColor: "hsl(296, 70%, 50%)",
    Using: 72,
    UsingColor: "hsl(97, 70%, 50%)",
    "End of Life": 140,
    "End of LifeColor": "hsl(340, 70%, 50%)",
  },
  {
    criteres: "Particulate matter and respiratory inorganics",
    Manufacturing: 55,
    ManufacturingColor: "hsl(307, 70%, 50%)",
    Transportation: 28,
    TransportationColor: "hsl(111, 70%, 50%)",
    Using: 58,
    UsingColor: "hsl(273, 70%, 50%)",
    "End of Life": 29,
    "End of LifeColor": "hsl(275, 70%, 50%)",
  },
  {
    criteres: "Ionising radiation",
    Manufacturing: 109,
    ManufacturingColor: "hsl(72, 70%, 50%)",
    Transportation: 23,
    TransportationColor: "hsl(96, 70%, 50%)",
    Using: 34,
    UsingColor: "hsl(106, 70%, 50%)",
    "End of Life": 152,
    "End of LifeColor": "hsl(256, 70%, 50%)",
  },
  {
    criteres: "Acidification",
    Manufacturing: 133,
    ManufacturingColor: "hsl(257, 70%, 50%)",
    Transportation: 52,
    TransportationColor: "hsl(326, 70%, 50%)",
    Using: 43,
    UsingColor: "hsl(110, 70%, 50%)",
    "End of Life": 83,
    "End of LifeColor": "hsl(9, 70%, 50%)",
  },
  {
    criteres: "Resource use (minerals and metals)",
    Manufacturing: 81,
    ManufacturingColor: "hsl(190, 70%, 50%)",
    Transportation: 80,
    TransportationColor: "hsl(325, 70%, 50%)",
    Using: 112,
    UsingColor: "hsl(54, 70%, 50%)",
    "End of Life": 35,
    "End of LifeColor": "hsl(285, 70%, 50%)",
  },
  
];

export const mockPieData = [
  {
    id: "Manufacturing",
    label: "Manufacturing",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "Transportation",
    label: "Transportation",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "Using",
    label: "Using",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "End of Life",
    label: "End of Life",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  
];

export const mockLineData = [
  {
    id: "Manufacturing",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "2001",
        y: 101,
      },
      {
        x: "2002",
        y: 75,
      },
      {
        x: "2003",
        y: 36,
      },
      {
        x: "2004",
        y: 216,
      },
      {
        x: "2005",
        y: 35,
      },
      
    ],
  },
  {
    id: "Transportation",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "2001",
        y: 212,
      },
      {
        x: "2002",
        y: 190,
      },
      {
        x: "2003",
        y: 270,
      },
      {
        x: "2004",
        y: 9,
      },
      {
        x: "2005",
        y: 75,
      },
      
    ],
  },
  {
    id: "Using",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "2001",
        y: 191,
      },
      {
        x: "2002",
        y: 136,
      },
      {
        x: "2003",
        y: 91,
      },
      {
        x: "2004",
        y: 190,
      },
      {
        x: "2005",
        y: 211,
      },
    ],
  },
  {
    id: "End of Life",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "2001",
        y: 191,
      },
      {
        x: "2002",
        y: 136,
      },
      {
        x: "2003",
        y: 91,
      },
      {
        x: "2004",
        y: 190,
      },
      {
        x: "2005",
        y: 211,
      },
    ],
  },
];