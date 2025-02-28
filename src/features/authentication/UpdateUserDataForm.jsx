import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';
import SpinnerOverlay from '../../ui/SpinnerOverlay';

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: {
        fullName: currentFullName,
      },
    },
  } = useUser();

  const { updateUser, isUpdating } =
    useUpdateUser();

  const [fullName, setFullName] = useState(
    currentFullName
  );
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }
  return (
    <SpinnerOverlay isLoading={isUpdating}>
      <Form onSubmit={handleSubmit}>
        <FormRow label="Email">
          <Input value={email} disabled />
        </FormRow>
        <FormRow label="Полное имя">
          <Input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            id="fullName"
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow label="Аватар">
          <FileInput
            id="avatar"
            accept="image/*"
            onChange={(e) =>
              setAvatar(e.target.files[0])
            }
          />
        </FormRow>
        <FormRow>
          <Button
            type="reset"
            $variation="secondary"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Отмена
          </Button>
          <Button disabled={isUpdating}>
            Обновить данные
          </Button>
        </FormRow>
      </Form>
    </SpinnerOverlay>
  );
}

export default UpdateUserDataForm;
