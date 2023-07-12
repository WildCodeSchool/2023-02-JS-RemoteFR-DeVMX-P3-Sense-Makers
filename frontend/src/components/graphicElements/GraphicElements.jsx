import coloredTraits from "../../assets/colored_traits.png";
import greenPill from "../../assets/green_pill.png";
import threeColoredTraits from "../../assets/three_colored_traits.png";
import photoPill from "../../assets/photo_pill_with_border.png";

export default function graphicElements() {
  return (
    <>
      <div>
        <img
          className="bottom-left-deco"
          src={coloredTraits}
          alt="bottom left decorations"
        />
      </div>
      <div>
        <img
          className="top-left-deco"
          src={greenPill}
          alt="top left decoration"
        />
      </div>
      <div>
        <img
          className="top-right-deco"
          src={threeColoredTraits}
          alt="top right decoration"
        />
      </div>
      <div>
        <img
          className="bottom-right-deco"
          src={photoPill}
          alt="bottom right decoration"
        />
      </div>
    </>
  );
}
