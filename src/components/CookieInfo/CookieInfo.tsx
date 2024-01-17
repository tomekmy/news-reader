import CookieConsent from "react-cookie-consent";

const CookieInfo = () => {

  return (
    <CookieConsent
      buttonText="Ok!"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
    >
      Ta strona używa ciasteczek aby zbierać dane statystyczne.
    </CookieConsent>
  );
};

export default CookieInfo;