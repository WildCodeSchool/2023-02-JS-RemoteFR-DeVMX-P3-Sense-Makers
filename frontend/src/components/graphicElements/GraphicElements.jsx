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
      {/* <div className="bottom-left-deco">
        <div className="rectangle1" />
        <div className="circle1" />
        <div className="rectangle2" />
        <div className="circle2" />
        <div className="rectangle3" />
        <div className="circle3" />
        <div className="rectangle4" />
        <div className="circle4" />
        <div className="rectangle5" />
        <div className="circle5" />
        <div className="rectangle6" />
        <div className="circle6" />
      </div>
      <div className="top-left-deco">
        <div className="pill-border">
          <div className="rectangle-pill-border" />
          <div className="circle-pill-border" />
        </div>
        <div className="little-pill" />
      </div>
      <div className="top-right-deco">
        <div className="small-green-rectangle" />
        <div className="small-green-circle1" />
        <div className="small-green-circle2" />
        <div className="small-red-rectangle" />
        <div className="small-red-circle1" />
        <div className="small-red-circle2" />
        <div className="small-yellow-rectangle" />
        <div className="small-yellow-circle1" />
        <div className="small-yellow-circle2" />
      </div> */}
    </>
  );
}
