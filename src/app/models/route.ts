import { Landmark } from './landmark';

export interface Route {
    landmarks: Landmark[],
    totalDuration: number,
}
