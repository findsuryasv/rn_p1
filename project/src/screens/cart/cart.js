import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import values from 'lodash/values';
import includes from 'lodash/includes';
import {StyleSheet, View, ActivityIndicator, I18nManager, Alert, FlatList} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ThemedView, Header, Button, Loading} from 'src/components';
import {TextHeader} from 'src/containers/HeaderComponent';
import ButtonSwiper from 'src/containers/ButtonSwiper';
import Container from 'src/containers/Container';
import Empty from 'src/containers/Empty';
import CartTotal from './containers/CartTotal';
import CartItem from './containers/CartItem';
import Coupon from './containers/Coupon';

import {getCart, removeFromCart, updateQuantityCart} from 'src/modules/cart/actions';
import {
  cartSelector,
  cartTotalSelector,
  loadingItemSelector,
  loadingRemoveItemSelector,
  loadingUpdateQuantitySelector,
} from 'src/modules/cart/selectors';
import {configsSelector, currencySelector, getSiteConfig} from 'src/modules/common/selectors';
import {addWishList, removeWishList} from 'src/modules/common/actions';
import {wishListSelector} from 'src/modules/common/selectors';
import {isLoginSelector} from 'src/modules/auth/selectors';

import {homeTabs, mainStack, authStack} from 'src/config/navigator';

import {margin} from 'src/components/config/spacing';

function CartScreen(props) {
  const {t} = useTranslation();
  const {
    data,
    count,
    loading,
    siteConfigs,
    isLogin,
    navigation,
  } = props;

  const subtitleHeader =
    count > 1
      ? t('common:text_items', {count})
      : t('common:text_item', {count});
  console.log(data);
  return (
    <ThemedView isFullView>
      <Header
        centerComponent={
          <TextHeader
            title={t('common:text_cart')}
            subtitle={subtitleHeader}
          />
        }
      />
    {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <>
          {count < 1 ? (
            <Empty
              icon="shopping-bag"
              title={t('empty:text_title_cart')}
              subTitle={t('empty:text_subtitle_cart')}
              clickButton={() => navigation.navigate(homeTabs.shop)}
            />
          ) : (
            <>
              {/* <CartTotal style={styles.viewTotal} totals={totals} currency={currency}/> */}
              <FlatList
                keyExtractor={item => item.id}
                data={[
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
                ]}
                renderItem={({item, index}) => (
                  <CartItem
                    item={item}
                    // currency={currency}
                    // updateQuantity={!loadingRemove || !loadingUpdate ? updateQuantity : () => {}}
                    // goToProduct={goToProduct}
                    style={index === 0 && styles.firstItem}
                  />
                )}
              />
              <Container style={styles.footerScrollview}>
                <Button
                  title={t('cart:text_go_checkout')}
                  onPress={() => {
                    if (siteConfigs?.enable_guest_checkout === 'no' && !isLogin) {
                      navigation.navigate(authStack.login);
                    } else {
                      navigation.navigate(mainStack.webview_checkout);
                      // navigation.navigate(
                      //   webviewCheckout ? mainStack.webview_checkout : mainStack.checkout,
                      // );
                    }
                  }}
                />
              </Container>
            </>
          )}
        </>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  loading: {
    marginVertical: margin.base,
  },
  viewTotal: {
    marginBottom: margin.large - 2,
  },
  viewButton: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  footerScrollview: {
    marginVertical: margin.large,
  },
});

const mapStateToProps = (state) => ({
  count: cartSelector(state).length,
  loading: loadingItemSelector(state),
  loadingRemove: loadingRemoveItemSelector(state),
  loadingUpdate: loadingUpdateQuantitySelector(state),
  data: cartSelector(state),
  configs: configsSelector(state).toJS(),
  siteConfigs: getSiteConfig(state).toJS(),
  currency: currencySelector(state),
  isLogin: isLoginSelector(state),
});

CartScreen.defaultProps = {};

export default connect(mapStateToProps, null)(CartScreen);
