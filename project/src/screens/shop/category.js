import React, {Component} from 'react';
import {connect} from 'react-redux';
import unescape from 'lodash/unescape';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {ThemedView} from 'src/components';

import Search from 'src/screens/home/containers/Search';
import Style1 from './category/Style1';
import Style2 from './category/Style2';
import Style3 from './category/Style3';
import Style4 from './category/Style4';

import {getStatusBarHeight} from 'react-native-status-bar-height';

import {fetchCategories} from 'src/modules/category/actions';

import {
  getTemplateConfigSelector,
  languageSelector,
} from 'src/modules/common/selectors';

import {padding} from 'src/components/config/spacing';

import {categoryListType} from 'src/config/category';

import {mainStack} from 'src/config/navigator';
import {DrawerActions} from '@react-navigation/native';

class CategoryScreen extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchCategories());
  }

  goProducts = (item) => {
    this.props.navigation.navigate(mainStack.products, {
      id: item._id,
      name: unescape(item.name),
    });
  };

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer())
  };

  render() {
    const {t, templateConfig, language} = this.props;
    const type =
      templateConfig.getIn(['app_config', 'layout_category']) ||
      categoryListType.category1;

    return (
      <ThemedView isFullView style={styles.container}>
          <Style3 goProducts={this.goProducts} openDrawer={this.openDrawer} />
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
  },
  viewSearch: {
    padding: padding.large,
  },
});

const mapStateToProps = (state) => {
  return {
    templateConfig: getTemplateConfigSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(withTranslation()(CategoryScreen));
