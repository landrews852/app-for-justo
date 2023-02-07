// We’ve upgraded the ChatGPT model with improved factuality and mathematical capabilities.

import {useState, useEffect} from 'react';
import {useApolloClient, gql, useMutation} from '@apollo/client';
import {Button, type BtnProps} from '../../../../components/buttons/Button';
import {useParams} from 'react-router-dom';
import moment from 'moment';

const ADD_HISTORY = gql`
  mutation addHistory($input: AddHistoryInput!) {
    addHistory(input: $input) {
      _id
      relationId
      relationName
      ownerType
      date
    }
  }
`;

const ITEM = gql`
  query item($input: FindItemInput!) {
    item(input: $input) {
      _id
      name
      model
      serialNumber
      itemHistory {
        _id
        relationId
        relationName
        ownerType
        date
      }
    }
  }
`;

const ItemHistoryForm: React.FC = () => {
  const {_id} = useParams();
  const client = useApolloClient();
  const [date, setDate] = useState<string>('');
  const [ownerType, setOwnerType] = useState<'Bodega' | 'Empleado'>();
  const [relations, setRelations] = useState<Array<Record<string, unknown>>>(
    [],
  );
  const [relationId, setRelationId] = useState<string>('');
  const [relationName, setRelationName] = useState<string>('');

  const [addHistory] = useMutation(ADD_HISTORY);

  useEffect(() => {
    async function fetchData() {
      let query: unknown;
      if (ownerType === 'Bodega') {
        query = gql`
          {
            stores {
              _id
              name
            }
          }
        `;
      } else if (ownerType === 'Empleado') {
        query = gql`
          {
            employees {
              _id
              name
            }
          }
        `;
      }

      if (query) {
        const {data}: {data: Record<string, unknown>} = await client.query({
          query,
        });
        console.log(typeof query);

        const relationsArray: any = Object.values(data)[0];
        console.log(typeof relationsArray);
        setRelations(relationsArray);
      }
    }

    void fetchData();
  }, [ownerType, client]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formattedDate = moment(date).isValid()
      ? moment(date).format('DD-MM-YYYY')
      : null;

    if (!formattedDate) {
      console.error('Invalid date');
      return;
    }

    await addHistory({
      variables: {
        input: {
          _id,
          relationId,
          relationName,
          ownerType,
          date: formattedDate,
        },
      },
      refetchQueries: [{query: ITEM, variables: {_id}}],
    });
  };

  useEffect(() => {
    const selectedRelation: Array<Record<string, unknown>> = relations.filter(
      (relation) => relation._id === relationId,
    );

    if (selectedRelation.length > 0) {
      setRelationName(selectedRelation[0]?.name as string);
      console.log('relation name', relationName);
    } else {
      Error('no coincide la ID con ningún nombre');
    }
  }, [relationId]);

  const onClickProps: BtnProps = {
    types: 'submit',
    text: 'Guardar',
    className: 'mx-auto mt-4 py-1 px-8 active:outline-none',
  };
  console.log(relations);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-60 justify-evenly">
      <p className="text-xl">Agregar al historial</p>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        className="mx-auto mt-4 py-1 px-8 active:outline-none"
      />
      <select
        value={ownerType}
        onChange={(e) => {
          setOwnerType(e.target.value);
        }}
        className="mx-auto mt-4 py-1 px-8 active:outline-none"
      >
        <option value="" disabled selected>
          Seleccione una opción
        </option>
        <option value="Bodega">Bodega</option>
        <option value="Empleado">Empleado</option>
      </select>
      <select
        value={relationId}
        onChange={(e) => {
          setRelationId(e.target.value);
          set;
        }}
        className="mx-auto mt-4 py-1 px-8 active:outline-none"
        disabled={!ownerType}
      >
        <option value="" disabled selected>
          Seleccione una opción
        </option>
        {relations.map((relation) => (
          <option key={relation._id} value={relation._id}>
            {relation.name}
          </option>
        ))}
      </select>
      <Button {...onClickProps} />
    </form>
  );
};

export default ItemHistoryForm;
