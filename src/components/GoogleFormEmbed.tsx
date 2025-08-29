import * as React from "react";
import "./google-form-embed.css";

type Props = {
  src: string;        // full Google Form URL (viewform or with embedded=true)
  title: string;
  minHeight?: number; // optional, no longer used for calc (kept for API compatibility)
  minHeightMobile?: number; // optional, no longer used for calc
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
  const loads = React.useRef(0);

  return (
    <div className="gfe">
      {!loaded && (
        <div className="gfe-skeleton">
          <div className="gfe-bar" />
          <div className="gfe-bar" />
          <div className="gfe-bar short" />
        </div>
      )}
      <iframe
        title={title}
        src={embedSrc}
        className={`gfe-iframe${loaded ? " is-loaded" : ""}`}
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


