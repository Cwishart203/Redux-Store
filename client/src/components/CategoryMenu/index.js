import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

// TODO:
//  remove the following line of code
import { useStoreContext } from '../../utils/GlobalState';

// TODO:
//  import { useDispatch, useSelector } from 'react-redux';

import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  // TODO:
  //  remove the following code
  const [state, dispatch] = useStoreContext();

  // TODO:
  //  create const variable 'dispatch' and assign the returned value from useDispatch() to it

  // TODO:
  //  create const variable 'state' and assign the returned value from useSelector() to it
  //  pass callback function '(state) => state' as input argument to useSelector()

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
