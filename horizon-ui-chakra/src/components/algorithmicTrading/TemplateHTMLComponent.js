import React from 'react'

function TemplateHTMLComponent() {
    // const htmlFile = require('../../algo-lstm.html');
    // const htmlFile = require('../../../public/algo-lstm.html');

  return (
    <div>
        <iframe title="static_html" src="../../../public/algo-lstm.html"></iframe>
    </div>
        //   <div dangerouslySetInnerHTML={{ __html: htmlFile }} />
        //   <div dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} />
        );
}

export default TemplateHTMLComponent

// const htmlFile = require('../some/path/to/html/file');

// class TemplateHTMLComponent extends React.Component {
//     render() {
//         return <div dangerouslySetInnerHTML={{ __html: htmlFile}};
//     }
// }