import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { useNavigate } from 'react-router-dom';
import {
  HiArrowUpOnSquare,
  HiTrash,
} from 'react-icons/hi2';
import { useCheckout } from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const { checkout, isCheckingout } =
    useCheckout();
  const { deleteBooking, isDeleting } =
    useDeleteBooking();
  if (isLoading) return <Spinner />;

  if (!booking)
    return <Empty resourceName="booking" />;
  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">
            Booking #{bookingId}
          </Heading>
          <Tag type={statusToTagName[status]}>
            {status.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>
          &larr; Back
        </ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          <Modal.Open opens="delete">
            <Button
              $variation="danger"
              $icon={<HiTrash />}
            >
              Delete booking{' '}
            </Button>
          </Modal.Open>
          {status === 'unconfirmed' && (
            <Button
              onClick={() =>
                navigate(`/checkin/${bookingId}`)
              }
            >
              Check in
            </Button>
          )}
          <Button
            $variation="secondary"
            onClick={moveBack}
          >
            Back
          </Button>
          {status === 'checked-in' && (
            <Button
              disabled={isCheckingout}
              onClick={() => checkout(bookingId)}
              icon={<HiArrowUpOnSquare />}
            >
              Check out
            </Button>
          )}
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete
            disabled={isDeleting}
            resourceName="bookings"
            onConfirm={() =>
              deleteBooking(bookingId, {
                onSettled: () => navigate(-1),
              })
            }
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
