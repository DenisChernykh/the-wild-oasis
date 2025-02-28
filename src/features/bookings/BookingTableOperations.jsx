import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'Все' },
          { value: 'checked-out', label: 'Выезд' },
          { value: 'checked-in', label: 'Зарегестрирован' },
          { value: 'unconfirmed', label: 'Не подтврежден' },
        ]}
      />

      <SortBy
        options={[
          {
            value: 'startDate-desc',
            label: 'Сортировать по дате (сначала поздние)',
          },
          {
            value: 'startDate-asc',
            label: 'Сортировать по дате (сначала ранние)',
          },
          {
            value: 'totalPrice-desc',
            label: 'Сортировать по цене (сначала высокая)',
          },
          {
            value: 'totalPrice-asc',
            label: 'Сортировать по цене (сначала низкая)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
