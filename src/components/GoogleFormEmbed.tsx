import * as React from "react";
import "./google-form-embed.css";

type Props = {
  src: string;        // full Google Form URL (viewform or with embedded=true)
  title: string;
  minHeight?: number; // desktop min height
  minHeightMobile?: number;
};

function toEmbedded(url: string) {
  try {
    const u = new URL(url);
    u.searchParams.set("embedded", "true");
    return u.toString();
  } catch {
    return url;
  }
}

export default function GoogleFormEmbed({
  src,
  title,
  minHeight = 1200,
  minHeightMobile = 1600,
}: Props) {
  const embedSrc = toEmbedded(src);
  const [loaded, setLoaded] = React.useState(false);
  const [height, setHeight] = React.useState(minHeight);
  const loads = React.useRef(0);

  React.useEffect(() => {
    const measure = () => {
      const isMobile = matchMedia("(max-width: 640px)").matches;
      const base = Math.max(
        innerHeight * (isMobile ? 1.4 : 1.1),
        isMobile ? minHeightMobile : minHeight
      );
      setHeight(Math.round(base));
    };
    measure();
    const onResize = () => measure();
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  }, [minHeight, minHeightMobile]);

  return (
    <div className="gfe">
      {!loaded && (
        <div className="gfe-skeleton" style={{ minHeight: height }}>
          <div className="gfe-bar" />
          <div className="gfe-bar" />
          <div className="gfe-bar short" />
        </div>
      )}
      <iframe
        title={title}
        src={embedSrc}
        className={`gfe-iframe${loaded ? " is-loaded" : ""}`}
        style={{ minHeight: height }}
        loading="lazy"
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        onLoad={() => { loads.current += 1; if (!loaded) setLoaded(true); }}
      >
        Loading…
      </iframe>
    </div>
  );
}


