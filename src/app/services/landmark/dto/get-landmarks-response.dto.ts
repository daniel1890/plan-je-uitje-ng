import { Landmark } from '../../../models/landmark';

export class GetLandmarksResponse {
    public landmarks: Landmark[];

    constructor(landmarks: Landmark[]) {
        this.landmarks = landmarks;
    }
}
