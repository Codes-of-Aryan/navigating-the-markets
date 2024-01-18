import React, { useEffect, useRef, memo } from "react";

function AppleNews() {
    const container = useRef();
    const script = document.createElement("script");
    useEffect(() => {
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "feedMode": "symbol",
          "symbol": "NASDAQ:AAPL",
          "isTransparent": false,
          "displayMode": "regular",
          "width": 300,
          "height": 500,
          "colorTheme": "light",
          "locale": "en"
        }`;

        container.current.appendChild(script);
    }, [script, container]);

    return (
        <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default memo(AppleNews);
