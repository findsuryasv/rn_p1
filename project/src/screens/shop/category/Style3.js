import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import concat from 'lodash/concat';
import unescape from 'lodash/unescape';
import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Container from 'src/containers/Container';
import OpacityView from 'src/containers/OpacityView';
import Notification from './Notification';
import EmptyCategory from './EmptyCategory';

import { categorySelector } from 'src/modules/category/selectors';
import { borderRadius, margin, padding } from 'src/components/config/spacing';
import { black, white } from 'src/components/config/colors';
import ButtonGroup from 'src/containers/ButtonGroup';
import { excludeCategory } from 'src/utils/category';
import { exclude_categories } from 'src/config/category';
import {ThemedView, Header} from 'src/components';
import {IconHeader, Logo, CartIcon} from 'src/containers/HeaderComponent';


const { width } = Dimensions.get('window');

const noImage = require('src/assets/images/imgCateDefault.png');

class Style3 extends React.Component {
  constructor(props) {
    super(props);
    const {
      category: { data },
          } = props;
    const listParent = excludeCategory(data, exclude_categories);

    this.state = {
      listParent
    };
  }

  changeParent = (index) => {
    const { listParent } = this.state;
  };

  render() {
    const { t, goProducts, openDrawer } = this.props;
    const { listParent } = this.state;

    if (listParent.length < 1) {
      return <EmptyCategory />;
    }
    const size = (width - 2 * padding.large - padding.small) / 2;

    const listData = listParent.map((a, i) => ({
      ...a,
      src: (() => {
        switch (i) {
          case 0:
            return require('../../../assets/images/cat1.jpg');
            break;
          case 1:
            return require('../../../assets/images/cat2.jpg');
            break;
          case 2:
            return require('../../../assets/images/cat3.jpg');
            break;
          case 3:
            return require('../../../assets/images/cat4.jpg');
            break;

          default:
            break;
        }
      })()
    }));

    return (
      <>
        {listData.length < 1 ? (
          <EmptyCategory />
        ) : (
          <Container style={styles.content}>
                  <Header
          leftComponent={
              <IconHeader
                name="align-left"
                size={22}
                onPress={() => openDrawer()}
              />
          }
          rightComponent={<CartIcon/>}
        />
            <FlatList
              numColumns={2}
              columnWrapperStyle={styles.viewCol}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => `${item._id}`}
              data={listData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => goProducts(item)}>
                  <Image
                    source={
                      item && item.src
                        ? item.src
                        : noImage
                    }
                    style={{ width: size, height: size }}
                  />
                  <OpacityView style={styles.viewText}>
                    <Text style={styles.text} h4 medium>
                      {unescape(item.name)}
                    </Text>
                  </OpacityView>
                </TouchableOpacity>
              )}
            />
          </Container>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  listParentCategory: {
    marginBottom: margin.big - 4,
  },
  contentListParentCategory: {
    paddingRight: margin.large,
  },
  notification: {
    marginBottom: margin.base,
  },
  content: {
    flex: 1,
  },
  viewCol: {
    justifyContent: 'space-between',
    marginBottom: margin.small,
  },
  item: {
    borderRadius: borderRadius.base,
    overflow: 'hidden',
  },
  viewImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: black,
    opacity: 0.4,
  },
  viewText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  text: {
    paddingHorizontal: padding.base,
    paddingVertical: padding.base + 2,
    textAlign: 'center',
    color: white,
  },
});

Style3.defaultProps = {
  goProducts: () => { },
};

const mapStateToProps = (state) => {
  return {
    category: categorySelector(state),
  };
};

export default connect(mapStateToProps)(withTranslation()(Style3));
