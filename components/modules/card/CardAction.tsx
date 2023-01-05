import FormGroup from '@/components/common/form/FormGroup';
import Label from '@/components/common/label/Label';
import Card from '@/components/fragments/Card';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  values: {
    title: string;
    filter: any;
    htmlCode: string;
    cssCode: string;
    jsCode: string;
    author?: string;
  };
  setIsShowAddNew: any;
  title?: string;
  children: any;
};
const CardAction = ({
  children,
  values,
  setIsShowAddNew,
  title = 'Add Card',
}: Props) => {
  return (
    <div className="relative rounded-xl bg-slate-900/70 p-8">
      <FontAwesomeIcon
        icon={faClose}
        className="absolute top-4 right-4 h-8 w-8 cursor-pointer text-gray-300 hover:text-primary"
        onClick={() => {
          setIsShowAddNew(false);
        }}
      />
      <h1 className="bg-gradient-primary border-b border-primary/20 bg-clip-text pb-4 text-center text-4xl font-bold text-transparent shadow-xl">
        {title}
      </h1>
      <div className="scrollbar-style relative grid max-h-[800px] w-full grid-cols-1 items-start overflow-auto px-1 lg:grid-cols-5">
        {children}
        <div className="pt-8 lg:sticky lg:top-0 lg:col-span-2">
          <FormGroup className="w-full items-stretch">
            <Label>Preview</Label>
            <Card
              title={values.title}
              htmlCode={values.htmlCode}
              cssCode={values.cssCode}
              jsCode={values.jsCode}
              author={values.author}
              preview
            ></Card>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default CardAction;
