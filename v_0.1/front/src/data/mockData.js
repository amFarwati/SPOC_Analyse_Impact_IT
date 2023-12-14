import { tokens } from "../theme";

export const mockBarData = [
  {
    country: "Climate change",
    "hot dog": 137,
    "hot dogColor": "hsl(229, 70%, 50%)",
    burger: 96,
    burgerColor: "hsl(296, 70%, 50%)",
    kebab: 72,
    kebabColor: "hsl(97, 70%, 50%)",
    donut: 140,
    donutColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "Particulate matter and respiratory inorganics",
    "hot dog": 55,
    "hot dogColor": "hsl(307, 70%, 50%)",
    burger: 28,
    burgerColor: "hsl(111, 70%, 50%)",
    kebab: 58,
    kebabColor: "hsl(273, 70%, 50%)",
    donut: 29,
    donutColor: "hsl(275, 70%, 50%)",
  },
  {
    country: "Ionising radiation",
    "hot dog": 109,
    "hot dogColor": "hsl(72, 70%, 50%)",
    burger: 23,
    burgerColor: "hsl(96, 70%, 50%)",
    kebab: 34,
    kebabColor: "hsl(106, 70%, 50%)",
    donut: 152,
    donutColor: "hsl(256, 70%, 50%)",
  },
  {
    country: "Acidification",
    "hot dog": 133,
    "hot dogColor": "hsl(257, 70%, 50%)",
    burger: 52,
    burgerColor: "hsl(326, 70%, 50%)",
    kebab: 43,
    kebabColor: "hsl(110, 70%, 50%)",
    donut: 83,
    donutColor: "hsl(9, 70%, 50%)",
  },
  {
    country: "Resource use (minerals and metals)",
    "hot dog": 81,
    "hot dogColor": "hsl(190, 70%, 50%)",
    burger: 80,
    burgerColor: "hsl(325, 70%, 50%)",
    kebab: 112,
    kebabColor: "hsl(54, 70%, 50%)",
    donut: 35,
    donutColor: "hsl(285, 70%, 50%)",
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