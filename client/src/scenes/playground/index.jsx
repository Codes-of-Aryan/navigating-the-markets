// import React, { useEffect, useRef, memo } from "react";

// function TradingViewWidget() {
//     const container = useRef();

//     useEffect(() => {
//         const script = document.createElement("script");
//         script.src =
//             "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
//         script.type = "text/javascript";
//         script.async = true;
//         script.innerHTML = `
//         {
//           "symbols": [
//             [
//               "Apple",
//               "AAPL|1D"
//             ],
//             [
//               "Google",
//               "GOOGL|1D"
//             ],
//             [
//               "Microsoft",
//               "MSFT|1D"
//             ]
//           ],
//           "chartOnly": false,
//           "width": 1000,
//           "height": 500,
//           "locale": "en",
//           "colorTheme": "light",
//           "autosize": false,
//           "showVolume": false,
//           "showMA": false,
//           "hideDateRanges": false,
//           "hideMarketStatus": false,
//           "hideSymbolLogo": false,
//           "scalePosition": "right",
//           "scaleMode": "Normal",
//           "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
//           "fontSize": "10",
//           "noTimeScale": false,
//           "valuesTracking": "1",
//           "changeMode": "price-and-percent",
//           "chartType": "area",
//           "maLineColor": "#2962FF",
//           "maLineWidth": 1,
//           "maLength": 9,
//           "lineWidth": 2,
//           "lineType": 0,
//           "dateRanges": [
//             "1d|1",
//             "1m|30",
//             "3m|60",
//             "12m|1D",
//             "60m|1W",
//             "all|1M"
//           ]
//         }`;
//         container.current.appendChild(script);
//     }, []);

//     return (
//         <div className="tradingview-widget-container" ref={container}>
//             .{<div className="tradingview-widget-container__widget"></div>}
//             {/* <div className="tradingview-widget-copyright"></div> */}
//         </div>
//     );
// }

// export default memo(TradingViewWidget);
// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
    const container = useRef();

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "support_host": "https://www.tradingview.com"
        }`;
        container.current.appendChild(script);
    }, []);

    return (
        <div
            className="tradingview-widget-container"
            ref={container}
            style={{ height: "100%", width: "100%" }}
        >.
            {/* <div
                className="tradingview-widget-container__widget"
                style={{ height: "calc(100% - 32px)", width: "100%" }}
            ></div>
            <div className="tradingview-widget-copyright">
                <a
                    href="https://www.tradingview.com/"
                    rel="noopener nofollow"
                    target="_blank"
                ></a>
            </div> */}
        </div>
    );
}

export default memo(TradingViewWidget);
