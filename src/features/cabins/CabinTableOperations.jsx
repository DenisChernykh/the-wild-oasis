import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
function CabinTableOperations() {
  return (
    <div>
      <TableOperations>
        <Filter
          filterField="discount"
          options={[
            { value: 'all', label: 'Все' },
            { value: 'no-discount', label: 'Без скидки' },
            { value: 'with-discount', label: 'Со скидкой' },
          ]}
        />
        <SortBy
          options={[
            { value: 'name-asc', label: 'Сортировать по имени (А-Я)' },
            { value: 'name-desc', label: 'Сортировать по имени (Я-А)' },
            {
              value: 'regularPrice-asc',
              label: 'Сортировать по цене (сначала низкая)',
            },
            {
              value: 'regularPrice-desc',
              label: 'Сортировать по цене (сначала высокая)',
            },
            {
              value: 'maxCapacity-asc',
              label: 'Сортировать по вместимости (сначала низкая)',
            },
            {
              value: 'maxCapacity-desc',
              label: 'Сортировать по вместимости (сначала высокая)',
            },
          ]}
        />
      </TableOperations>
    </div>
  );
}

export default CabinTableOperations;
