import CodeEditor from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

type Props = {
  language: 'css' | 'html' | 'javascript';
  name: string;
  code: string;
  setValue: any;
  height?: string;
  showTitle?: boolean;
};
function CodeEditorBlock(props: Props) {
  const { language = 'html', name, code, setValue, height, showTitle } = props;
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
    if (language == 'javascript') return javascript({ typescript: true });
    return css();
  };
  return (
    <div className="wrapper-code flex w-full flex-col overflow-x-auto">
      {showTitle && (
        <h1
          className={`p-4 text-xl font-bold capitalize ${
            language == 'html'
              ? 'text-pink-500'
              : language == 'css'
              ? 'text-cyan-500'
              : 'text-yellow-500'
          }`}
        >
          {language}
        </h1>
      )}
      <CodeEditor
        value={code}
        minHeight="100px"
        height={height || 'auto'}
        maxHeight={'500px'}
        theme={dracula}
        extensions={[setLanguage()]}
        onChange={onChange}
      />
    </div>
  );
}

export default CodeEditorBlock;
