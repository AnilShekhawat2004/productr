import Man from "../../assets/Man.jpg";
import Frame from "../../assets/Frame.png";
import Logo from "../../assets/Logo.png";

export default function Landing() {
  return (
    <div className="w-1/2 flex items-center justify-center pt-5 pb-5">
      <div
        className="relative w-full h-full max-w-[690px] max-h-[960px] rounded-[32px] border border-[#D4D4D4] flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #1A1F8A 0%, #2A4AA5 19.23%, #8A63B8 38.46%, #F0A5AA 57.21%, #F2B89A 76.92%, #D95A2A 100%)",
        }}
      >
        <img
          src={Frame}
          alt="frame"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative w-[35%] aspect-2/3 rounded-[32px] shadow-2xl overflow-hidden flex items-center justify-center">
          <img
            src={Man}
            alt="runner"
            loading="lazy"
            className="w-full h-full object-cover"
          />

          <div
            className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[80%] h-[30%] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.1) 70%, transparent 100%)",
              filter: "blur(40px)",
              mixBlendMode: "plus-lighter",
            }}
          ></div>

          <div className="absolute bottom-[5%] text-center text-white font-medium text-[1rem] px-[5%]">
            Uplist your <br /> product to market
          </div>
        </div>

        <div className="absolute top-[3%] left-[3%]">
          <img
            src={Logo}
            alt="Logo"
            loading="lazy"
            className="w-[110px] h-[38px] pt-[5px]"
          />
        </div>
      </div>
    </div>
  );
}