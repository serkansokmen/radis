import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import CopyToClipboard from 'react-copy-html-to-clipboard';
import FlatButton from 'material-ui/FlatButton';
import docco from 'react-syntax-highlighter/dist/styles/docco';

export const CodeViewComponent = (props => {
  return <div>
    <SyntaxHighlighter language='json' style={docco}>{props.value}</SyntaxHighlighter>
    <CopyToClipboard text={props.value} onCopy={props.onCopy}>
    {
      props.isNotificationVisible ?
      <div className="alert">
        Copied to Clipboard.
      </div>
      :
      <FlatButton primary={true} fullWidth={true}>Copy</FlatButton>}
    </CopyToClipboard>
  </div>
});
