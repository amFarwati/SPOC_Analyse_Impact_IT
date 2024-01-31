import { tokens } from "../theme";

export const mockBarData = [
  {
    criteres: "Climate change",
    Manufacturing: 0,
    ManufacturingColor: "hsl(229, 70%, 50%)",
    Transportation: 0,
    TransportationColor: "hsl(296, 70%, 50%)",
    Using: 0,
    UsingColor: "hsl(97, 70%, 50%)",
    "End of Life": 0,
    "End of LifeColor": "hsl(340, 70%, 50%)",
  },
  {
    criteres: "Particulate matter and respiratory inorganics",
    Manufacturing: 0,
    ManufacturingColor: "hsl(307, 70%, 50%)",
    Transportation: 0,
    TransportationColor: "hsl(111, 70%, 50%)",
    Using: 0,
    UsingColor: "hsl(273, 70%, 50%)",
    "End of Life": 0,
    "End of LifeColor": "hsl(275, 70%, 50%)",
  },
  {
    criteres: "Ionising radiation",
    Manufacturing: 0,
    ManufacturingColor: "hsl(72, 70%, 50%)",
    Transportation: 0,
    TransportationColor: "hsl(96, 70%, 50%)",
    Using: 0,
    UsingColor: "hsl(106, 70%, 50%)",
    "End of Life": 0,
    "End of LifeColor": "hsl(256, 70%, 50%)",
  },
  {
    criteres: "Acidification",
    Manufacturing: 0,
    ManufacturingColor: "hsl(257, 70%, 50%)",
    Transportation: 0,
    TransportationColor: "hsl(326, 70%, 50%)",
    Using: 0,
    UsingColor: "hsl(110, 70%, 50%)",
    "End of Life": 0,
    "End of LifeColor": "hsl(9, 70%, 50%)",
  },
  {
    criteres: "Resource use (minerals and metals)",
    Manufacturing: 0,
    ManufacturingColor: "hsl(190, 70%, 50%)",
    Transportation: 0,
    TransportationColor: "hsl(325, 70%, 50%)",
    Using: 0,
    UsingColor: "hsl(54, 70%, 50%)",
    "End of Life": 0,
    "End of LifeColor": "hsl(285, 70%, 50%)",
  },
  
];

export const mockPieData = [
  {
    id: "Manufacturing",
    label: "Manufacturing",
    value: 0,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "Transportation",
    label: "Transportation",
    value: 0,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "Using",
    label: "Using",
    value: 0,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "End of Life",
    label: "End of Life",
    value: 0,
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
        y: 0,
      },
      {
        x: "2002",
        y: 0,
      },
      {
        x: "2003",
        y: 0,
      },
      {
        x: "2004",
        y: 0,
      },
      {
        x: "2005",
        y: 0,
      },
      
    ],
  },
  {
    id: "Transportation",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "2001",
        y: 0,
      },
      {
        x: "2002",
        y: 0,
      },
      {
        x: "2003",
        y: 0,
      },
      {
        x: "2004",
        y: 0,
      },
      {
        x: "2005",
        y: 0,
      },
      
    ],
  },
  {
    id: "Using",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "2001",
        y: 0,
      },
      {
        x: "2002",
        y: 0,
      },
      {
        x: "2003",
        y: 0,
      },
      {
        x: "2004",
        y: 0,
      },
      {
        x: "2005",
        y: 0,
      },
    ],
  },
  {
    id: "End of Life",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "2001",
        y: 0,
      },
      {
        x: "2002",
        y: 0,
      },
      {
        x: "2003",
        y: 0,
      },
      {
        x: "2004",
        y: 0,
      },
      {
        x: "2005",
        y: 0,
      },
    ],
  },
];