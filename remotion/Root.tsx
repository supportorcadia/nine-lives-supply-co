import { Composition } from "remotion";
import { HeroLoop, FPS, DURATION } from "./HeroLoop";

// One composition: the homepage hero background.
// Render: npm run hero:render  ->  public/media/hero.mp4
export const RemotionRoot = () => (
  <Composition
    id="HeroLoop"
    component={HeroLoop}
    durationInFrames={DURATION}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
