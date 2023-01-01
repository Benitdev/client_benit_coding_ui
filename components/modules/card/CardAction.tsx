import FormGroup from '@/components/common/form/FormGroup';
import Label from '@/components/common/label/Label';
import Card from '@/components/fragments/Card';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  values: {
    title: string;
    filter: string;
    htmlCode: string;
    cssCode: string;
    author?: string;
  };
  setIsShowAddNew: any;
  children: any;
};
const CardAction = ({ children, values, setIsShowAddNew }: Props) => {
  return (
    <div className="w-[90%] max-w-[1200px] rounded-xl bg-gray-900/70 p-8 backdrop-blur-md">
      <FontAwesomeIcon
        icon={faClose}
        className="absolute top-4 right-4 h-8 w-8 cursor-pointer text-gray-300 hover:text-primary"
        onClick={() => {
          setIsShowAddNew(false);
        }}
      />
      <h1 className="bg-gradient-primary border-b border-primary/20 bg-clip-text pb-4 text-center text-4xl font-bold text-transparent shadow-xl">
        Add Card
      </h1>
      <div className="scrollbar-style relative grid max-h-[800px] w-full grid-cols-1 items-start gap-10 overflow-auto px-1 lg:grid-cols-[1.5fr,1fr]">
        {children}
        <div className="pt-8 lg:sticky lg:top-0">
          <FormGroup className="w-full items-stretch">
            <Label>Preview</Label>
            <Card
              title={values.title}
              filter={values.filter}
              htmlCode={values.htmlCode}
              cssCode={values.cssCode}
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
