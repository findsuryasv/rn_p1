import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { Block, Text } from "galio-framework";

import { Button, Input } from "../components";
import { styleTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

const initialState = {
    email: {
        value: '',
        isMandatory: true,
        errMsg: '',
        isEmail: true
    },
    password: {
        value: '',
        isMandatory: true,
        errMsg: '',
        isPassword: true
    }
}

const validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
}

const Login = ({ navigation }) => {
    const [formState, setformState] = useState(initialState);

    const handleInput = (value, name) => {
        console.log(value, name)
        setformState(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                ...prevState[name].isMandatory && { errMsg: value ? prevState[name]['isEmail'] ? validate(value) ? '' : 'Email format is invlaid' : '' : 'Required Input' }
            }
        }));
    }

    const validateFields = () => {
        const currentFormState = JSON.parse(JSON.stringify(formState));
        Object.keys(currentFormState).forEach((co) => {
            currentFormState[co] = {
                ...currentFormState[co],
                ...currentFormState[co].isMandatory && { errMsg: currentFormState[co]['value'] ? currentFormState[co]['isEmail'] ? validate(value) ? '' : 'Email format is invlaid' : '' : 'Required Input' }
            }
        });
        setformState(currentFormState);
       return Object.keys(currentFormState).every(cq => currentFormState[cq]['errMsg'] === ''); 
    }
    

    const handleSubmit = () => {
        if(validateFields()) {

        }else {
            return;
        }
    }

    return (
      <Block flex middle>
        <StatusBar hidden />
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex>
              <Block flex={0.17} middle>
                  <Text color="#8898AA" size={24}>
                    Authenticate
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        onChangeText={e => handleInput(e, 'email')}
                        // iconContent={
                        // //   <Icon
                        // //     size={16}
                        // //     color={styleTheme.COLORS.ICON}
                        // //     name="lock"
                        // //     type="material"
                        // //     style={styles.inputIcons}
                        // //   />

                        // }
                      />
                      {
                          
                        (formState && formState['email'].isMandatory && formState['email'].errMsg  !== '') && (
                          <Text color="red" size={14} style={{marginLeft: 8}}>
                              { formState['email'].errMsg }
                          </Text>
                          )
                      }
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        onChangeText={e => handleInput(e, 'password')}
                        // iconContent={
                        //   <Icon
                        //     size={30}
                        //     color={styleTheme.COLORS.ICON}
                        //     name="lock"
                
                        //     style={styles.inputIcons}
                        //   />
                        // }
                      />
                      {
                          (formState && formState['password'].isMandatory && formState['password'].errMsg !== '') && (
                          <Text color="red" size={14} style={{marginLeft: 8, marginBottom: 8}}>
                              { formState['password'].errMsg }
                          </Text>
                          )
                      }
                    </Block>
                    <Block row width={width * 0.75}>
                    <Text size={14}>
                          New User? 
                        </Text>
                        <Text bold size={14}
                         onPress={() => navigation.navigate('register')}
                        style={{marginLeft: 6, color: styleTheme.COLORS.PRIMARY}}>
                          Register
                        </Text>
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={()=>handleSubmit()}>
                        <Text bold size={14} color={styleTheme.COLORS.WHITE}>
                          Authenticate
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
      </Block>
    );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: styleTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Login;
