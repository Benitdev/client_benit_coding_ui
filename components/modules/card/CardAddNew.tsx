'use client';

import { useInputChange, useToggle } from 'hooks';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { cardStatus, userRole, userStatus } from 'constant/global-constant';
import CardAction from './CardAction';
import CardFilter from '@/components/common/combo-box/CardFilter';
import FormGroup from '@/components/common/form/FormGroup';
import Input from '@/components/common/input/Input';
import InputCard from '@/components/common/input/InputCard';
import Label from '@/components/common/label/Label';
import Button from '@/components/common/button/Button';
import CodeEditorBlock from '@/components/common/input/InputCode';
import cardApi from 'api/cardApi';

const CardAddNew = ({ setIsShowAddNew, user }: any) => {
  const [filterList, setFilterList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: '',
    filter: '1',
    htmlCode: '',
    cssCode: '',
    author: '',
  });
  const handleAddNewCard = async (e: any) => {
    e.preventDefault();
    /*  if (userInfo?.status === userStatus.INACTIVE) {
      toast.warning("Your account is not active, please contact admin");
      return;
    } */
    const newValues = { ...values };
    const isAllInputFilled = Object.values(newValues).every((item) => {
      return item !== '';
    });
    if (!isAllInputFilled) {
      toast.error('Please fill all inputs');
      return;
    }
    setLoading(true);
    try {
      const card = await cardApi.addCard({
        user_id: user.id,
        filter_id: 1,
        title: newValues.title,
        html_code: newValues.htmlCode,
        css_code: newValues.cssCode,
        credit: newValues.author,
      });
      toast.success('Thêm Card Thành Công!');
      setValues({
        title: '',
        filter: '1',
        htmlCode: '',
        cssCode: '',
        author: '',
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const { onChange } = useInputChange(values, setValues);
  const { show: showFilter, toggle } = useToggle();
  const handleSelectFilter = (filter: string) => {
    setValues({
      ...values,
      filter,
    });
    toggle();
  };
  return (
    <CardAction values={values} setIsShowAddNew={setIsShowAddNew}>
      <form
        onSubmit={handleAddNewCard}
        autoComplete="off"
        className="pt-8 pr-4"
      >
        <div className="flex items-center gap-x-5">
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
            <CardFilter
              value={values.filter || 'Select Filter'}
              setValue={setValues}
            />
          </FormGroup>
        </div>

        <FormGroup>
          <Label>HTML</Label>
          <CodeEditorBlock
            name="htmlCode"
            setValue={setValues}
            code={values.htmlCode}
            language="html"
            placeholder="Enter your HTML code"
          ></CodeEditorBlock>
        </FormGroup>
        <FormGroup>
          <Label>CSS</Label>
          <CodeEditorBlock
            setValue={setValues}
            code={values.cssCode}
            language="css"
            placeholder="Enter your CSS code"
            name="cssCode"
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
          <Button
            isLoading={loading}
            type="submit"
            className="button-effect bg-gradient-primary w-[200px]"
          >
            Add new card
          </Button>
        </div>
      </form>
    </CardAction>
  );
};

export default CardAddNew;
