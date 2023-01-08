import { useState } from 'react';
import CodeEditorBlock from '../input/InputCode';
import Label from '../label/Label';
import ModalClose from './ModalClose';

const ModalViewCode = ({ htmlCode, cssCode, jsCode, setIsShowCode }: any) => {
  return (
    <div className="fixed inset-0 z-[999] flex cursor-pointer items-center justify-center bg-black bg-opacity-40">
      <div className="scrollbar-style relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-slate-800 p-5">
        <ModalClose onClick={() => setIsShowCode(false)}></ModalClose>
        <div className="mb-5 flex flex-col gap-y-3">
          <Label>HTML</Label>
          <CodeEditorBlock
            name="htmlCode"
            code={htmlCode ?? ''}
            language="html"
            placeholder="Hông có giề!~~"
          ></CodeEditorBlock>
        </div>
        <div className="mb-5 flex flex-col gap-y-3">
          <Label>CSS</Label>
          <CodeEditorBlock
            code={cssCode ?? ''}
            language="css"
            name="cssCode"
            placeholder="Hông có giề!~~"
          ></CodeEditorBlock>
        </div>
        <div className="mb-5 flex flex-col gap-y-3">
          <Label>Javascript</Label>
          <CodeEditorBlock
            code={jsCode ?? ''}
            language="javascript"
            name="jsCode"
            placeholder="Hông có giề!~~"
          ></CodeEditorBlock>
        </div>
      </div>
    </div>
  );
};

export default ModalViewCode;
