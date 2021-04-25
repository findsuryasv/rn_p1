import React from 'react';

import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {
  StyleSheet,
  ScrollView,
  View,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Header,
  Loading,
  Text,
  ThemedView,
  Button,
  ThemeConsumer,
} from 'src/components';
import Container from 'src/containers/Container';
import Input from 'src/containers/input/Input';
import InputMobile from 'src/containers/input/InputMobile';
import TextHtml from 'src/containers/TextHtml';
import {TextHeader, IconHeader} from 'src/containers/HeaderComponent';
import ModalVerify from './containers/ModalVerify';
import SocialMethods from './containers/SocialMethods';

import {signUpWithEmail} from 'src/modules/auth/actions';
import {authSelector} from 'src/modules/auth/selectors';
import {configsSelector, languageSelector} from 'src/modules/common/selectors';
import {checkPhoneNumber} from 'src/modules/auth/service';

import {authStack} from 'src/config/navigator';
import {margin, padding} from 'src/components/config/spacing';
import {lineHeights} from 'src/components/config/fonts';
import {changeColor} from 'src/utils/text-html';
import {showMessage} from 'react-native-flash-message';
import {INITIAL_COUNTRY} from 'src/config/config-input-phone-number';
import {formatPhoneWithCountryCode} from 'src/utils/phone-formatter';

class RegisterScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: {
        name: '',
        email: '',
        password: '',
        subscribe: false,
      },
      user: null,
      confirmResult: null,
      visibleModal: false,
      loading: false,
      error: {
        message: null,
        errors: null,
      },
    };
    this.confirmation = null;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  changeData = (value) => {
    this.setState({
      data: {
        ...this.state.data,
        ...value,
      },
    });
  };

  register = () => {
    const {data} = this.state;
    let payload = data;
    this.setState({loading: false});
    this.props.dispatch(signUpWithEmail(payload));
  };

  /**
   * Handle User register
   */
  handleRegister = async () => {
    this.setState({
      loading: true,
    });
    try {
      const {data, user} = this.state;
        this.register();
    } catch (e) {
      showMessage({
        message: e.message,
        type: 'danger',
      });
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {
      navigation,
      auth: {pending},
      t,
    } = this.props;
    const {
      data: {
        email,
        name,
        password,
      },
      error: {message, errors},
      visibleModal,
      loading,
      user,
      confirmResult,
    } = this.state;
    const visible = visibleModal || !!(!user && confirmResult);
    return (
      <ThemeConsumer>
        {({theme}) => (
          <ThemedView isFullView>
            <Loading visible={pending} />
            <Header
              leftComponent={<IconHeader />}
              centerComponent={<TextHeader title={t('common:text_register')} />}
            />
            <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
              <ScrollView>
                <Container>
                  {message ? (
                    <TextHtml
                      value={message}
                      style={changeColor(theme.colors.error)}
                    />
                  ) : null}
                  <Input
                    label={t('auth:text_input_user')}
                    value={name}
                    onChangeText={(value) => this.changeData({name: value})}
                    error={errors && errors.name}
                  />
                  <Input
                    label={t('auth:text_input_email')}
                    value={email}
                    onChangeText={(value) => this.changeData({email: value})}
                    error={errors && errors.email}
                  />
                  <Input
                    label={t('auth:text_input_password')}
                    value={password}
                    secureTextEntry
                    onChangeText={(value) => this.changeData({password: value})}
                    error={errors && errors.password}
                  />
                  <Button
                    title={t('auth:text_register')}
                    onPress={this.handleRegister}
                    loading={loading || pending}
                  />
                  <Text
                    medium
                    style={styles.textHaveAccount}
                    onPress={() => navigation.navigate(authStack.login)}>
                    {t('auth:text_already_account')}
                  </Text>
                </Container>
              </ScrollView>
            </KeyboardAvoidingView>
          </ThemedView>
        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  viewSwitch: {
    marginVertical: margin.big,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textSwitch: {
    flex: 1,
    lineHeight: lineHeights.h4,
    marginRight: margin.large,
  },
  viewAccount: {
    marginVertical: margin.big,
  },
  textHaveAccount: {
    paddingVertical: padding.small,
    marginTop: margin.base,
    marginBottom: margin.big,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  const configs = configsSelector(state);
  return {
    auth: authSelector(state),
    language: languageSelector(state),
    enablePhoneNumber: configs.get('toggleLoginSMS'),
  };
};

export default connect(mapStateToProps)(withTranslation()(RegisterScreen));
