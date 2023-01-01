import CodeEditor from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { dracula } from '@uiw/codemirror-theme-dracula';

type Props = {
  language: 'css' | 'html' | 'javascript';
  placeholder: string;
  name: string;
  code: string;
  setValue: any;
};
function CodeEditorBlock(props: Props) {
  const { language = 'html', placeholder = '', name, code, setValue } = props;
  const onChange = (code: string) => {
    setValue((prev: any) => {
      return {
        ...prev,
        [name]: code,
      };
    });
  };
  const setLanguage = () => {
    if (language == 'html')
      return html({
        autoCloseTags: true,
        matchClosingTags: true,
      });
    else return css();
  };
  return (
    <div className="wrapper-code scrollbar-style w-full">
      <CodeEditor
        value={code}
        minHeight="100px"
        theme={dracula}
        extensions={[setLanguage()]}
        onChange={onChange}
      />
    </div>
  );
}

export default CodeEditorBlock;
