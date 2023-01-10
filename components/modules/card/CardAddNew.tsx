'use client';

import { useInputChange } from 'hooks';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import pretty from 'pretty';
import cssBeautify from 'cssbeautify';
import jsBeautify from 'js-beautify';

import CardAction from './CardAction';
import CardFilter from '@/components/common/dropdown/CardFilter';
import FormGroup from '@/components/common/form/FormGroup';
import InputCard from '@/components/common/input/InputCard';
import Label from '@/components/common/label/Label';
import Button from '@/components/common/button/Button';
import CodeEditorBlock from '@/components/common/input/InputCode';
import cardApi from 'api/cardApi';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faTable } from '@fortawesome/free-solid-svg-icons';
import CardPreview from './CardPreview';

const CardAddNew = ({ setIsShowAddNew, user, card }: any) => {
  const queryClient = useQueryClient();
  const [isCodingLayout, setIsCodingLayout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: '',
    filter: {},
    htmlCode: '',
    cssCode: '',
    jsCode: '',
    author: user.name,
  });

  if (card) {
    useEffect(() => {
      setValues({
        title: card.title,
        filter: {
          id: card.filter_id,
          filter_name: card.filter_name,
        },
        htmlCode: card.html_code,
        cssCode: card.css_code,
        author: card.credit ?? '',
        jsCode: card.js_code,
      });
    }, [card]);
  }
  let newValues: any;
  const handleFormatCode = () => {
    setValues((prev) => ({
      ...prev,
      htmlCode: pretty(prev.htmlCode ?? '', {
        ocd: true,
      }),
      cssCode: cssBeautify(prev.cssCode ?? '', {
        indent: `  `,
        autosemicolon: true,
      }),
      jsCode: jsBeautify(prev.jsCode ?? '', {}),
    }));
  };
  const checkValidity = () => {
    handleFormatCode();
    newValues = {
      ...values,
      htmlCode: pretty(values.htmlCode ?? '', {
        ocd: true,
      }),
      cssCode: cssBeautify(values.cssCode ?? '', {
        indent: `  `,
        autosemicolon: true,
      }),
      jsCode: jsBeautify(values.jsCode ?? '', {}),
    };
    const isAllInputFilled = Object.keys(newValues).every((key) => {
      if (newValues.jsCode != '')
        return (
          (newValues[key] !== '' &&
            Object.keys(newValues.filter).length !== 0) ||
          key == 'cssCode' ||
          key == 'htmlCode'
        );
      else {
        return (
          (newValues[key] !== '' &&
            Object.keys(newValues.filter).length !== 0) ||
          key == 'jsCode'
        );
      }
    });
    if (!isAllInputFilled) {
      toast.error('Please fill all inputs');
      return false;
    }
    return true;
  };

  const handleAddNewCard = async (e: any) => {
    e.preventDefault();
    /*  if (userInfo?.status === userStatus.INACTIVE) {
      toast.warning("Your account is not active, please contact admin");
      return;
    } */
    if (!checkValidity()) return;
    setLoading(true);
    try {
      const card = await cardApi.addCard({
        user_id: user.id,
        filter_id: newValues.filter.id,
        title: newValues.title,
        html_code: newValues.htmlCode,
        css_code: newValues.cssCode,
        js_code: newValues.jsCode,
        credit: newValues.author,
        status: user.role == 'USER' ? 'pending' : 'approved',
      });
      toast.success('Thêm Card Thành Công!');
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      setValues({
        title: '',
        filter: {},
        htmlCode: '',
        cssCode: '',
        jsCode: '',
        author: '',
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleUpdateCard = async () => {
    /*  if (userInfo?.status === userStatus.INACTIVE) {
      toast.warning("Your account is not active, please contact admin");
      return;
    } */
    if (!checkValidity()) return;
    setLoading(true);
    try {
      const data = await cardApi.editCard(
        {
          user_id: user.id,
          filter_id: newValues.filter.id,
          title: newValues.title,
          html_code: newValues.htmlCode,
          css_code: newValues.cssCode,
          js_code: newValues.jsCode,
          credit: newValues.author,
          status: user.role == 'USER' ? 'pending' : card.status,
        },
        card.id,
      );
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      toast.success('Sửa Card Thành Công!');
      setIsShowAddNew(false);
      setLoading(false);
    } catch (e) {
      toast.error('Gặp vấn đề gì đó ~~');
      setLoading(false);
    }
  };

  const { onChange } = useInputChange(values, setValues);

  const handleSelectFilter = (filter: string) => {
    setValues({
      ...values,
      filter,
    });
  };
  return isCodingLayout ? (
    <motion.div
      layoutId="codingLayout"
      className="relative h-full w-full bg-slate-900"
      // transition={{ duration: 2 }}
    >
      <FontAwesomeIcon
        icon={faClose}
        className="absolute top-4 right-4 z-10 h-8 w-8 cursor-pointer text-gray-300 hover:text-primary"
        onClick={() => {
          setIsCodingLayout(false);
        }}
      />
      <div className="flex h-1/2 p-2">
        <CodeEditorBlock
          name="htmlCode"
          setValue={setValues}
          code={values.htmlCode ?? ''}
          language="html"
          height="100%"
          placeholder="Enter your html code"
          showTitle
        />
        <CodeEditorBlock
          setValue={setValues}
          code={values.cssCode ?? ''}
          language="css"
          name="cssCode"
          height="100%"
          placeholder="Enter your css code"
          showTitle
        />
        <CodeEditorBlock
          name="jsCode"
          setValue={setValues}
          code={values.jsCode ?? ''}
          language="javascript"
          height="100%"
          placeholder="Enter your javascript code"
          showTitle
        />
      </div>
      <div className="h-1/2">
        <CardPreview
          htmlCode={values.htmlCode}
          cssCode={values.cssCode}
          jsCode={values.jsCode}
        />
      </div>
    </motion.div>
  ) : (
    <motion.div
      className="w-[90%] max-w-[1200px]"
      layoutId="codingLayout"
      // transition={{ duration: 2 }}
    >
      <CardAction
        values={values}
        setIsShowAddNew={setIsShowAddNew}
        title={card ? 'Edit Card' : 'Add Card'}
      >
        <form
          onSubmit={handleAddNewCard}
          autoComplete="off"
          className="col-span-3 pt-8 pr-4"
        >
          <div className="relative flex items-center gap-x-5">
            <button
              className="absolute top-0 right-0"
              onClick={() => setIsCodingLayout(true)}
            >
              <FontAwesomeIcon
                icon={faTable}
                className="h-6 w-6 text-gray-400"
              />
            </button>
            <FormGroup>
              <Label>Title</Label>
              <InputCard
                name="title"
                type="text"
                placeholder="Enter the title"
                onChange={onChange}
                required
                value={values.title}
              />
            </FormGroup>
            <FormGroup>
              <Label>Filter</Label>
              <CardFilter value={values.filter} setValue={handleSelectFilter} />
            </FormGroup>
          </div>
          <FormGroup>
            <Label className="text-pink-500">HTML</Label>
            <CodeEditorBlock
              name="htmlCode"
              setValue={setValues}
              code={values.htmlCode ?? ''}
              language="html"
              placeholder="Enter your html code"
            ></CodeEditorBlock>
          </FormGroup>
          <FormGroup>
            <Label className="text-cyan-500">CSS</Label>
            <CodeEditorBlock
              name="cssCode"
              setValue={setValues}
              code={values.cssCode ?? ''}
              language="css"
              placeholder="Enter your css code"
            ></CodeEditorBlock>
          </FormGroup>
          <FormGroup>
            <Label className="text-yellow-500">Javascript</Label>
            <CodeEditorBlock
              name="jsCode"
              setValue={setValues}
              code={values.jsCode ?? ''}
              language="javascript"
              placeholder="Enter your javascript code"
            ></CodeEditorBlock>
          </FormGroup>
          <div className="flex items-center gap-x-5">
            <FormGroup>
              <Label>Author (optional)</Label>
              <InputCard
                name="author"
                type="text"
                placeholder="Enter the author(credit)"
                onChange={onChange}
                value={values.author}
              />
            </FormGroup>
          </div>
          <div className="mt-10 text-center">
            {!card ? (
              <Button
                isLoading={loading}
                type="submit"
                className="button-effect bg-gradient-primary mx-auto w-[200px]"
              >
                Add new card
              </Button>
            ) : (
              <Button
                isLoading={loading}
                className="button-effect bg-gradient-primary mx-auto w-[200px]"
                onClick={handleUpdateCard}
              >
                Update card
              </Button>
            )}
          </div>
        </form>
      </CardAction>
    </motion.div>
  );
};

export default CardAddNew;
