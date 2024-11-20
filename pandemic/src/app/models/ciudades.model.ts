export interface Ciudad{
y: any;
x: any;
  name: string;
  region: number;
  coordinates: {
    x: number;
    y: number;
  };
  connectedCities: string[];
  characters: any[];
  researchCenter: boolean;
  diseaseCount: {
    green: number;
    red: number;
    blue: number;
    yellow: number;
  };
}
