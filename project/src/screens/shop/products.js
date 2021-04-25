import React from 'react';
import {connect} from 'react-redux';
import concat from 'lodash/concat';
import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import compact from 'lodash/compact';
import unescape from 'lodash/unescape';
import {withTranslation} from 'react-i18next';
import {Map, fromJS} from 'immutable';

import {View, StyleSheet} from 'react-native';

import {Header, ThemedView} from 'src/components';
import Container from 'src/containers/Container';
import {TextHeader, IconHeader, CartIcon} from 'src/containers/HeaderComponent';
import Loading from 'src/containers/Loading/LoadingDefault';
import Empty from 'src/containers/Empty';

import Refine from './containers/Refine';
import SwitchProduct from './containers/SwitchProduct';
import ProductView from './containers/ProductView';
import CategoryList from './product/CategoryList';

import {sortBySelector, filterBySelector} from 'src/modules/product/selectors';
import {languageSelector} from 'src/modules/common/selectors';

import {
  clearFilter,
  fetchProducts as clearData,
} from 'src/modules/product/actions';
import {getProducts} from 'src/modules/product/service';

import {margin} from 'src/components/config/spacing';
import {mainStack, homeTabs} from 'src/config/navigator';
import {categorySelector} from 'src/modules/category/selectors';

const findCategory = (categoryId = '', lists = []) => {
  if (!categoryId || !lists || lists.length < 1) {
    return null;
  }
  var loopWhile = true;

  var category = null;
  var listFlat = lists;

  while (loopWhile && listFlat.length > 0) {
    const categoryFind = find(
      listFlat,
      (c) => c.id === parseInt(categoryId, 10),
    );
    if (categoryFind) {
      category = categoryFind;
      loopWhile = false;
    } else {
      listFlat = compact(flatMap(listFlat, (ca) => ca.categories));
    }
  }
  return category;
};

class ProductsScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {t, route, categories} = props;

    const categoryId = route?.params?.id ?? '';
    const category = findCategory(categoryId, categories);
    const name =
      route?.params?.name ?? category?.name ?? t('common:text_product');

    this.state = {
      category,
      name,
      loading: true,
      refreshing: false,
      loadingMore: false,
      data: [],
      page: 1,
    };
  }

  componentDidMount() {
    // this.fetchProducts();
    this.setState((preState) => {
      return {
        loading: true,
        refreshing: false,
        loadingMore: false,
        data: [
          {
            id: 100,
            type: 'simple',
            price: '18',
            regular_price: '20',
            sale_price: '18',
            'multi-currency-prices': {
              VND: {
                regular_price: 400000,
                sale_price: 360000,
              },
              EUR: {
                regular_price: 16,
                sale_price: 14.4,
              },
            },
            average_rating: 3,
            rating_count: 3,
            images: [
              {
                id: 352,
                date_created: '2019-06-27T14:56:39',
                date_created_gmt: '2019-06-27T14:56:39',
                date_modified: '2019-06-27T14:56:39',
                date_modified_gmt: '2019-06-27T14:56:39',
                src: 'https://cdn.rnlab.io/uploads/2019/06/27145640/91.jpg',
                name: '91',
                alt: '',
                woocommerce_thumbnail:
                  'https://cdn.rnlab.io/uploads/2019/06/27145640/91-324x324.jpg',
                woocommerce_single:
                  'https://cdn.rnlab.io/uploads/2019/06/27145640/91-416x494.jpg',
                woocommerce_gallery_thumbnail:
                  'https://cdn.rnlab.io/uploads/2019/06/27145640/91-100x100.jpg',
                shop_catalog:
                  'https://cdn.rnlab.io/uploads/2019/06/27145640/91-324x324.jpg',
                shop_single:
                  'https://cdn.rnlab.io/uploads/2019/06/27145640/91-416x494.jpg',
                shop_thumbnail:
                  'https://cdn.rnlab.io/uploads/2019/06/27145640/91-100x100.jpg',
              },
              {
                id: 354,
                date_created: '2019-06-27T14:56:45',
                date_created_gmt: '2019-06-27T14:56:45',
                date_modified: '2019-06-29T02:06:28',
                date_modified_gmt: '2019-06-29T02:06:28',
                src: 'https://cdn.rnlab.io/uploads/2019/06/27145646/92.jpg',
                name: '92',
                alt: 'Alt Test',
                woocommerce_thumbnail:
                  'https://cdn.rnlab.io/uploads/2019/06/27145646/92-324x324.jpg',
                woocommerce_single:
                  'https://cdn.rnlab.io/uploads/2019/06/27145646/92-416x494.jpg',
                woocommerce_gallery_thumbnail:
                  'https://cdn.rnlab.io/uploads/2019/06/27145646/92-100x100.jpg',
                shop_catalog:
                  'https://cdn.rnlab.io/uploads/2019/06/27145646/92-324x324.jpg',
                shop_single:
                  'https://cdn.rnlab.io/uploads/2019/06/27145646/92-416x494.jpg',
                shop_thumbnail:
                  'https://cdn.rnlab.io/uploads/2019/06/27145646/92-100x100.jpg',
              },
            ],
          }
        ]
        
      };
    });
  }

  fetchProducts = async (page = this.state.page) => {
    try {
      const dataGet = await this.getData(page);

      if (dataGet.length <= 4 && dataGet.length > 0) {
        this.setState((preState) => {
          return {
            loading: true,
            refreshing: false,
            loadingMore: dataGet.length === 4,
            data: [
              {
                id: 100,
                type: 'simple',
                price: '18',
                regular_price: '20',
                sale_price: '18',
                'multi-currency-prices': {
                  VND: {
                    regular_price: 400000,
                    sale_price: 360000,
                  },
                  EUR: {
                    regular_price: 16,
                    sale_price: 14.4,
                  },
                },
              }
            ]
          };
        });
      } else {
        this.setState((preState) => {
          return {
            loadingMore: false,
            loading: false,
            refreshing: false,
            data: [
              {
                id: 100,
                type: 'simple',
                price: '18',
                regular_price: '20',
                sale_price: '18',
                'multi-currency-prices': {
                  VND: {
                    regular_price: 400000,
                    sale_price: 360000,
                  },
                  EUR: {
                    regular_price: 16,
                    sale_price: 14.4,
                  },
                },
                average_rating: 3
              }
            ]
          };
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  handleCategoryPress = (id, name) => {
    this.props.navigation.push(mainStack.products, {
      id: id,
      name: unescape(name),
    });
  };
  
  render() {
    const {navigation, t} = this.props;
    const {category, name, data, loading, loadingMore, refreshing} = this.state;

    // const subsCategory = categories.filter(cat => cat.parent === category);
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader/>}
          centerComponent={<TextHeader title={unescape(name)}/>}
          rightComponent={<CartIcon/>}
        />
        {loading ? (
         <View style={styles.viewList}>
         <ProductView
           data={fromJS(data)}
           loadingMore={loadingMore}
           refreshing={refreshing}
           handleLoadMore={this.handleLoadMore}
           handleRefresh={this.handleRefresh}
         />
       </View>
        ) : data.length ? (
          <View style={styles.viewList}>
            <CategoryList
              onPress={this.handleCategoryPress}
              data={
                category && category.categories ? category.categories : null
              }
            />
            <ProductView
              data={fromJS(data)}
              loadingMore={loadingMore}
              refreshing={refreshing}
              handleLoadMore={this.handleLoadMore}
              handleRefresh={this.handleRefresh}
            />
          </View>
        ) : (
          <Empty
            icon="box"
            title={t('empty:text_title_product')}
            subTitle={t('empty:text_subtitle_product')}
            titleButton={t('common:text_go_shopping')}
            clickButton={() => navigation.navigate(homeTabs.shop)}
          />
        )}
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  viewRefineSwitch: {
    marginTop: margin.base,
    marginBottom: margin.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewList: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  const {data} = categorySelector(state);
  return {
    sortBy: sortBySelector(state),
    filterBy: filterBySelector(state),
    lang: languageSelector(state),
    categories: data,
  };
};

export default connect(mapStateToProps)(withTranslation()(ProductsScreen));
