'use client';

import { useInputChange, useToggle } from 'hooks';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { cardStatus, userRole, userStatus } from 'constant/global-constant';
import CardAction from './CardAction';
import CardFilter from '@/components/common/dropdown/CardFilter';
import FormGroup from '@/components/common/form/FormGroup';
import Input from '@/components/common/input/Input';
import InputCard from '@/components/common/input/InputCard';
import Label from '@/components/common/label/Label';
import Button from '@/components/common/button/Button';
import CodeEditorBlock from '@/components/common/input/InputCode';
import cardApi from 'api/cardApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
    jsCode: '//enter your javascript code ~~',
    author: '',
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
  const checkValidity = () => {
    newValues = { ...values };
    console.log(newValues);
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
        className="absolute top-4 right-4 h-8 w-8 cursor-pointer text-gray-300 hover:text-primary"
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
          showTitle
        />
        <CodeEditorBlock
          setValue={setValues}
          code={values.cssCode ?? ''}
          language="css"
          name="cssCode"
          height="100%"
          showTitle
        />
        <CodeEditorBlock
          name="jsCode"
          setValue={setValues}
          code={values.jsCode ?? '//enter your javascript code ~~'}
          language="javascript"
          height="100%"
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
            ></CodeEditorBlock>
          </FormGroup>
          <FormGroup>
            <Label className="text-cyan-500">CSS</Label>
            <CodeEditorBlock
              setValue={setValues}
              code={values.cssCode ?? ''}
              language="css"
              name="cssCode"
            ></CodeEditorBlock>
          </FormGroup>
          <FormGroup>
            <Label className="text-yellow-500">Javascript</Label>
            <CodeEditorBlock
              setValue={setValues}
              code={values.jsCode ?? '//enter your javascript code ~~'}
              language="javascript"
              name="jsCode"
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
                className="button-effect bg-gradient-primary w-[200px]"
              >
                Add new card
              </Button>
            ) : (
              <Button
                isLoading={loading}
                className="button-effect bg-gradient-primary w-[200px]"
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
