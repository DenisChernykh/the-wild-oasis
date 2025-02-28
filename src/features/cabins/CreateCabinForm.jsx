import { useForm } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const { createCabin, isCreating } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        {
          newCabinData: { ...data, image },
          id: editId,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Название жилья" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          required
          type="text"
          id="name"
          {...register('name', {
            required: 'Это поле обязательно',
          })}
        />
      </FormRow>

      <FormRow
        label="Максимальная вместимость"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'Это поле обязательное',
            min: {
              value: 1,
              message: 'Вместимость должна быть не менее 1 гостя',
            },
          })}
        />
      </FormRow>

      <FormRow label="Цена" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register('regularPrice', {
            required: 'Это обязательное поле',
            valueAsNumber: true,
            min: {
              value: 1,
              message: 'Цена должна быть не менее 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Скидка" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register('discount', {
            required: 'Это поле обязательное',
            valueAsNumber: true,
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Скидка должна быть меньше или равна обычной цене',
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow label="Описание для сайта" error={errors?.description?.message}>
        <Textarea
          type="number"
          disabled={isWorking}
          id="description"
          {...register('description', { required: 'Это поле обязательное' })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label="Фото жилья">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'Это поле обязатльное',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => onCloseModal?.()}
          $variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Изменить жилье' : 'Добавить жилье'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
