import { Composition } from "remotion";
import { HeroLoop, FPS, DURATION } from "./HeroLoop";
import { Logo, TapeBand } from "./Brand";
import { Still } from "remotion";

// One composition: the homepage hero background.
// Render: npm run hero:render  ->  public/media/hero.mp4
export const RemotionRoot = () => (
  <>
  <Still id="Logo" component={Logo} width={1400} height={200} />
  <Still id="TapeBand" component={TapeBand} width={2400} height={36} />
  <Composition
    id="HeroLoop"
    component={HeroLoop}
    durationInFrames={DURATION}
    fps={FPS}
    width={1920}
    height={1080}
  />
  </>
);
