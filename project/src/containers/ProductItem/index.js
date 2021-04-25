// @flow
import React from 'react';
import ItemDefault from './ItemDefault';

const ProductItem = (props) => {
  const {type, item, ...rest} = props;
  return <ItemDefault item={item} {...rest} />;
};

ProductItem.defaultProps = {
  type: 'default',
};

export default ProductItem;
