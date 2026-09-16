import { Frame } from "@/components/Frame";

export const metadata = { title: "Made in Orkney — Nine Lives Supply Co." };

export default function MadeInOrkney() {
  return (
    <main className="page page-about">
      <Frame id="env-cat-track" ratio="21/9" className="about-hero" />
      <div className="about-body">
        <h1 className="h1">Made by cat people, for cats who live here.</h1>
        <div className="about-text">
          <p>Most of what a pet shop sells is designed for a cat that lives in a first-floor flat in Guildford. Ours live outside, in horizontal rain, on single-track roads with no streetlights and no pavements, and they come home when they feel like it. We love them anyway, and we worry about them like everybody else. From November to February it's dark by half past three. We started making collars because the ones you could buy either weren't reflective enough to be seen from a car or didn't break away when they caught on a fence, and we kept going.</p>
          <p>Everything is sewn, cut and boxed on Orkney. The webbing is reflective through the weave, not printed on. The tags are engraved on a machine in the back room. The shelters are assembled here and go out in a kraft box with the stencil on the lid and one hi-vis sticker, which is the whole of our packaging.</p>
          <p>We make five colourways: Slate, Moss, Ember, Sand and Hi-Vis. Hi-Vis outsells the other four combined, which is the right outcome, and it's the one we'll put in your basket unless you change it.</p>
          <p>We don't put a puffin on anything.</p>
          <p className="about-sign">Nine Lives Supply Co., Kirkwall.</p>
        </div>
        <div className="about-images">
          <Frame id="process-webbing" ratio="1/1" />
          <Frame id="process-engraver" ratio="1/1" />
          <Frame id="process-stencil" ratio="1/1" />
        </div>
      </div>
    </main>
  );
}
