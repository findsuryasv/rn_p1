import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StyleSheet, ScrollView} from 'react-native';
import {ThemedView, Text, ListItem} from 'src/components';
import ItemCategoryMenu from './ItemCategoryMenu';

import {categorySelector} from 'src/modules/category/selectors';
import {configsSelector, languageSelector} from 'src/modules/common/selectors';
import {padding, margin} from 'src/components/config/spacing';

import {homeTabs, mainStack} from 'src/config/navigator';
import {excludeCategory} from '../utils/category';
import {exclude_categories_sidebar} from '../config/category';

class Sidebar extends React.Component {
  handlePage = (router, params = {}) => {
    const {navigation} = this.props;
    if (!navigation) {
      return null;
    }
    navigation.navigate(router, params);
  };

  render() {
    const {t, category, configs, language, navigation} = this.props;

    const {data} = category;

    // Filter include category
    const _data = excludeCategory(data, exclude_categories_sidebar);

    return (
      <ThemedView isFullView>
        <ScrollView>
          <Text h3 medium style={[styles.title, styles.titleHead]}>
            {t('common:text_category')}
          </Text>
          {_data.map((c) => (
            <ItemCategoryMenu
              key={c._id}
              category={c}
              isOpen={
                navigation.state && navigation.state.isDrawerOpen
                  ? navigation.state.isDrawerOpen
                  : false
              }
              goProducts={this.handlePage}
            />
          ))}
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: margin.big + 4,
    marginBottom: margin.small + 1,
    paddingHorizontal: padding.large,
  },
  titleHead: {
    paddingTop: getStatusBarHeight(),
  },
  item: {
    paddingHorizontal: padding.large,
  },
});

const mapStateToProps = (state) => ({
  category: categorySelector(state),
  configs: configsSelector(state),
  language: languageSelector(state),
});
export default connect(mapStateToProps)(withTranslation()(Sidebar));
