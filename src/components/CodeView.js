import React from 'react';
import CopyToClipboard from 'react-copy-html-to-clipboard';

export const CodeViewComponent = (props => {
  return <div>
    <pre>{props.value}</pre>
    <CopyToClipboard text={props.value} onCopy={props.onCopy}><button>Copy</button></CopyToClipboard>
  </div>
});
