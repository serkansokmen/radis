import React from 'react';
import CopyToClipboard from 'react-copy-html-to-clipboard';
import FlatButton from 'material-ui/FlatButton';

export const CodeViewComponent = (props => {
  return <div>
    <pre>{props.value}</pre>
    <CopyToClipboard text={props.value} onCopy={props.onCopy}><FlatButton primary={true}>Copy</FlatButton></CopyToClipboard>
  </div>
});
