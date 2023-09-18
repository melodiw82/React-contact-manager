import SpinnerGIF from "../assets/spinner.gif";
import { FOREGROUND } from "../helpers/colors";

const Spinner = () => {
  return (
    <>
      <div className="container align-items-center text-center">
        <img
          src={SpinnerGIF}
          className="d-block m-auto"
          style={{ width: "200px" }}
        />
        <p className="h3" style={{ color: FOREGROUND }}>
          لطفا منتظر بمانید...
        </p>
      </div>
    </>
  );
};

export default Spinner;
