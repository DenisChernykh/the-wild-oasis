import Row from '../ui/Row';
import Heading from '../ui/Heading';
import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';

function Settings() {
  return (
    <Row>
      <Heading as="h1">Обновление настроек отеля</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
