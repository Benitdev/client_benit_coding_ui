import { ButtonCopy } from '@/components/fragments/Card';
import cssbeautify from 'cssbeautify';
import pretty from 'pretty';
import copyToClipBoard from 'utils/copyToClipboard';
import CodeEditorBlock from '../input/InputCode';
import Label from '../label/Label';
import jsBeautify from 'js-beautify';
import ModalClose from './ModalClose';

const ModalViewCode = ({ htmlCode, cssCode, jsCode, setIsShowCode }: any) => {
  return (
    <div className="fixed inset-0 z-[999] flex cursor-pointer items-center justify-center bg-black bg-opacity-40">
      <div className="scrollbar-style relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-slate-800 ">
        <div className="sticky top-0 z-10 bg-black/60 py-2 text-center font-bold text-primary drop-shadow-xl">
          View Code
          <ModalClose onClick={() => setIsShowCode(false)}></ModalClose>
        </div>
        <div className="space-y-2 p-5 pt-1">
          <div className="flex flex-col">
            <div className="flex items-end justify-between">
              <Label>HTML</Label>
              <ButtonCopy
                type="html"
                onClick={() =>
                  copyToClipBoard(
                    pretty(htmlCode ?? '', {
                      ocd: true,
                    }),
                  )
                }
              >
                Copy
              </ButtonCopy>
            </div>
            <CodeEditorBlock
              name="htmlCode"
              code={htmlCode ?? ''}
              language="html"
              placeholder="Hông có giề!~~"
            ></CodeEditorBlock>
          </div>
          <div className="flex flex-col">
            <div className="flex items-end justify-between">
              <Label>CSS</Label>
              <ButtonCopy
                type="css"
                onClick={() =>
                  copyToClipBoard(
                    cssbeautify(cssCode ?? '', {
                      indent: `  `,
                      autosemicolon: true,
                    }),
                  )
                }
              >
                Copy
              </ButtonCopy>
            </div>
            <CodeEditorBlock
              code={cssCode ?? ''}
              language="css"
              name="cssCode"
              placeholder="Hông có giề!~~"
            ></CodeEditorBlock>
          </div>
          <div className="mb-5 flex flex-col">
            <div className="flex items-end justify-between">
              <Label>Javascript</Label>
              <ButtonCopy
                type="javascript"
                onClick={() => copyToClipBoard(jsBeautify(jsCode ?? '', {}))}
              >
                Copy
              </ButtonCopy>
            </div>
            <CodeEditorBlock
              code={jsCode ?? ''}
              language="javascript"
              name="jsCode"
              placeholder="Hông có giề!~~"
            ></CodeEditorBlock>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalViewCode;
